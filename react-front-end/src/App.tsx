import { useState } from "react";
import CoordinateForm from "./components/CoordinatesForm";
import ResultCard from "./components/SuburbDisplay";
import SuburbList, { Suburb } from "./components/SuburbList";

function App() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [allSuburbs, setAllSuburbs] = useState<Suburb[]>([]);

  const fetchAllSuburbs = async () => {
  try {
    const response = await fetch("http://localhost:5203/api/suburbs");
    if (!response.ok) throw new Error("Failed to fetch suburbs");
    const data = await response.json();
    setAllSuburbs(data);
  } catch (err) {
    console.error(err);
  }
};

  const fetchSuburb = async (latitude: number, longitude: number) => {
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:5203/api/closest-suburb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      setResult(data);
    } catch {
      setError("Could not fetch closest suburb. Is the backend running?");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "Arial" }}>
      <h1>Closest Suburb Finder</h1>
      <CoordinateForm onSubmit={fetchSuburb} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ResultCard result={result} />
      <div style={{ marginTop: "1rem" }}>
      <button onClick={fetchAllSuburbs}>Show All Suburbs</button>
    </div>

    <SuburbList suburbs={allSuburbs} /> 
    </div>
  );
}

export default App;