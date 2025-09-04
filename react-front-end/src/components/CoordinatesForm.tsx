import { useState } from "react";

type Props = {
  onSubmit: (lat: number, lng: number) => void;
};

export default function CoordinateForm({ onSubmit }: Props) {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum) || latNum < -90 || latNum > 90 || lngNum < -180 || lngNum > 180) {
      setError("Latitude must be between -90 and 90, longitude between -180 and 180.");
      return;
    }

    onSubmit(latNum, lngNum);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Latitude: </label>
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
      </div>
      <div>
        <label>Longitude: </label>
        <input
          type="text"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
      </div>
      <button type="submit">Find Suburb</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}