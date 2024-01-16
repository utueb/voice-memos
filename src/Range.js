import { ProgressBar } from "react-bootstrap";

export function Range({ additionalClasses = "" }) {
  //TODO: make this work
  //TODO: get x position of the click on the div, update progressbar to that persentage
  //TODO: return the max value devided by % to parent component
  //TODO: use this to volume or rewind audos
  return (
    <div className={`w-100 ${additionalClasses} custom-range`} role="button">
      <ProgressBar animated now={45} variant={"danger"} />
    </div>
  );
}
