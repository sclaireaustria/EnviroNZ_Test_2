import { Suburb } from "./SuburbList";

type Props = {
  result: Suburb | null;
};

export default function ResultCard({ result }: Props) {
  if (!result) return null;

  return (
    <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
      <h3>Closest Suburb:</h3>
      <p><strong>{result.suburbName}</strong></p>
      <small>({result.latitude}, {result.longitude})</small>
    </div>
  );
}