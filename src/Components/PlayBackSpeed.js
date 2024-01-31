import { useState } from "react";
import CustomDropdown from "./CustomDropdown";
export function PlayBackSpeed({ playBackRate }) {
  const [activeItem, setActiveItem] = useState(3);
  const speeds = Array.from({ length: 8 }, (_, index) => 0.25 * (index + 1));
  const onSelect = (index) => {
    playBackRate(speeds[index]);
  };
  return (
    <CustomDropdown
      id={`playback-speed-dropdown`}
      items={speeds}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
      onSelect={onSelect}
      title={speeds}
    />
  );
}
