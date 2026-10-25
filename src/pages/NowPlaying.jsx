import React from "react";
import { useSong } from "../SongContext";

export default function NowPlaying() {
  const { currentSong } = useSong();

  return (
    <div>
      <h1>Now Playing</h1>
      {currentSong ? (
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ width: 120, height: 120, borderRadius: 8, background: "linear-gradient(180deg,#111827,#0b1220)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>🎵</div>
          <div>
            <h2 style={{ margin: 0 }}>{currentSong.title}</h2>
            <p style={{ margin: "4px 0" }}>{currentSong.artist}</p>
            <p style={{ color: "#94a3b8" }}>{currentSong.duration}</p>
            <p style={{ marginTop: 12 }}>{currentSong.description || "No description available."}</p>
          </div>
        </div>
      ) : (
        <p>No song is currently playing. Click Play on any song.</p>
      )}
    </div>
  );
}
