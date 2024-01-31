import { memo } from "react";
import { Badge, Spinner } from "react-bootstrap";

function RecordingIndicator({ isPaused }) {
  return (
    <h4 className="mb-0 ms-auto">
      <Badge
        bg={isPaused ? "secondary" : "danger"}
        className="bg-gradient rounded-pill d-inline-flex align-items-center"
      >
        <span className="d-none d-md-flex align-items-center gap-1">
          <Spinner animation="border" variant="light" size="sm" />
          {isPaused ? "Paused" : "Recording"}
        </span>
        <Spinner
          animation="grow"
          variant="light"
          className="d-md-none"
          size="sm"
        />
      </Badge>
    </h4>
  );
}

export default memo(RecordingIndicator);
