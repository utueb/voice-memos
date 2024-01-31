import { Col, Container, Row } from "react-bootstrap";
import { memo, useEffect, useState, useCallback } from "react";

import { renderAudioDb } from "../openDB";
import { EmptyList } from "./EmptyList";
import { ListOrder } from "./ListOrder";
import "../styles/AudioList.css";
import { AudioListItem } from "./AudioListItem";

function AudioList({ audioDataUpdated, setRecordedAudio, isRecording }) {
  const [audioList, setAudioList] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [order, setOrder] = useState("Date ↑");
  const [list, setList] = useState([]);

  useEffect(() => {
    renderAudioDb(setAudioList);
  }, []);
  useEffect(() => {
    if (!audioDataUpdated) return;
    renderAudioDb(setAudioList);
  }, [audioDataUpdated]);

  useEffect(() => {
    if (!deleting) return;
    renderAudioDb(setAudioList);
  }, [deleting]);

  const sortAudioList = useCallback(() => {
    switch (order) {
      case "Date ↑":
        return [...audioList].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      case "Date ↓":
        return [...audioList].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      case " A-Z":
        return [...audioList].sort((a, b) => a.title.localeCompare(b.title));
      case "Z-A":
        return [...audioList].sort((a, b) => b.title.localeCompare(a.title));
      case "Duration ↑":
        return [...audioList].sort((a, b) => b.totalSeconds - a.totalSeconds);
      case " Duration ↓":
        return [...audioList].sort((a, b) => a.totalSeconds - b.totalSeconds);
      default:
        return audioList;
    }
  }, [order, audioList]);
  useEffect(() => {
    const sortedAudioList = sortAudioList();
    setList(sortedAudioList);
  }, [order, sortAudioList]);

  return (
    <Container
      fluid
      className="shadow-lg audio-list-container flex-grow-1 d-flex flex-column"
    >
      <Row className="align-content-center flex-grow-1 flex-column">
        {audioList.length > 0 && (
          <Col
            xs={12}
            lg={10}
            xl={8}
            className="p-0 dropdown-margin border-dark border-bottom"
          >
            <div className="d-flex align-items-center mt-2 mb-1 position-relative">
              <h2 className="mb-0">sort by:</h2>
              <ListOrder setOrder={setOrder} />
            </div>
          </Col>
        )}
        <Col
          xs={12}
          lg={10}
          xl={8}
          className="p-0 flex-grow-1 d-grid fill-page"
        >
          <ul className="list-unstyled mb-0 pt-2">
            {audioList.length === 0 && <EmptyList />}
            {list.map((audio, index) => {
              return (
                <AudioListItem
                  key={index}
                  index={index}
                  listLength={audioList.length}
                  audio={audio}
                  setDeleting={setDeleting}
                  isRecording={isRecording}
                  setRecordedAudio={setRecordedAudio}
                />
              );
            })}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
export default memo(AudioList);
