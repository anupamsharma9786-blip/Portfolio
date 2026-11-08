import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 179;
const FRAME_PREFIX = 'ezgif-frame-';
const FRAME_EXT = '.jpg';
const CACHE_KEY = Date.now();

export default function CanvasScrollAnimation({ heroRef }) {
  const canvasRef = useRef(null);
  const dimRef = useRef(null);
  const [loadPercent, setLoadPercent] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [fadeLoader, setFadeLoader] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use alpha: false without desynchronized: true to eliminate screen tearing on mobile
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const isMobile = window.innerWidth <= 768;
    const FOLDER = isMobile ? '/ezgif-mobile' : '/ezgif-348d78d754071702-jpg';

    const images = new Array(TOTAL_FRAMES);
    let loadedCount = 0;
    let animId = null;
    let isDisposed = false;
    let isRunning = false;

    let currentProgress = 0;
    let targetProgress = 0;
    let lastRenderedIndex = -1;
    let lastBlur = -1;

    function getFrameUrl(index) {
      const frameNum = String(index + 1).padStart(3, '0');
      return `${FOLDER}/${FRAME_PREFIX}${frameNum}${FRAME_EXT}?v=${CACHE_KEY}`;
    }

    function getNearestLoadedImage(index) {
      if (images[index] && images[index].complete && images[index].naturalWidth > 0) {
        return images[index];
      }
      for (let i = index - 1; i >= 0; i--) {
        if (images[i] && images[i].complete && images[i].naturalWidth > 0) return images[i];
      }
      for (let i = index + 1; i < TOTAL_FRAMES; i++) {
        if (images[i] && images[i].complete && images[i].naturalWidth > 0) return images[i];
      }
      return null;
    }

    function renderFrame(index) {
      if (isDisposed) return;
      const img = getNearestLoadedImage(index);
      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      if (!iw || !ih) return;

      const hRatio = cw / iw;
      const vRatio = ch / ih;
      const ratio = Math.max(hRatio, vRatio);

      // Integer pixel coordinates prevent subpixel shimmer and edge tearing
      const nw = Math.round(iw * ratio);
      const nh = Math.round(ih * ratio);
      const cx = Math.round((cw - nw) * 0.5);
      const cy = Math.round((ch - nh) * 0.5);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = isMobile ? 'medium' : 'high';
      ctx.drawImage(img, 0, 0, iw, ih, cx, cy, nw, nh);
    }

    function resizeCanvas() {
      if (!canvas || isDisposed) return;
      // Cap DPR to 1.25 on mobile to avoid GPU fill-rate saturation and pixel stretching
      const dpr = isMobile 
        ? Math.min(window.devicePixelRatio || 1, 1.25)
        : Math.min(window.devicePixelRatio || 1, 2);

      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      renderFrame(lastRenderedIndex >= 0 ? lastRenderedIndex : 0);
    }

    function isHeroInViewport() {
      if (!heroRef || !heroRef.current) return true;
      const rect = heroRef.current.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    }

    function updateTargetProgress() {
      if (heroRef && heroRef.current) {
        const heroEl = heroRef.current;
        const rect = heroEl.getBoundingClientRect();
        const totalScrollable = heroEl.offsetHeight - window.innerHeight;
        
        if (totalScrollable <= 0) {
          targetProgress = 0;
        } else {
          const scrolledPastTop = -rect.top;
          targetProgress = Math.max(0, Math.min(1, scrolledPastTop / totalScrollable));
        }
      } else {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetProgress = maxScroll <= 0 ? 0 : Math.max(0, Math.min(1, window.scrollY / maxScroll));
      }

      // Wake up the render loop if it's idle and Hero is visible
      if (!isRunning && isHeroInViewport()) {
        isRunning = true;
        animId = requestAnimationFrame(loop);
      }
    }

    function loop() {
      if (isDisposed) return;

      // If Hero is completely off-screen, sleep the loop to save 100% CPU/GPU
      if (!isHeroInViewport()) {
        isRunning = false;
        return;
      }

      const diff = targetProgress - currentProgress;
      const factor = isMobile 
        ? (Math.abs(diff) > 0.2 ? 0.22 : 0.14) 
        : (Math.abs(diff) > 0.25 ? 0.16 : 0.08);

      if (Math.abs(diff) < 0.0005) {
        currentProgress = targetProgress;
      } else {
        currentProgress += diff * factor;
      }

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1)))
      );

      if (frameIndex !== lastRenderedIndex) {
        renderFrame(frameIndex);
        lastRenderedIndex = frameIndex;
      }

      // Smooth background dimming/blur when perspective text enters (> 0.25)
      let targetProgressNorm = 0;
      if (currentProgress > 0.25) {
        targetProgressNorm = Math.min(1, (currentProgress - 0.25) / 0.12);
      }

      // On mobile, use GPU-free overlay opacity instead of expensive CSS canvas blur
      if (dimRef.current) {
        dimRef.current.style.opacity = (targetProgressNorm * (isMobile ? 0.55 : 0.45)).toFixed(2);
      }

      // On desktop only, apply subtle optical blur
      if (!isMobile) {
        const targetBlur = parseFloat((targetProgressNorm * 6).toFixed(1));
        if (targetBlur !== lastBlur) {
          canvas.style.filter = targetBlur > 0 ? `blur(${targetBlur}px)` : 'none';
          lastBlur = targetBlur;
        }
      }

      // Check if we reached target and can sleep the loop
      if (Math.abs(targetProgress - currentProgress) < 0.0005) {
        isRunning = false;
        return;
      }

      animId = requestAnimationFrame(loop);
    }

    function markLoaded() {
      if (isDisposed) return;
      loadedCount++;
      const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      setLoadPercent(pct);

      if (loadedCount === TOTAL_FRAMES) {
        completePreload();
      }
    }

    function completePreload() {
      if (isDisposed) return;
      renderFrame(0);
      setFadeLoader(true);
      setTimeout(() => {
        setIsReady(true);
      }, 500);
    }

    // Initialize
    resizeCanvas();
    updateTargetProgress();
    currentProgress = targetProgress;

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    images[0] = firstImg;
    firstImg.onload = () => {
      markLoaded();
      renderFrame(0);
    };
    firstImg.onerror = () => {
      markLoaded();
    };

    // Preload remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      images[i] = img;
      img.onload = markLoaded;
      img.onerror = markLoaded;
    }

    // Fast-ready safety fallback
    const safetyTimer = setTimeout(() => {
      if (loadedCount >= Math.floor(TOTAL_FRAMES * 0.2)) {
        completePreload();
      }
    }, 2000);

    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('scroll', updateTargetProgress, { passive: true });

    isRunning = true;
    animId = requestAnimationFrame(loop);

    return () => {
      isDisposed = true;
      clearTimeout(safetyTimer);
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', updateTargetProgress);
    };
  }, [heroRef]);

  return (
    <>
      {/* Sticky Fullscreen Canvas inside Hero */}
      <div className="hero-canvas-wrapper">
        <canvas ref={canvasRef} className="canvas-element" />
        {/* Hardware-accelerated dim overlay (0% GPU cost on mobile) */}
        <div ref={dimRef} className="hero-backdrop-dim" aria-hidden="true" />
      </div>

      {/* Sleek Minimal Preloader */}
      {!isReady && (
        <div className={`react-canvas-loader ${fadeLoader ? 'fade-out' : ''}`}>
          <div className="loader-inner">
            <div className="loader-track">
              <div
                className="loader-fill"
                style={{ width: `${loadPercent}%` }}
              />
            </div>
            <span className="loader-num">{loadPercent}%</span>
          </div>
        </div>
      )}
    </>
  );
}
