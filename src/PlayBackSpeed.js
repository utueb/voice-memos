import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";

export function PlayBackSpeed() {
  // TODO: make this component change playback speed
  return (
    <DropdownButton
      as={ButtonGroup}
      id={`playback-speed-dropdown`}
      variant={"danger"}
      size={"md"}
      className="bg-gradient mx-2"
      title={" 1 "}
      data-bs-theme="dark"
      drop={"end"}
    >
      {Array.from({ length: 8 }, (_, index) => {
        const num = (index + 1) / 4;
        return (
          <Dropdown.Item
            eventKey={index + 1}
            key={index + 1}
            className="fw-bold"
            active={num === 1}
          >
            {num}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
}
