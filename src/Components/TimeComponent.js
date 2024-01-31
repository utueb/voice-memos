export function TimeComponent({ seconds }) {
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");

  return (
    <time className="fw-bold mx-1 mx-md-2 d-flex justify-content-center text-white time-component">
      {!isNaN(min) ? min : "--"}
      <span className="mx-1">:</span>
      {!isNaN(sec) ? sec : "--"}
    </time>
  );
}
