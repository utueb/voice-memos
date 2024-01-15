import { Button } from "react-bootstrap";

export function ToggleButton({
  icons,
  actions,
  state,
  setState,
  disabled,
  purpose,
}) {
  function handleClick() {
    setState(!state);
    !state && actions[0]();
    state && actions[1]();
  }
  return (
    <Button
      variant="danger"
      className="bg-gradient fs-5 d-flex justify-content-center"
      onClick={handleClick}
      disabled={disabled}
      title={purpose}
    >
      {!state && icons[0]}
      {state && icons[1]}
    </Button>
  );
}
