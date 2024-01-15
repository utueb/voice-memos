import { Button } from "react-bootstrap";

export function ToggleButton({ icons, state, setState, disabled, purpose }) {
  return (
    <Button
      variant="danger"
      className="bg-gradient fs-5 d-flex justify-content-center"
      onClick={() => setState(!state)}
      disabled={disabled}
      title={purpose}
    >
      {!state && icons[0]}
      {state && icons[1]}
    </Button>
  );
}
