import "./App.css";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  DropdownButton,
  Dropdown,
  ProgressBar,
} from "react-bootstrap";
import RecordingIndicator from "./RecordingIndicator";
import { useEffect, useRef, useState } from "react";
import {
  Circle,
  CircleFill,
  PauseFill,
  CaretRightFill,
  RewindBtnFill,
  FastForwardBtnFill,
  VolumeMuteFill,
  VolumeUpFill,
} from "react-bootstrap-icons";
import { ToggleButton } from "./ToggleButton";
import { TimeComponent } from "./TimeComponent";
import { CancelBtn } from "./CancelBtn";
import { useAudioRecorder } from "./useAudioRecorder";

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const recorder = useAudioRecorder(
    isRecording,
    setIsRecording,
    isPaused,
    setIsPaused
  );

  return (
    <>
      <Container fluid id="header">
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
                  disabled={recorder.seconds < 3 && isRecording}
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
                  <TimeComponent seconds={recorder.seconds} />
                  <RecordingIndicator isPaused={isPaused} />
                </>
              )}
              {!isRecording && (
                <>
                  <Volume />
                </>
              )}
            </header>
          </Col>
        </Row>

        {!isRecording && recorder.audioSource !== "" && (
          <AudioPlayer src={recorder.audioSource} duration={recorder.seconds} />
        )}
      </Container>
    </>
  );
}

function AudioPlayer({ src, duration }) {
  const audioRef = useRef();
  const actions = {
    play: () => audioRef.current.play(),
    pause: () => audioRef.current.pause(),
    rewindAudio: (seconds) => (audioRef.current.currentTime += seconds),
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(Math.round(audioRef.current.currentTime));
    };

    const element = audioRef.current.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    return () => {
      if (element !== undefined)
        element.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <Row className="justify-content-center py-2">
      <Col
        xs={12}
        lg={10}
        xl={8}
        className="d-flex align-items-center flex-wrap rounded py-2 py-3 audio-player"
      >
        <audio controls src={src} ref={audioRef} className="hide-audio" />
        <Range additionalClasses={"flex-grow-1 mb-1"} />
        <ButtonGroup>
          <Button
            variant="danger"
            className="bg-gradient fs-5 d-flex justify-content-center"
            onClick={() => actions.rewindAudio(-5)}
            title={"rewind -5"}
            size={"lg"}
          >
            <RewindBtnFill />
          </Button>
          <ToggleButton
            icons={[<CaretRightFill />, <PauseFill />]}
            actions={[actions.play, actions.pause]}
            state={isPlaying}
            setState={setIsPlaying}
            disabled={false}
            purpose={"pause/resume"}
            size={"lg"}
          />
          <Button
            variant="danger"
            className="bg-gradient fs-5 d-flex justify-content-center"
            onClick={() => actions.rewindAudio(5)}
            title={"rewind 5"}
            size={"lg"}
          >
            <FastForwardBtnFill />
          </Button>
        </ButtonGroup>
        <span className="d-inline-flex align-items-center fw-bold text-white">
          <TimeComponent seconds={currentTime} />/
          <TimeComponent seconds={duration} />
        </span>
        <PlayBackSpeed />
      </Col>
    </Row>
  );
}
function PlayBackSpeed() {
  return (
    <DropdownButton
      as={ButtonGroup}
      id={`playback-speed-dropdown`}
      variant={"danger"}
      size={"md"}
      className="bg-gradient mx-2"
      title={" 1 "}
      data-bs-theme="dark"
      drop={"end"}
    >
      {Array.from({ length: 8 }, (_, index) => {
        const num = (index + 1) / 4;
        return (
          <Dropdown.Item
            eventKey={index + 1}
            key={index + 1}
            className="fw-bold"
            active={num === 1}
          >
            {num}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
}

function Volume() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(false);
  const [rangeValue, setRangeValue] = useState();

  return (
    <div className="volume-container rounded">
      <ToggleButton
        icons={[<VolumeMuteFill />, <VolumeUpFill />]}
        // actions={[actions.play, actions.pause]}
        state={isMuted}
        setState={setIsMuted}
        disabled={false}
        purpose={"pause/resume"}
        size={"sm"}
      />

      <Range additionalClasses={""} />
    </div>
  );
}
function Range({ additionalClasses = "" }) {
  return (
    <div className={`w-100 ${additionalClasses} custom-range`} role="button">
      <ProgressBar animated now={45} variant={"danger"} />
    </div>
  );
}
