import "./App.css";
import { Container, Row, Col, ButtonGroup } from "react-bootstrap";
import RecordingIndicator from "./RecordingIndicator";
import { useState } from "react";
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
