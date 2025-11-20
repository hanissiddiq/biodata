async function getData() {
  const res = await fetch("http://localhost:8000/api/biodata", {
    cache: "no-store"
  });
  return res.json();
}

function initials(name?: string) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map(p => p[0]?.toUpperCase() ?? "").join("");
}

export default async function BiodataPage() {
  const data = await getData();

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 16 }}>List Biodata</h1>

      <div className="grid">
        {Array.isArray(data) && data.length ? (
          data.map((item) => (
            <div key={item.id} className="card">
              <div className="content">
                <h2 className="name">{item.nama}</h2>
                <p className="email">{item.email}</p>
                <p className="meta">ID: {item.id}</p>
              </div>

              <div className="avatar">
                {item.foto ? (
                  <img
                    src={`http://localhost:8000/storage/${item.foto}`}
                    alt={item.nama}
                    className="photo"
                  />
                ) : (
                  <div className="placeholder" aria-hidden>
                    {initials(item.nama)}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Tidak ada data.</p>
        )}
      </div>

      <style>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }

        .card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid rgba(15, 23, 42, 0.06);
          padding: 14px;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(15,23,42,0.06);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(15,23,42,0.12);
        }

        .content {
          flex: 1 1 auto;
          min-width: 0;
        }

        .name {
          margin: 0 0 6px 0;
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .email {
          margin: 0 0 6px 0;
          font-size: 14px;
          color: #475569;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .meta {
          margin: 0;
          font-size: 12px;
          color: #94a3b8;
        }

        .avatar {
          flex: 0 0 auto;
          margin-left: 12px;
          display: flex;
          align-items: center;
        }

        .photo {
          width: 72px;
          height: 72px;
          object-fit: cover;
          border-radius: 9999px;
          border: 2px solid rgba(2,6,23,0.06);
          box-shadow: 0 6px 18px rgba(2,6,23,0.06);
        }

        .placeholder {
          width: 72px;
          height: 72px;
          border-radius: 9999px;
          background: linear-gradient(135deg,#6366f1,#06b6d4);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 18px;
          border: 2px solid rgba(2,6,23,0.06);
          box-shadow: 0 6px 18px rgba(2,6,23,0.06);
        }

        /* Responsive: on very small screens stack and keep avatar to the right */
        @media (max-width: 480px) {
          .card {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .avatar {
            align-self: flex-end;
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}