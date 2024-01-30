import { useState } from "react";
import CustomDropdown from "./CustomDropdown";
export function ListOrder({ changeOrder }) {
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
    // changeOrder(this function does not exist yet);
  };
  return (
    <CustomDropdown
      items={sortings}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
      onSelect={onSelect}
      title={sortings}
    />
  );
}
