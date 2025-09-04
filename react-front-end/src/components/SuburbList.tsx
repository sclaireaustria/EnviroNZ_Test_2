export type Suburb = {
  id?: number;
  suburbName: string;
  latitude: number;
  longitude: number;
};

type Props = {
  suburbs: Suburb[];
};

export default function SuburbList({ suburbs }: Props) {
  if (suburbs.length === 0) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>All Suburbs:</h3>
      <ul>
        {suburbs.map((s, index) => (
          <li key={index}>
            {s.suburbName} ({s.latitude}, {s.longitude})
          </li>
        ))}
      </ul>
    </div>
  );
}