import React from "react";
import { useNavigate } from "react-router-dom";
import { useSong } from "../SongContext";

export default function SongCard({ song }) {
  const navigate = useNavigate();
  const { setCurrentSong } = useSong();

  function handlePlay() {
    setCurrentSong(song);
    navigate("/now-playing");
  }

  function goToArtist() {
    navigate(`/artist/${encodeURIComponent(song.artist)}`);
  }

  return (
    <div className="song-card">
      <div style={{ width: 60, height: 60, borderRadius: 8, background: "linear-gradient(180deg,#111827,#0b1220)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        🎵
      </div>

      <div className="meta">
        <h4 style={{ margin: 0 }}>{song.title}</h4>
        <p style={{ margin: 0 }}>{song.artist} • {song.duration}</p>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button className="play-btn" onClick={handlePlay}>Play</button>
        <button onClick={goToArtist} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.04)", color: "#94a3b8", padding: "6px 8px", borderRadius: 8 }}>Artist</button>
      </div>
    </div>
  );
}

