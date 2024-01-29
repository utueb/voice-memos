import { Button } from "react-bootstrap";

export function ToggleButton({
  icons,
  actions = null,
  state,
  setState,
  disabled,
  purpose,
  size,
}) {
  function handleClick() {
    setState(!state);
    if (actions === null) return;
    !state && actions[0]();
    state && actions[1]();
  }
  return (
    <Button
      variant="danger"
      className="bg-gradient fs-5 d-flex justify-content-center sm-height"
      onClick={handleClick}
      disabled={disabled}
      title={purpose}
      size={size}
    >
      {!state && icons[0]}
      {state && icons[1]}
    </Button>
  );
}
