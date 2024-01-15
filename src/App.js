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
      <Container fluid>
        <Row className="justify-content-center" id="header">
          <Col xs={12} lg={10} xl={8} className="p-0">
            <header className="d-flex py-2 px-3 align-items-center">
              <ButtonGroup>
                <ToggleButton
                  icons={[<Circle />, <CircleFill />]}
                  actions={[recorder.startAudio, recorder.endAudio]}
                  state={isRecording}
                  setState={setIsRecording}
                  disabled={recorder.seconds < 3 && isRecording}
                  purpose={"record"}
                />
                <ToggleButton
                  icons={[<CaretRightFill />, <PauseFill />]}
                  actions={[recorder.pauseAudio, recorder.resumeAudio]}
                  state={isPaused}
                  setState={setIsPaused}
                  disabled={!isRecording}
                  purpose={"pause"}
                />
              </ButtonGroup>

              <TimeComponent seconds={recorder.seconds} />

              {isRecording && <RecordingIndicator isPaused={isPaused} />}
            </header>

            <audio controls src={recorder.audioSource} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
