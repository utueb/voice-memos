import "../styles/Dropdown.css";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";

export default function CustomDropdown({
  items,
  activeItem,
  setActiveItem,
  onSelect,
  title,
  id,
}) {
  return (
    <DropdownButton
      as={ButtonGroup}
      variant={"danger"}
      size={"md"}
      className="bg-gradient mx-4 dropdown-container-positioning sm-height"
      title={` ${title[activeItem]} `}
      data-bs-theme="dark"
      drop={"end"}
      id={id}
    >
      {items.map((item, index) => {
        const isActive = activeItem === index;
        return (
          <Dropdown.Item
            eventKey={index}
            key={index}
            className="fw-bold"
            active={isActive}
            onClick={() => {
              onSelect(index);
              setActiveItem(index);
            }}
          >
            {item}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
}
