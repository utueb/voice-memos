import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "react-bootstrap";

export function Range({
  rangePurpose,
  additionalClasses = "",
  maxValue,
  currentValue,
  updateCurrentValue,
  initialPercentage,
  play,
  pause,
  isPlaying,
}) {
  //TODO: use this to volume or rewind audos
  const rangeRef = useRef(null);
  const [rangeActive, setRangeActive] = useState(false);
  const [percentage, setPercentage] = useState(initialPercentage);
  const atEnd = Math.floor(currentValue) === maxValue;
  const [initialIsPlaying, setInitialIsPlaying] = useState(false);
  function handleMouseMove(e) {
    if (!rangeActive) return;
    const rangeRect = rangeRef.current.getBoundingClientRect();
    const x = e.clientX - rangeRect.left;
    setPercentage(
      x / rangeRect.width < 0
        ? 0
        : x / rangeRect.width > 1
        ? 1
        : x / rangeRect.width
    );
    updateCurrentValue(Math.round(maxValue * percentage));
  }

  useEffect(() => {
    setPercentage(initialPercentage);
  }, [initialPercentage]);

  useEffect(() => {
    if (atEnd && rangePurpose === "audio") {
      pause?.();

      setTimeout(() => {
        updateCurrentValue(0);
      }, 1000);
    }
  }, [atEnd, pause, updateCurrentValue, rangePurpose]);

  return (
    <div
      className={`w-100 ${additionalClasses} custom-range`}
      role="button"
      tabIndex={0}
      onMouseDown={() => {
        setRangeActive(true);
        setInitialIsPlaying(isPlaying);
        pause?.();
      }}
      onMouseLeave={() => {
        setRangeActive(false);
        if (!initialIsPlaying) return;
        play?.();
        setInitialIsPlaying(isPlaying);
      }}
      onMouseMove={handleMouseMove}
      ref={rangeRef}
    >
      <ProgressBar
        animated
        now={atEnd ? 100 : Math.round(percentage * 100)}
        variant={"danger"}
      />
    </div>
  );
}
