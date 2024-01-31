import "../styles/Header.css";
import { Container, Row, Col, ButtonGroup } from "react-bootstrap";
import RecordingIndicator from "./RecordingIndicator";
import {
  Circle,
  CircleFill,
  PauseFill,
  CaretRightFill,
} from "react-bootstrap-icons";
import { ToggleButton } from "./ToggleButton";
import { TimeComponent } from "./TimeComponent";
import { AudioPlayer } from "./AudioPlayer";
import { AudioForm } from "./AudioForm";

export function Header({
  recorder,
  isRecording,
  setIsRecording,
  recordedAudio,
  isPaused,
  setIsPaused,
  actions,
  audioRef,
  isPlaying,
  setIsPlaying,
  modalActive,
  inputRef,
  setModalActive,
  saveAudio,
  setAudioDataUpdated,
}) {
  return (
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
                disabled={
                  (recordedAudio.totalSeconds < 3 && isRecording) || isPlaying
                }
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
      {!isRecording && recordedAudio.blob !== null && (
        <AudioPlayer
          blob={recordedAudio.blob}
          duration={recordedAudio.totalSeconds}
          audioRef={audioRef}
          actions={actions}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      )}
      {!isRecording &&
        recordedAudio.origin === "new recording" &&
        recordedAudio.blob !== null && (
          <AudioForm
            inputRef={inputRef}
            setModalActive={setModalActive}
            modalActive={modalActive}
            setAudioDataUpdated={setAudioDataUpdated}
            saveAudio={saveAudio}
          />
        )}
    </Container>
  );
}
