import { ButtonGroup, Button, Modal } from "react-bootstrap";

export function ConfirmModal({
  modalActive,
  setModalActive,
  resetRecordedAudioState,
}) {
  const hide = () => setModalActive(false);
  return (
    <>
      <Modal
        show={modalActive}
        onHide={hide}
        backdrop="static"
        keyboard={false}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">
            are you sure you want to delete recording?
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <ButtonGroup>
            <Button
              variant="danger"
              title="cancel"
              className="bg-gradient fs-5 d-flex justify-content-center align-items-center sm-height"
              onClick={hide}
            >
              cancel
            </Button>
            <Button
              variant="danger"
              title="cancel"
              className="bg-gradient fs-5 d-flex justify-content-center align-items-center sm-height"
              onClick={() => {
                resetRecordedAudioState();
                hide();
              }}
            >
              confirm
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </>
  );
}
