export default function useAudioActions(audioRef, setIsPlaying) {
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

  return actions;
}
