import { useEffect, useState } from "react";
import { VolumeMuteFill, VolumeUpFill } from "react-bootstrap-icons";
import { ToggleButton } from "./ToggleButton";
import { Range } from "./Range";

export function Volume({
  play,
  pause,
  isPlaying,
  isSrcExists,
  updateVolume,
  toggleMute,
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);

  function mute() {
    toggleMute(true);
  }
  function unmute() {
    toggleMute(false);
  }

  useEffect(() => {
    if (!isSrcExists) return;
    updateVolume(volume / 100);
  }, [volume, updateVolume, isSrcExists]);

  return (
    <div className="volume-container rounded">
      <h3 className="mb-0 mx-1 text-white text-center">{volume}</h3>
      <ToggleButton
        icons={[<VolumeUpFill />, <VolumeMuteFill />]}
        actions={[mute, unmute]}
        state={isMuted}
        setState={setIsMuted}
        disabled={false}
        purpose={"pause/resume"}
        size={"sm"}
      />

      {isSrcExists ? (
        <Range
          rangePurpose={"volume"}
          additionalClasses={""}
          maxValue={100}
          currentValue={volume}
          updateCurrentValue={setVolume}
          initialPercentage={volume / 100}
          play={play}
          pause={pause}
          isPlaying={isPlaying}
        />
      ) : (
        <Range
          rangePurpose={"volume"}
          additionalClasses={""}
          maxValue={100}
          currentValue={volume}
          updateCurrentValue={setVolume}
          initialPercentage={volume / 100}
          isPlaying={isPlaying}
        />
      )}
    </div>
  );
}
