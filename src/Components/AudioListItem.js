import { Button, ButtonGroup } from "react-bootstrap";
import { TrashFill, CaretRightSquareFill } from "react-bootstrap-icons";
import { TimeComponent } from "./TimeComponent";
import { deleteAudioDb } from "../openDB";
import "../styles/AudioListItem.css";
export function AudioListItem({
  index,
  listLength,
  audio,
  setDeleting,
  isRecording,
  setRecordedAudio,
}) {
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  }
  return (
    <li
      className={`d-flex pb-2 mt-1 audio-list-item ${
        index + 1 !== listLength && "border-dark border-bottom "
      }`}
    >
      <h3 className="fw-bold text-danger fs-2 saved-audio-index align-self-start">
        {index + 1}
      </h3>
      <div className="d-flex flex-column align-items-start">
        <time className="fw-bold small d-flex justify-content-center text-white time-component">
          {formatDate(audio.date)}
        </time>
        <h5 className="mb-0 saved-audio-title">{audio.title}</h5>
      </div>
      <div className="flex flex-column ms-auto pe-2 align-self-start">
        <TimeComponent seconds={audio.totalSeconds} />
        <ButtonGroup className="sm-height mt-1">
          <Button
            variant="danger"
            title="play"
            className="bg-gradient fs-5 d-flex justify-content-center align-items-center sm-height"
            disabled={isRecording}
            onClick={() =>
              setRecordedAudio({
                blob: audio.blob,
                totalSeconds: audio.totalSeconds,
                origin: "saved recording",
              })
            }
          >
            <CaretRightSquareFill />
          </Button>
          <Button
            variant="danger"
            title="delete"
            className="bg-gradient fs-5 d-flex justify-content-center align-items-center sm-height"
            onClick={(e) => {
              deleteAudioDb(audio.id);
              setDeleting(true);
            }}
            onMouseUp={() => {
              setDeleting(false);
            }}
          >
            <TrashFill />
          </Button>
        </ButtonGroup>
      </div>
    </li>
  );
}
