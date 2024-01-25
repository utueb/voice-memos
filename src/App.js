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
import { useRef, useState } from "react";
import {
  Circle,
  CircleFill,
  PauseFill,
  CaretRightFill,
  TrashFill,
  Download,
} from "react-bootstrap-icons";
import { ToggleButton } from "./ToggleButton";
import { TimeComponent } from "./TimeComponent";
import { useAudioRecorder } from "./useAudioRecorder";
import { AudioPlayer } from "./AudioPlayer";

export default function App() {
  // alert(
  //   "there will be errors with some code, maybe only with ones related to volume, at first time of page load, as there wont be a src"
  // );
  // alert("the last 1-2 seconds of recording isnt saved for some reason");
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const recorder = useAudioRecorder(
    isRecording,
    setIsRecording,
    isPaused,
    setIsPaused
  );
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
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
                  disabled={recorder.totalSeconds < 3 && isRecording}
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
                  <TimeComponent seconds={recorder.totalSeconds} />
                  <RecordingIndicator isPaused={isPaused} />
                </>
              )}
            </header>
          </Col>
        </Row>

        {!isRecording && recorder.audioSource !== "" && (
          <>
            <AudioPlayer
              src={recorder.audioSource}
              duration={recorder.totalSeconds}
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
                      <Form.Control type="text" placeholder="title" required />
                    </FloatingLabel>
                    <ButtonGroup>
                      <Button
                        type="reset"
                        variant="danger"
                        title="delete"
                        className="bg-gradient fs-5 d-flex justify-content-center align-items-center"
                      >
                        <TrashFill />
                      </Button>
                      <Button
                        type="submit"
                        variant="danger"
                        title="save"
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

      {/* <Container fluid className="shadow-lg bg-secondary">
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={8} className="p-0">
          
          filters settings and stuff
          
          </Col>
        </Row>
      </Container> */}
    </>
  );
}
