import { useState } from "react";
import CustomDropdown from "./CustomDropdown";
export function ListOrder({ setOrder }) {
  const [activeItem, setActiveItem] = useState(0);
  const sortings = [
    "Date ↑",
    "Date ↓",
    " A-Z",
    "Z-A",
    "Duration ↑",
    " Duration ↓",
  ];
  const onSelect = (index) => {
    setOrder(sortings[index]);
  };
  return (
    <CustomDropdown
      items={sortings}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
      onSelect={onSelect}
      title={sortings}
      id={"list-order-dropdown"}
    />
  );
}
