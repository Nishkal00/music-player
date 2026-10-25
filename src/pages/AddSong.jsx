import React, { useState } from "react";

export default function AddSong() {
  const [form, setForm] = useState({ title: "", artist: "", src: "", genre: "" });
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // demo only: not persisting anywhere
    if (!form.title || !form.src) return setMessage("Title and source required.");
    setMessage(`Song "${form.title}" added (demo).`);
    setForm({ title: "", artist: "", src: "", genre: "" });
  }

  return (
    <div>
      <h1>Add Song</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 600 }}>
        <input placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} />
        <input placeholder="Artist" value={form.artist} onChange={(e)=>setForm({...form,artist:e.target.value})} />
        <input placeholder="Genre" value={form.genre} onChange={(e)=>setForm({...form,genre:e.target.value})} />
        <input placeholder="Audio URL (https://...)" value={form.src} onChange={(e)=>setForm({...form,src:e.target.value})} />
        <button type="submit">Add</button>
      </form>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
