import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrambleTextPlugin, SplitText);

export default function HeatRevealCanvas({
  
  width = 800,
  height = 800,
  imgSrc = "/assets/images/Pakistan.jpg",
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textHeatRef = useRef(null);

  class TextHeatReveal {
    constructor(canvas, imgSrc, options = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d", { willReadFrequently: true });
      this.W = canvas.width;
      this.H = canvas.height;
      this.res = options.resolution || 96;
      this.characters = options.characters || "QWERTYUIOPASDFGHJKLZXCVBNM";
      this.fontSize = options.fontSize || 10;
      this.fontFamily = options.fontFamily || "Zodiac";
      this.words = options.words || [
        "TRUTH",
        "IS",
        "BURIED",
        "BENEATH",
        "LAYERS",
        "OF",
        "SILENT",
        "POWER",
      ];

      this.heat = {
        current: new Float32Array(this.res * this.res).fill(0),
        lastTime: 0,
        active: false,
        maxValue: 0,
      };

      this.P = {
        grid: {
          size: options.gridSize || 12,
          weight: options.textWeight || 1,
          contrast: options.contrast || 1.25,
          minBrightness: options.minBrightness || 0.15,
          textOpacity: options.textOpacity || 0.75,
        },
        effect: {
          strength: options.strength || 10,
          diffusion: options.diffusion || 0.92,
          decay: options.decay || 0.98,
          threshold: options.threshold || 0.04,
        },
        image: {
          brightness: options.imageBrightness || 1.2,
          contrast: options.imageContrast || 1,
        },
      };

      this.scrambleInterval = options.scrambleInterval || 500;
      this.scrambleAmount = options.scrambleAmount || 0.15;
      this.scrambleActive = true;

      this.coverCanvas = document.createElement("canvas");
      this.coverCanvas.width = this.W;
      this.coverCanvas.height = this.H;
      this.coverCtx = this.coverCanvas.getContext("2d");

      this.staticCanvas = document.createElement("canvas");
      this.staticCanvas.width = this.W;
      this.staticCanvas.height = this.H;
      this.staticCtx = this.staticCanvas.getContext("2d");

      this.staticRendered = false;

      this.charGrid = [];
      this.img = new Image();
      this.img.crossOrigin = "anonymous";
      this.img.onload = () => {
        this._prepareCover();
      };
      this.img.onerror = () => {
        this.img.src = "/assets/images/afroTob.jpg";
      };
      this.img.src = imgSrc;

      this.container = containerRef.current;
      this._raf = null;
      this.scrambleTimer = null;
      this.lowPerformanceMode = false;
      this.frameCount = 0;
      this.lastFrameTime = 0;

      this._lastX = null;
      this._lastY = null;
      this._lastEvt = 0;

      this._onMove = this._move.bind(this);
      this._onDown = this._down.bind(this);
      this._onLeave = this._leave.bind(this);
      this._visibilityChange = this._onVisibilityChange.bind(this);

      this._bindEvents();
    }

    _bindEvents() {
      this.canvas.addEventListener("pointermove", this._onMove, { passive: true });
      this.canvas.addEventListener("pointerdown", this._onDown, { passive: true });
      this.canvas.addEventListener("pointerleave", this._onLeave, { passive: true });
      this.canvas.addEventListener("pointercancel", this._onLeave, { passive: true });
      document.addEventListener("visibilitychange", this._visibilityChange);
    }

    _onVisibilityChange() {
      this.scrambleActive = !document.hidden;
    }

    _prepareCover() {
      this.coverCtx.fillStyle = "black";
      this.coverCtx.fillRect(0, 0, this.W, this.H);
      const scale = Math.max(this.W / this.img.width, this.H / this.img.height);
      const sw = this.img.width * scale;
      const sh = this.img.height * scale;
      const ox = (this.W - sw) / 2;
      const oy = (this.H - sh) / 2;

      this.coverCtx.filter = `brightness(${this.P.image.brightness}) contrast(${this.P.image.contrast})`;
      this.coverCtx.drawImage(this.img, ox, oy, sw, sh);
      this.coverCtx.filter = "none";

      this.coverData = this.coverCtx.getImageData(0, 0, this.W, this.H);

      this._clearHeat();
      this._generateCharGrid();
      this._placeWordsInGrid();
      this._renderStaticGrid();
      this._render();
      this._startScrambling();
      this._monitorPerformance();

      if (this.container) {
        setTimeout(() => {
          this.container.classList.add("visible");
        }, 100);
      }

      this._createInitialAnimation();
    }

    _clearHeat() {
      this.heat.current.fill(0);
      this.heat.lastTime = 0;
      this.heat.maxValue = 0;
    }

    _generateCharGrid() {
      const gridSize = this.P.grid.size;
      const cols = Math.floor(this.W / gridSize);
      const rows = Math.floor(this.H / gridSize);
      this.charGrid = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * gridSize;
          const py = y * gridSize;
          const i = (Math.floor(py) * this.W + Math.floor(px)) * 4;
          let gray =
            (this.coverData.data[i] * 0.299 +
              this.coverData.data[i + 1] * 0.587 +
              this.coverData.data[i + 2] * 0.114) /
            255;

          gray = Math.max(
            this.P.grid.minBrightness,
            Math.min(1, (gray - 0.5) * this.P.grid.contrast + 0.5)
          );

          const randomChar = this.characters.charAt(
            Math.floor(Math.random() * this.characters.length)
          );

          this.charGrid.push({
            x: px,
            y: py,
            char: randomChar,
            weight: gray * this.P.grid.weight,
            brightness: gray,
            isWordChar: false,
          });
        }
      }
    }

    _placeWordsInGrid() {
      const cols = Math.floor(this.W / this.P.grid.size);
      const rows = Math.floor(this.H / this.P.grid.size);

      // Reset any previous word chars
      this.charGrid.forEach(cell => (cell.isWordChar = false));

      this.words.forEach((word) => {
        const placementCount = Math.max(1, Math.floor(Math.random() * 2) + 1);
        for (let placement = 0; placement < placementCount; placement++) {
          const direction = Math.floor(Math.random() * 3); // 0=horizontal,1=vertical,2=diagonal
          let startX, startY, valid, attempts = 0;

          while (!valid && attempts < 20) {
            attempts++;
            startX = Math.floor(Math.random() * cols);
            startY = Math.floor(Math.random() * rows);
            valid = true;

            if (direction === 0 && startX + word.length > cols) valid = false;
            else if (direction === 1 && startY + word.length > rows) valid = false;
            else if (
              direction === 2 &&
              (startX + word.length > cols || startY + word.length > rows)
            )
              valid = false;

            if (valid) {
              for (let i = 0; i < word.length; i++) {
                let x, y;

                if (direction === 0) {
                  x = (startX + i) * this.P.grid.size;
                  y = startY * this.P.grid.size;
                } else if (direction === 1) {
                  x = startX * this.P.grid.size;
                  y = (startY + i) * this.P.grid.size;
                } else {
                  x = (startX + i) * this.P.grid.size;
                  y = (startY + i) * this.P.grid.size;
                }

               const cellIndex = this.charGrid.findIndex(
  (cell) => cell.x === x && cell.y === y
);

if (
  cellIndex === -1 ||
  this.charGrid[cellIndex].isWordChar 
) {
  valid = false;
  break; 
}

                if (cellIndex !== -1) {
                  this.charGrid[cellIndex].char = word[i];
                  this.charGrid[cellIndex].isWordChar = true;
                  this.charGrid[cellIndex].brightness = Math.max(
                    this.charGrid[cellIndex].brightness,
                    0.85
                  );
                }
              }
            }
          }
        }
      });
    }

    _renderStaticGrid() {
      const ctx = this.staticCtx;
      ctx.clearRect(0, 0, this.W, this.H);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, this.W, this.H);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      this.charGrid.forEach((cell) => {
        const { x, y, char, brightness, isWordChar } = cell;

        // Calculate font size based on brightness and whether it's a word char
        const sizeFactor = isWordChar ? 0.8 : 0.5;
        const size = this.fontSize * (sizeFactor + brightness * 0.8);

ctx.font = `${isWordChar ? "bold" : ""} ${size}px ${isWordChar ? "Caslon" : this.fontFamily}`;

        const colorFactor = isWordChar ? 1.3 : 1.1;
        const finalBrightness = Math.min(1, brightness * colorFactor) * this.P.grid.textOpacity;

        ctx.fillStyle = `rgba(255, 255, 255, ${finalBrightness})`;
        ctx.fillText(char, x + this.P.grid.size / 2, y + this.P.grid.size / 2);
      });

      this.staticRendered = true;
    }

    _render() {
      this.needsRender = true;
      this.ctx.clearRect(0, 0, this.W, this.H);
      this.ctx.drawImage(this.staticCanvas, 0, 0);

      if (this.heat.active || this.heat.maxValue > 0) {
        const gridSize = this.P.grid.size;
        const threshold = this.P.effect.threshold;

        for (let y = 0; y < this.H; y += gridSize) {
          for (let x = 0; x < this.W; x += gridSize) {
            const idx =
              Math.floor((y / this.H) * this.res) * this.res +
              Math.floor((x / this.W) * this.res);

            if (this.heat.current[idx] > threshold) {
              this.ctx.save();
              this.ctx.beginPath();
              this.ctx.rect(x, y, gridSize, gridSize);
              this.ctx.clip();
              this.ctx.drawImage(this.coverCanvas, 0, 0);
              this.ctx.restore();
            }
          }
        }
      }
    }

    _update() {
      const now = performance.now();
      if (!this.heat.lastTime) {
        this.heat.lastTime = now;
        return;
      }
      const dt = Math.min(30, now - this.heat.lastTime) / 16.67;
      this.heat.lastTime = now;

      const H = this.heat;
      const P = this.P.effect;
      H.maxValue = 0;
      const tempGrid = new Float32Array(this.res * this.res);

      for (let y = 1; y < this.res - 1; y++) {
        for (let x = 1; x < this.res - 1; x++) {
          const idx = y * this.res + x;

          if (
            H.current[idx] < P.threshold &&
            H.current[idx - this.res] < P.threshold &&
            H.current[idx + this.res] < P.threshold &&
            H.current[idx - 1] < P.threshold &&
            H.current[idx + 1] < P.threshold
          ) {
            continue;
          }

          const up = H.current[idx - this.res];
          const down = H.current[idx + this.res];
          const left = H.current[idx - 1];
          const right = H.current[idx + 1];
          const upLeft = H.current[idx - this.res - 1];
          const upRight = H.current[idx - this.res + 1];
          const downLeft = H.current[idx + this.res - 1];
          const downRight = H.current[idx + this.res + 1];

          const neighbors =
            (up + down + left + right) * 0.15 +
            (upLeft + upRight + downLeft + downRight) * 0.05;

          tempGrid[idx] =
            H.current[idx] * (1 - P.diffusion) + neighbors * P.diffusion;

          tempGrid[idx] *= P.decay;

          if (tempGrid[idx] < P.threshold) {
            tempGrid[idx] = 0;
          } else {
            H.maxValue = Math.max(H.maxValue, tempGrid[idx]);
          }
        }
      }

      for (let i = 0; i < this.res; i++) {
        tempGrid[i] *= P.decay;
        tempGrid[(this.res - 1) * this.res + i] *= P.decay;
        tempGrid[i * this.res] *= P.decay;
        tempGrid[i * this.res + (this.res - 1)] *= P.decay;
      }

      H.current.set(tempGrid);

      if (H.maxValue <= P.threshold) {
        this._stop();
      }
    }

    _addHeat(px, py, amount = 1) {
      const nx = (px / this.W) * this.res;
      const ny = (py / this.H) * this.res;
      const rad = this.lowPerformanceMode ? 8 : 12;

      for (let i = -rad; i <= rad; i++) {
        for (let j = -rad; j <= rad; j++) {
          const x = Math.floor(nx + i);
          const y = Math.floor(ny + j);
          if (x < 0 || x >= this.res || y < 0 || y >= this.res) continue;

          const idx = y * this.res + x;
          const d = Math.hypot(i, j);

          if (d <= rad) {
            const intensity = amount * Math.pow(1 - d / rad, 1.5);
            this.heat.current[idx] += intensity;
            this.heat.current[idx] = Math.min(1, this.heat.current[idx]);
            this.heat.maxValue = Math.max(this.heat.maxValue, this.heat.current[idx]);
          }
        }
      }

      this._start();
    }

    _move(e) {
      const now = performance.now();
      if (now - this._lastEvt < 30) return;
      this._lastEvt = now;

      const { x, y } = this._coords(e);

      if (this._lastX != null && this._lastY != null) {
        const dist = Math.hypot(x - this._lastX, y - this._lastY);
        if (dist > 2) this._addHeat(x, y, Math.min(dist * 0.03, 0.8));
      }

      this._lastX = x;
      this._lastY = y;
    }

    _down(e) {
      const { x, y } = this._coords(e);
      this._addHeat(x, y, 1.5);
      this._lastX = x;
      this._lastY = y;
    }

    _leave() {
      this._lastX = null;
      this._lastY = null;
    }

    _coords(e) {
  const rect = this.canvas.getBoundingClientRect();

  const scaleX = this.canvas.width / rect.width;
  const scaleY = this.canvas.height / rect.height;

  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  return { x, y };
}

    _start() {
      if (this.heat.active) return;
      this.heat.active = true;
      this._raf = requestAnimationFrame(this._anim.bind(this));
    }

    _stop() {
      this.heat.active = false;
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
    }

    _anim() {
      this._update();
      this._render();
      if (this.heat.active) {
        this._raf = requestAnimationFrame(this._anim.bind(this));
      }
    }

    _scrambleRandomChars() {
      this.needsRender = true;

      if (!this.scrambleActive) return;

      if (this.lowPerformanceMode && Math.random() > 0.5) return;

      const scrambleCount = Math.floor(this.charGrid.length * this.scrambleAmount);
      for (let i = 0; i < scrambleCount; i++) {
        const randIndex = Math.floor(Math.random() * this.charGrid.length);
        const cell = this.charGrid[randIndex];
        if (!cell.isWordChar) {
          cell.char = this.characters.charAt(
            Math.floor(Math.random() * this.characters.length)
          );
        }
      }
      this._renderStaticGrid();
      this._render();
    }

    _startScrambling() {
      this.scrambleTimer = setInterval(() => {
        this._scrambleRandomChars();
      }, this.scrambleInterval);
    }

    _monitorPerformance() {
      const check = () => {
        const now = performance.now();
        this.frameCount++;

        if (this.lastFrameTime) {
          const dt = now - this.lastFrameTime;
          const fps = 1000 / dt;

          if (fps < 30) {
            this.lowPerformanceMode = true;
          } else if (fps > 40) {
            this.lowPerformanceMode = false;
          }
        }

        this.lastFrameTime = now;

        this._raf = requestAnimationFrame(check);
      };
      check();
    }

    _createInitialAnimation() {
      // Scramble non-word chars at start
      for (let i = 0; i < this.charGrid.length; i++) {
        const cell = this.charGrid[i];
        if (!cell.isWordChar) {
          cell.char = this.characters.charAt(
            Math.floor(Math.random() * this.characters.length)
          );
        }
      }
      this._renderStaticGrid();
      this._render();
    }

    destroy() {
      if (this.scrambleTimer) clearInterval(this.scrambleTimer);
      this._stop();

      this.canvas.removeEventListener("pointermove", this._onMove);
      this.canvas.removeEventListener("pointerdown", this._onDown);
      this.canvas.removeEventListener("pointerleave", this._onLeave);
      this.canvas.removeEventListener("pointercancel", this._onLeave);
      document.removeEventListener("visibilitychange", this._visibilityChange);
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return;

    const heatReveal = new TextHeatReveal(canvasRef.current, imgSrc);
    textHeatRef.current = heatReveal;

    // Animate the text lines on page load
    document.fonts.ready.then(() => {
      const split = new SplitText(".line", {
        type: "lines",
        linesClass: "line",
      });

      gsap.set(split.lines, { y: "100%", opacity: 0 });
      gsap.to(split.lines, {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
      });
    });

    return () => {
      heatReveal.destroy();
    };
  }, [imgSrc]);

  return (
    <div
  className="canvas-container"
  ref={containerRef}
>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ display: "block", margin: "0 auto", borderRadius: 8 }}
      />
    </div>
  );
}
