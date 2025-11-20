"use client";

import { useState } from "react";

export default function Home() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("email", email);
    if (foto) formData.append("foto", foto);

    const res = await fetch("http://localhost:8000/api/biodata", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Form Biodata + Upload Foto</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        /> <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> <br />

        <input
          type="file"
          onChange={(e) => setFoto(e.target.files[0])}
        /> <br /><br />

        <button type="submit">Submit</button>
      </form>

      <p>{message}</p>
    </div>
  );
}