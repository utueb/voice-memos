import { useState } from "react";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";

export function PlayBackSpeed({ playBackRate, audioRef }) {
  const [activeItem, setActiveItem] = useState(3);
  const speeds = Array.from({ length: 8 }, (_, index) => 0.25 * (index + 1));

  return (
    <DropdownButton
      as={ButtonGroup}
      id={`playback-speed-dropdown`}
      variant={"danger"}
      size={"md"}
      className="bg-gradient mx-2 dropdown-container-positioning"
      title={` ${speeds[activeItem]} `}
      data-bs-theme="dark"
      drop={"end"}
    >
      {speeds.map((speed) => {
        const index = speeds.indexOf(speed);
        const active = activeItem === index;
        return (
          <Dropdown.Item
            eventKey={index}
            key={index}
            className="fw-bold"
            active={active}
            onClick={() => {
              playBackRate(speed);
              setActiveItem(index);
            }}
          >
            {speed}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
}
