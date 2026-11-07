import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 179;
const FOLDER = '/ezgif-348d78d754071702-jpg';
const FRAME_PREFIX = 'ezgif-frame-';
const FRAME_EXT = '.jpg';
const CACHE_KEY = Date.now();

export default function CanvasScrollAnimation({ heroRef }) {
  const canvasRef = useRef(null);
  const [loadPercent, setLoadPercent] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [fadeLoader, setFadeLoader] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const images = new Array(TOTAL_FRAMES);
    let loadedCount = 0;
    let animId = null;
    let isDisposed = false;

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

      const nw = Math.ceil(iw * ratio);
      const nh = Math.ceil(ih * ratio);
      const cx = Math.floor((cw - nw) * 0.5);
      const cy = Math.floor((ch - nh) * 0.5);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, iw, ih, cx, cy, nw, nh);
    }

    function resizeCanvas() {
      if (!canvas || isDisposed) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      renderFrame(lastRenderedIndex >= 0 ? lastRenderedIndex : 0);
    }

    function updateTargetProgress() {
      if (heroRef && heroRef.current) {
        const heroEl = heroRef.current;
        const rect = heroEl.getBoundingClientRect();
        const totalScrollable = heroEl.offsetHeight - window.innerHeight;
        
        if (totalScrollable <= 0) {
          targetProgress = 0;
        } else {
          // Progress is strictly 0 when at top of hero, and 1 when hero finishes
          const scrolledPastTop = -rect.top;
          targetProgress = Math.max(0, Math.min(1, scrolledPastTop / totalScrollable));
        }
      } else {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetProgress = maxScroll <= 0 ? 0 : Math.max(0, Math.min(1, window.scrollY / maxScroll));
      }
    }

    function loop() {
      if (isDisposed) return;

      const diff = targetProgress - currentProgress;
      const factor = Math.abs(diff) > 0.25 ? 0.16 : 0.08;

      if (Math.abs(diff) < 0.0001) {
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

      // Smooth cinematic background video blur when the perspective element starts (> 0.25)
      let targetBlur = 0;
      if (currentProgress > 0.25) {
        const blurT = Math.min(1, (currentProgress - 0.25) / 0.10);
        targetBlur = parseFloat((blurT * 7).toFixed(1));
      }
      if (targetBlur !== lastBlur) {
        canvas.style.filter = targetBlur > 0 ? `blur(${targetBlur}px)` : 'none';
        lastBlur = targetBlur;
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
      }, 700);
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

    // Safety fallback
    const safetyTimer = setTimeout(() => {
      if (loadedCount >= Math.floor(TOTAL_FRAMES * 0.25)) {
        completePreload();
      }
    }, 2500);

    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('scroll', updateTargetProgress, { passive: true });

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
