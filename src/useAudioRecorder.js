import { useRef, useState } from "react";
import { useStopwatch } from "react-timer-hook";

export function useAudioRecorder(
  isRecording,
  setIsRecording,
  isPaused,
  setIsPaused
) {
  const mediaRecorderRef = useRef(null);
  const [audioSource, setAudioSource] = useState("");

  const { totalSeconds, start, pause, reset } = useStopwatch();

  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(stream);
      reset(0, false);
      start();
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const audioBlob = new Blob([event.data], { type: "audio/wav" });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioSource(audioUrl);
        }
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const endAudio = () => {
    if (mediaRecorderRef.current) {
      if (
        mediaRecorderRef.current.state === "recording" ||
        mediaRecorderRef.current.state === "paused"
      ) {
        mediaRecorderRef.current.stop();
        pause();
        setIsRecording(false);
        setIsPaused(false);
      }
    }

    return totalSeconds;
  };

  const pauseAudio = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      pause();
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeAudio = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      start();
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  return {
    startAudio,
    endAudio,
    pauseAudio,
    resumeAudio,
    audioSource,
    isRecording,
    isPaused,
    totalSeconds,
  };
}
