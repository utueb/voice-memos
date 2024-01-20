import "./App.css";
import { Container, Row, Col, ButtonGroup } from "react-bootstrap";
import RecordingIndicator from "./RecordingIndicator";
import { useRef, useState } from "react";
import {
  Circle,
  CircleFill,
  PauseFill,
  CaretRightFill,
} from "react-bootstrap-icons";
import { ToggleButton } from "./ToggleButton";
import { TimeComponent } from "./TimeComponent";
import { CancelBtn } from "./CancelBtn";
import { useAudioRecorder } from "./useAudioRecorder";
import { AudioPlayer } from "./AudioPlayer";
import { Volume } from "./Volume";

export default function App() {
  alert(
    "there will be errors with some code, maybe only with ones related to volume, at first time of page load, as there wont be a src"
  );
  alert("the last 1-2 seconds of recording isnt saved for some reason");
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
            <header className="d-flex py-2 px-3 align-items-center ">
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
                  <Volume
                    setIsPaused={setIsPaused}
                    play={actions.play}
                    pause={actions.pause}
                    isPlaying={isPlaying}
                    isSrcExists={recorder.audioSource !== ""}
                    updateVolume={actions.updateVolume}
                    toggleMute={actions.toggleMute}
                  />
                </>
              )}
            </header>
          </Col>
        </Row>

        {!isRecording && recorder.audioSource !== "" && (
          <AudioPlayer
            src={recorder.audioSource}
            duration={recorder.seconds}
            audioRef={audioRef}
            actions={actions}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
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
