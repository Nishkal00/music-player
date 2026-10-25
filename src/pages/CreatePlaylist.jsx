import React, { useState } from "react";

export default function CreatePlaylist() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleCreate(e) {
    e.preventDefault();
    if (!name.trim()) return setMessage("Please enter a playlist name.");
    setMessage(`Playlist "${name}" created (demo)`);
    setName("");
  }

  return (
    <div>
      <h1>Create Playlist</h1>
      <form onSubmit={handleCreate} style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Playlist name" />
        <button type="submit">Create</button>
      </form>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
