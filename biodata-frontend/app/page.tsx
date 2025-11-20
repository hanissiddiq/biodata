"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!foto) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(foto);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [foto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!nama.trim() || !email.trim()) {
      setMessage("Nama dan email wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("email", email);
      if (foto) formData.append("foto", foto);

      const res = await fetch("http://localhost:8000/api/biodata", {
        method: "POST",        
        body: formData,
      });

      const data = await res.json();
      setMessage(data?.message ?? "Selesai.");
      if (res.ok) {
        setNama("");
        setEmail("");
        setFoto(null);
      }
    } catch (err) {
      setMessage("Gagal mengirim data. Periksa koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="topbar">
        <h1 className="title">Tambah Biodata</h1>
        <a
          href="http://localhost:3000/biodata"
          className="navBtn"
          aria-label="Lihat daftar biodata"
        >
          Lihat List Biodata
        </a>
      </header>

      <main className="card">
        <section className="formWrap">
          <p className="subtitle">Isi biodata dan upload foto. Tampilan responsif untuk mobile.</p>

          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <label>Nama</label>
              <input
                type="text"
                placeholder="Masukkan nama..."
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="email@contoh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="field">
              <label>Foto (opsional)</label>
              <div className="fileRow">
                <label className="fileLabel">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFoto(e.target.files?.[0] ?? null)}
                    disabled={loading}
                  />
                  <span className="btnFile">Pilih Foto</span>
                </label>

                {previewUrl ? (
                  <img src={previewUrl} alt="preview" className="preview" />
                ) : (
                  <div className="preview placeholder">No foto</div>
                )}
              </div>
            </div>

            <div className="actions">
              <button type="submit" className="btnPrimary" disabled={loading}>
                {loading ? "Mengirim..." : "Submit"}
              </button>
              <button
                type="button"
                className="btnGhost"
                onClick={() => {
                  setNama("");
                  setEmail("");
                  setFoto(null);
                  setMessage("");
                }}
                disabled={loading}
              >
                Reset
              </button>
            </div>

            {message && <p className="msg">{message}</p>}
          </form>
        </section>

        <aside className="previewPanel">
          <div className="previewCard">
            <div className="avatarWrap">
              {previewUrl ? (
                <img src={previewUrl} alt="avatar" />
              ) : (
                <div className="avatarFallback">BD</div>
              )}
            </div>
            <div className="info">
              <div className="infoName">{nama || "Nama akan tampil di sini"}</div>
              <div className="infoEmail">{email || "Email akan tampil di sini"}</div>
            </div>
          </div>

          <p className="note">Preview live menunjukkan bagaimana data akan muncul di list.</p>
        </aside>
      </main>

      <style>{`
        .page { padding: 20px; max-width: 980px; margin: 0 auto; font-family: Inter, system-ui, sans-serif; }
        .topbar { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:14px; }
        .title { margin:0; font-size:20px; color:#0f172a; }
        .navBtn {
          display:inline-block; text-decoration:none; padding:8px 12px; border-radius:10px;
          background: linear-gradient(90deg,#06b6d4,#3b82f6); color:#fff; font-weight:600;
          box-shadow: 0 6px 18px rgba(59,130,246,0.12);
        }

        .card {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 18px;
          background: linear-gradient(180deg,#ffffff,#f7fbff);
          padding: 18px; border-radius: 12px; box-shadow: 0 10px 30px rgba(2,6,23,0.06);
          align-items:start;
        }

        .subtitle { margin:0 0 12px 0; color:#64748b; font-size:13px; }

        .field { margin-bottom:12px; }
        label { display:block; margin-bottom:6px; color:#334155; font-size:13px; }
        input[type="text"], input[type="email"] {
          width:100%; padding:10px 12px; border-radius:8px; border:1px solid #cedef1ff;
          background:#adaaacff; outline:none; transition:box-shadow .12s, border-color .12s;
        }
        input[type="text"]:focus, input[type="email"]:focus { border-color:#60a5fa; box-shadow:0 8px 20px rgba(96,165,250,0.12); }

        .fileRow { display:flex; gap:12px; align-items:center; }
        .fileLabel { position:relative; display:inline-block; }
        .fileLabel input[type="file"] { position:absolute; inset:0; opacity:0; cursor:pointer; }
        .btnFile { padding:8px 12px; border-radius:8px; background:linear-gradient(90deg,#6366f1,#06b6d4); color:#fff; font-weight:600; }

        .preview { width:72px; height:72px; object-fit:cover; border-radius:10px; border:1px solid rgba(2,6,23,0.06); }
        .preview.placeholder { display:inline-flex; align-items:center; justify-content:center; width:72px; height:72px; background:#f1f5f9; color:#94a3b8; border-radius:8px; }

        .actions { display:flex; gap:8px; margin-top:8px; }
        .btnPrimary { background: linear-gradient(90deg,#06b6d4,#3b82f6); color:#fff; border:none; padding:10px 14px; border-radius:10px; font-weight:700; cursor:pointer; }
        .btnPrimary:disabled { opacity:0.6; cursor:default; }
        .btnGhost { background:transparent; border:1px solid #e6eef6; padding:10px 12px; border-radius:10px; cursor:pointer; }

        .msg { margin-top:10px; font-size:13px; padding:8px 10px; border-radius:8px; background:#eef2ff; color:#3730a3; }

        .previewPanel { display:flex; flex-direction:column; gap:12px; }
        .previewCard { display:flex; gap:12px; align-items:center; padding:12px; border-radius:12px; background:linear-gradient(180deg,#ffffff,#f8fafc); border:1px solid rgba(15,23,42,0.04); }
        .avatarWrap { width:72px; height:72px; border-radius:9999px; overflow:hidden; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#6366f1,#06b6d4); flex-shrink:0; }
        .avatarWrap img { width:100%; height:100%; object-fit:cover; }
        .avatarFallback { color:#fff; font-weight:700; font-size:18px; }
        .infoName { font-weight:700; color:#0f172a; }
        .infoEmail { color:#64748b; font-size:13px; }

        .note { margin:0; font-size:12px; color:#94a3b8; }

        @media (max-width: 880px) {
          .card { grid-template-columns: 1fr; }
          .previewPanel { order:-1; }
          .navBtn { padding:7px 10px; font-size:14px; }
        }

        @media (max-width: 420px) {
          .title { font-size:18px; }
          .btnFile, .btnPrimary, .btnGhost { padding:8px 10px; font-size:13px; }
        }
      `}</style>
    </div>
  );
}