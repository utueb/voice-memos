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

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center" id="header">
          <Col xs={12} lg={10} xl={8} className="p-0">
            <header className="d-flex py-2 px-3">
              <ButtonGroup>
                <ToggleButton
                  icons={[<Circle />, <CircleFill />]}
                  state={isRecording}
                  setState={setIsRecording}
                  disabled={false}
                  purpose={"record"}
                />
                <ToggleButton
                  icons={[<CaretRightFill />, <PauseFill />]}
                  state={isPaused}
                  setState={setIsPaused}
                  disabled={!isRecording}
                  purpose={"pause"}
                />

                {isRecording && <CancelBtn />}
              </ButtonGroup>

              <TimeComponent seconds={4232} />

              {isRecording && <RecordingIndicator />}
            </header>
          </Col>
        </Row>
      </Container>
    </>
  );
}
