import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function AutoFitText({
  text,
  as: Component = "div",
  minSize = 16,
  maxSize = 96,
  maxLines = 1,
  mobileMaxLines,
  mobileBreakpoint = 640,
  className,
  style,
  ...props
}) {
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(minSize);

  const fitText = useCallback(() => {
    const el = textRef.current;
    if (!el || typeof window === "undefined") return;

    const effectiveMaxLines =
      mobileMaxLines && window.innerWidth < mobileBreakpoint
        ? mobileMaxLines
        : maxLines;

    let low = Math.floor(minSize);
    let high = Math.ceil(maxSize);
    let best = low;

    const fits = (size) => {
      el.style.fontSize = `${size}px`;

      const computed = window.getComputedStyle(el);
      const parsedLineHeight = parseFloat(computed.lineHeight);
      const lineHeight = Number.isFinite(parsedLineHeight)
        ? parsedLineHeight
        : size * 1.1;
      const maxHeight = effectiveMaxLines
        ? lineHeight * effectiveMaxLines + 2
        : Infinity;

      return (
        el.scrollWidth <= el.clientWidth + 1 &&
        el.scrollHeight <= maxHeight
      );
    };

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      if (fits(mid)) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    el.style.fontSize = `${best}px`;
    setFontSize(best);
  }, [maxLines, maxSize, minSize, mobileBreakpoint, mobileMaxLines]);

  useIsomorphicLayoutEffect(() => {
    fitText();
  }, [fitText, text]);

  useEffect(() => {
    const el = textRef.current;
    if (!el || typeof window === "undefined") return undefined;

    let frame = 0;
    const scheduleFit = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(fitText);
    };

    const observer = new window.ResizeObserver(scheduleFit);
    observer.observe(el.parentElement || el);

    window.addEventListener("resize", scheduleFit);
    document.fonts?.ready?.then(scheduleFit);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", scheduleFit);
      observer.disconnect();
    };
  }, [fitText, text]);

  return (
    <Component
      ref={textRef}
      className={className}
      style={{
        textWrap: "balance",
        overflowWrap: "anywhere",
        ...style,
        fontSize: `${fontSize}px`,
      }}
      {...props}
    >
      {text}
    </Component>
  );
}
