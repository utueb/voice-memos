import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import {
  PauseFill,
  CaretRightFill,
  RewindBtnFill,
  FastForwardBtnFill,
} from "react-bootstrap-icons";
import { ToggleButton } from "./ToggleButton";
import { TimeComponent } from "./TimeComponent";
import { Range } from "./Range";
import { PlayBackSpeed } from "./PlayBackSpeed";

export function AudioPlayer({ src, duration }) {
  // TODO: only allow one audioplayer to play at a time
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
