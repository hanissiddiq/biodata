async function getData() {
  const res = await fetch("http://localhost:8000/api/biodata", {
    cache: "no-store"
  });
  return res.json();
}

export default async function BiodataPage() {
  const data = await getData();

  return (
    <div style={{ padding: 20 }}>
      <h1>List Biodata</h1>
      {data.map((item) => (
        <div key={item.id} style={{ marginBottom: 20 }}>
          <p>Nama: {item.nama}</p>
          <p>Email: {item.email}</p>

          {item.foto && (
            <img
              src={`http://localhost:8000/storage/${item.foto}`}
              width={150}
            />
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}