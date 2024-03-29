import { Row, Col, ButtonGroup, Button, Placeholder } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  PauseFill,
  CaretRightFill,
  RewindBtnFill,
  FastForwardBtnFill,
  InfoCircleFill,
} from "react-bootstrap-icons";
import { ToggleButton } from "./ToggleButton";
import { TimeComponent } from "./TimeComponent";
import { Range } from "./Range";
import { PlayBackSpeed } from "./PlayBackSpeed";
import { Volume } from "./Volume";
import "../styles/AudioPlayer.css";

export function AudioPlayer({
  blob,
  duration,
  audioRef,
  actions,
  isPlaying,
  setIsPlaying,
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    const handleTimeUpdate = () => {
      const time = Math.ceil(audioRef.current.currentTime);
      setCurrentTime(time > duration ? duration : time);
    };

    const element = audioRef.current.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    return () => {
      if (element !== undefined)
        element.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef, duration]);

  useEffect(() => {
    URL.revokeObjectURL(audioUrl);
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [blob]);

  return (
    <Row className="justify-content-center py-2 position-relative dropdown-margin">
      <Col
        xs={12}
        sm={10}
        md={8}
        lg={10}
        xl={8}
        className="d-flex align-items-center flex-wrap rounded px-4 py-3 audio-player justify-content-center justify-content-sm-start"
      >
        <audio controls src={audioUrl} ref={audioRef} className="hide-audio" />
        <div className="d-flex flex-column-reverse flex-sm-row w-100 align-items-start align-items-sm-center mb-3 mb-sm-1">
          <span className="d-inline-flex align-items-center fw-bold text-white">
            <TimeComponent seconds={currentTime} />/
            <TimeComponent seconds={duration} />
          </span>
          {audioRef.current && (
            <Range
              rangePurpose={"audio"}
              additionalClasses={"flex-grow-1"}
              maxValue={duration}
              currentValue={audioRef.current.currentTime}
              updateCurrentValue={actions.updateAudio}
              initialPercentage={currentTime / duration}
              play={actions.play}
              pause={actions.pause}
              isPlaying={isPlaying}
            />
          )}
          {!audioRef.current && (
            <div className="d-flex w-100 align-items-center">
              <InfoCircleFill
                title="you must start playing for range to load"
                className="text-white fs-5 mx-2"
              />
              <Placeholder as="p" animation="glow" className="w-100 mb-0">
                <Placeholder xs={12} bg={"secondary"} />
              </Placeholder>
            </div>
          )}
        </div>
        <div className="w-100 controls-container">
          <ButtonGroup className="controls">
            <Button
              variant="danger"
              className="bg-gradient fs-5 d-flex justify-content-center sm-height"
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
              size={"sm"}
            />
            <Button
              variant="danger"
              className="bg-gradient fs-5 d-flex justify-content-center sm-height"
              onClick={() => actions.rewindAudio(5)}
              title={"rewind 5"}
              size={"lg"}
            >
              <FastForwardBtnFill />
            </Button>
          </ButtonGroup>
          <PlayBackSpeed playBackRate={actions.playBackRate} />
          <Volume
            setIsPaused={!setIsPlaying}
            play={actions.play}
            pause={actions.pause}
            isPlaying={isPlaying}
            isSrcExists={audioUrl !== ""}
            updateVolume={actions.updateVolume}
            toggleMute={actions.toggleMute}
          />
        </div>
      </Col>
    </Row>
  );
}
