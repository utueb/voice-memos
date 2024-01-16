import { useState } from "react";
import { VolumeMuteFill, VolumeUpFill } from "react-bootstrap-icons";
import { ToggleButton } from "./ToggleButton";
import { Range } from "./Range";

export function Volume() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(false);
  const [rangeValue, setRangeValue] = useState();

  //TODO: make range increase or decrease volume and the button mute/unmute it
  // TODO: make this single volume component affect the volume of all audios
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
