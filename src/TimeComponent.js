export function TimeComponent({ seconds }) {
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");

  return (
    <time className="fw-bold fs-5 mx-2 d-flex justify-content-center text-white">
      {!isNaN(min) ? min : "--"}
      <span className="mx-1">:</span>
      {!isNaN(sec) ? sec : "--"}
    </time>
  );
}
