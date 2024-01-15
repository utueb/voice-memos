export function TimeComponent({ seconds }) {
  const minutes = Math.floor(seconds / 60);
  return (
    <time className="fw-bold fs-5 mx-2 d-flex justify-content-center text-white">
      {minutes}
      <span className="mx-1">:</span>
      {seconds % 60}
    </time>
  );
}
