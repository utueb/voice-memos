import { Button } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";

export function CancelBtn() {
  return (
    <Button
      variant="danger"
      className="bg-gradient fs-5 d-flex justify-content-center"
      onClick={() => {}}
      title={"cancel"}
    >
      <TrashFill />
    </Button>
  );
}
