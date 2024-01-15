import { useEffect, useRef, useState } from "react";

export function useAudioRecorder(
  isRecording,
  setIsRecording,
  isPaused,
  setIsPaused
) {
  const mediaRecorderRef = useRef(null);
  const [audioSource, setAudioSource] = useState("");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;

    if (isRecording && !isPaused) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRecording, isPaused]);
  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(stream);

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
      setSeconds(0);
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
        setIsRecording(false);
        setIsPaused(false);
      }
    }
    return seconds;
  };

  const pauseAudio = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeAudio = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
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
    seconds,
  };
}
