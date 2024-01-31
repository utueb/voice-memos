import {
  Row,
  Col,
  ButtonGroup,
  Form,
  FloatingLabel,
  Button,
  InputGroup,
} from "react-bootstrap";
import { TrashFill, Download } from "react-bootstrap-icons";

export function AudioForm({
  inputRef,
  setModalActive,
  modalActive,
  setAudioDataUpdated,
  saveAudio,
}) {
  return (
    <Row className="justify-content-center py-2">
      <Col
        xs={12}
        sm={10}
        md={8}
        lg={10}
        xl={8}
        className="d-flex align-items-center flex-wrap p-0 justify-content-center"
      >
        <Form className="w-100">
          <InputGroup>
            <FloatingLabel controlId="floating-title" label="title">
              <Form.Control
                type="text"
                placeholder="title"
                required
                maxLength={"64"}
                ref={inputRef}
              />
            </FloatingLabel>
            <ButtonGroup>
              <Button
                type="reset"
                variant="danger"
                title="delete"
                className="bg-gradient fs-5 d-flex justify-content-center align-items-center"
                onClick={() => setModalActive(!modalActive)}
              >
                <TrashFill />
              </Button>
              <Button
                type="submit"
                variant="danger"
                title="save"
                onClick={(e) => {
                  saveAudio(inputRef.current.value, e);
                }}
                onMouseUp={() => {
                  setAudioDataUpdated(false);
                }}
                className="bg-gradient fs-5 d-flex justify-content-center align-items-center"
              >
                <Download />
              </Button>
            </ButtonGroup>
          </InputGroup>
        </Form>
      </Col>
    </Row>
  );
}
