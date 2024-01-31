import "./App.css";
import { useEffect, useRef, useState } from "react";
import { useAudioRecorder } from "./CustomHooks/useAudioRecorder";
import { ConfirmModal } from "./Components/ConfirmModal";
import { saveDb } from "./openDB";
import AudioList from "./Components/AudioList";
import useAudioActions from "./CustomHooks/useAudioActions";
import { Header } from "./Components/Header";

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [audioDataUpdated, setAudioDataUpdated] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState({
    blob: null,
    totalSeconds: null,
    origin: null,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const inputRef = useRef(null);
  const audioRef = useRef(null);

  const recorder = useAudioRecorder(
    isRecording,
    setIsRecording,
    isPaused,
    setIsPaused
  );

  const actions = useAudioActions(audioRef, setIsPlaying);

  function resetRecordedAudioState() {
    setRecordedAudio({
      blob: null,
      totalSeconds: null,
      origin: null,
    });
  }

  function saveAudio(title, e) {
    if (inputRef.current.value === "") return;
    e.preventDefault();
    actions.pause();

    const audio = {
      title,
      date: new Date(),
      blob: recordedAudio.blob,
      totalSeconds: recordedAudio.totalSeconds,
    };

    setTimeout(() => {
      setAudioDataUpdated(true);
      saveDb(audio);
      resetRecordedAudioState();
    }, 100);
  }

  useEffect(() => {
    setRecordedAudio({
      totalSeconds: recorder.totalSeconds,
      blob: recorder.audioBlob,
      origin: "new recording",
    });
  }, [recorder.audioBlob, recorder.totalSeconds]);

  return (
    <>
      <Header
        recorder={recorder}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        recordedAudio={recordedAudio}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        actions={actions}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        modalActive={modalActive}
        inputRef={inputRef}
        setModalActive={setModalActive}
        saveAudio={saveAudio}
        setAudioDataUpdated={setAudioDataUpdated}
      />
      <ConfirmModal
        modalActive={modalActive}
        setModalActive={setModalActive}
        resetRecordedAudioState={resetRecordedAudioState}
      />
      <AudioList
        audioDataUpdated={audioDataUpdated}
        setRecordedAudio={setRecordedAudio}
        isRecording={isRecording}
      />
    </>
  );
}
