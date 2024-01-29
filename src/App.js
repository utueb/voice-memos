import "./App.css";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Form,
  FloatingLabel,
  Button,
  InputGroup,
} from "react-bootstrap";
import RecordingIndicator from "./RecordingIndicator";
import { useEffect, useRef, useState } from "react";
import {
  Circle,
  CircleFill,
  PauseFill,
  CaretRightFill,
  TrashFill,
  Download,
  CaretRightSquareFill,
} from "react-bootstrap-icons";
import { ToggleButton } from "./ToggleButton";
import { TimeComponent } from "./TimeComponent";
import { useAudioRecorder } from "./useAudioRecorder";
import { AudioPlayer } from "./AudioPlayer";
import { ConfirmModal } from "./ConfirmModal";
import { openDB } from "./openDB";
export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [audioDataUpdated, setAudioDataUpdated] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState({
    src: null,
    totalSeconds: null,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const recorder = useAudioRecorder(
    isRecording,
    setIsRecording,
    isPaused,
    setIsPaused
  );

  const inputRef = useRef(null);
  const audioRef = useRef();
  function resetRecordedAudioState() {
    setRecordedAudio({
      src: null,
      totalSeconds: null,
    });
  }
  const actions = {
    play: () => {
      audioRef.current.play();
      setIsPlaying(true);
    },
    pause: () => {
      audioRef.current.pause();
      setIsPlaying(false);
    },
    rewindAudio: (seconds) => (audioRef.current.currentTime += seconds),
    playBackRate: (rate) => (audioRef.current.playbackRate = rate),
    updateAudio: (current) => {
      audioRef.current.currentTime = current;
    },
    updateVolume: (volume) => {
      audioRef.current.volume = volume;
    },
    toggleMute: (volume) => {
      audioRef.current.muted = volume;
    },
  };

  function saveAudio(title) {
    const audio = {
      title,
      date: new Date(),
      blob: recordedAudio.blob,
      totalSeconds: recordedAudio.totalSeconds,
    };
    openDB().then((db) => {
      const transaction = db.transaction(["audioStore"], "readwrite");
      const store = transaction.objectStore("audioStore");
      const request = store.add(audio);

      request.onsuccess = () => {
        console.log("Audio data added to IndexedDB");
        resetRecordedAudioState();
      };

      request.onerror = (event) => {
        console.error(
          "Error adding audio data to IndexedDB",
          event.target.error
        );
      };
    });
  }

  useEffect(() => {
    setRecordedAudio({
      src: recorder.audioSource,
      totalSeconds: recorder.totalSeconds,
    });
  }, [recorder.audioSource, recorder.totalSeconds]);
  return (
    <>
      <Container fluid id="header" className="shadow-lg">
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={8} className="p-0">
            <header className="d-flex py-2 px-3 align-items-center">
              <img src="favicon.ico" alt="icon" className="me-3" />
              <ButtonGroup>
                <ToggleButton
                  icons={[<Circle />, <CircleFill />]}
                  actions={[recorder.startAudio, recorder.endAudio]}
                  state={isRecording}
                  setState={setIsRecording}
                  disabled={recordedAudio.totalSeconds < 3 && isRecording}
                  purpose={"record"}
                  size={"sm"}
                />
                <ToggleButton
                  icons={[<CaretRightFill />, <PauseFill />]}
                  actions={[recorder.pauseAudio, recorder.resumeAudio]}
                  state={isPaused}
                  setState={setIsPaused}
                  disabled={!isRecording}
                  purpose={"pause"}
                  size={"sm"}
                />
              </ButtonGroup>
              {isRecording && (
                <>
                  <TimeComponent seconds={recordedAudio.totalSeconds} />
                  <RecordingIndicator isPaused={isPaused} />
                </>
              )}
            </header>
          </Col>
        </Row>

        {!isRecording && recordedAudio.src !== null && (
          <>
            <AudioPlayer
              src={recordedAudio.src}
              duration={recordedAudio.totalSeconds}
              audioRef={audioRef}
              actions={actions}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
            <Row className="justify-content-center py-2">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={10}
                xl={8}
                className="d-flex align-items-center flex-wrap p-0 justify-content-center"
              >
                <Form className="w-100">
                  <InputGroup>
                    <FloatingLabel controlId="floating-title" label="title">
                      <Form.Control
                        type="text"
                        placeholder="title"
                        required
                        ref={inputRef}
                      />
                    </FloatingLabel>
                    <ButtonGroup>
                      <Button
                        type="reset"
                        variant="danger"
                        title="delete"
                        className="bg-gradient fs-5 d-flex justify-content-center align-items-center"
                        onClick={() => setModalActive(!modalActive)}
                      >
                        <TrashFill />
                      </Button>
                      <Button
                        type="submit"
                        variant="danger"
                        title="save"
                        onClick={(e) => {
                          if (inputRef.current.value === "") return;
                          e.preventDefault();
                          saveAudio(inputRef.current.value);
                          setAudioDataUpdated(true);
                          resetRecordedAudioState();
                        }}
                        onMouseUp={() => {
                          setAudioDataUpdated(false);
                        }}
                        className="bg-gradient fs-5 d-flex justify-content-center align-items-center"
                      >
                        <Download />
                      </Button>
                    </ButtonGroup>
                  </InputGroup>
                </Form>
              </Col>
            </Row>
          </>
        )}
      </Container>
      <ConfirmModal
        modalActive={modalActive}
        setModalActive={setModalActive}
        resetRecordedAudioState={resetRecordedAudioState}
      />

      <Container fluid className="shadow-lg bg-secondary">
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={8} className="p-0">
            filters settings and stuff
            {/* <AudioList audioDataUpdated={audioDataUpdated} /> */}
          </Col>
        </Row>
      </Container>
    </>
  );
}
function AudioList({ audioDataUpdated }) {
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
    <ul>
      {audioList.map((audio) => {
        const src = URL.createObjectURL(audio.blob);
        return (
          <li key={audio.id}>
            {audio.title}
            <Button
              type="reset"
              variant="danger"
              title="delete"
              className="bg-gradient fs-5 d-flex justify-content-center align-items-center"
            >
              <CaretRightSquareFill />
            </Button>
            <audio src={src} controls></audio>
            <TimeComponent seconds={audio.totalSeconds} />
            <time>{formatDate(audio.date)}</time>
            <Button
              type="reset"
              variant="danger"
              title="delete"
              className="bg-gradient fs-5 d-flex justify-content-center align-items-center"
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
          </li>
        );
      })}
    </ul>
  );
}
