import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { memo, useEffect, useState } from "react";
import { TrashFill, CaretRightSquareFill } from "react-bootstrap-icons";
import { TimeComponent } from "./TimeComponent";
import { openDB } from "./openDB";
import { EmptyList } from "./EmptyList";

function AudioList({ audioDataUpdated, setRecordedAudio, isRecording }) {
  const [audioList, setAudioList] = useState([]);
  const [deleting, setDeleting] = useState(false);

  function deleteAudio(id) {
    openDB().then((db) => {
      const transaction = db.transaction(["audioStore"], "readwrite");
      const store = transaction.objectStore("audioStore");

      const request = store.delete(id);

      request.onsuccess = () => {
        console.log(`Audio data with id ${id} deleted from IndexedDB`);
      };

      request.onerror = (event) => {
        console.error(
          `Error deleting audio data with id ${id} from IndexedDB`,
          event.target.error
        );
      };
    });
  }

  function renderAudios() {
    openDB().then((db) => {
      const objectStore = db
        .transaction("audioStore")
        .objectStore("audioStore");
      objectStore.getAll().onsuccess = (event) => {
        setAudioList(event.target.result);
      };
    });
  }

  useEffect(() => {
    renderAudios();
  }, []);
  useEffect(() => {
    if (!audioDataUpdated) return;
    renderAudios();
  }, [audioDataUpdated]);

  useEffect(() => {
    if (!deleting) return;
    renderAudios();
  }, [deleting]);
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  }
  return (
    <Container fluid className="shadow-lg audio-list-container">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={8} className="p-0">
          <ul className="list-unstyled mb-0">
            {audioList.length === 0 && <EmptyList />}
            {audioList.map((audio, index) => {
              return (
                <li
                  key={audio.id}
                  className={`d-flex align-items-center pb-2 mt-1 ${
                    index + 1 !== audioList.length &&
                    "border-dark border-bottom"
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
                          deleteAudio(audio.id);
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
            })}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
export default memo(AudioList);
