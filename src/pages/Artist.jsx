// src/pages/Artist.jsx
import React from "react";
import { useParams } from "react-router-dom";
import songsData from "../data";
import SongCard from "../components/SongCard";

export default function Artist() {
  const { artist } = useParams();
  const decoded = decodeURIComponent(artist || "");

  // find first song by that artist to get bio/image
  const artistSong = songsData.find((s) => s.artist === decoded) || null;
  const filtered = songsData.filter((s) => s.artist === decoded);

  return (
    <div>
      <h1>Artist: {decoded}</h1>

      {artistSong ? (
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 20 }}>
          <img
            src={artistSong.image}
            alt={artistSong.artist}
            style={{ width: 160, height: 160, objectFit: "cover", borderRadius: 12 }}
          />
          <div>
            <h2 style={{ margin: 0 }}>{artistSong.artist}</h2>
            <p style={{ color: "#94a3b8", maxWidth: 680 }}>{artistSong.bio}</p>
            <p style={{ marginTop: 12, color: "#94a3b8" }}>
              {filtered.length} song{filtered.length !== 1 ? "s" : ""} available.
            </p>
          </div>
        </div>
      ) : (
        <p>No artist info available.</p>
      )}

      <h3>Songs</h3>
      {filtered.length === 0 ? <p>No songs found for this artist.</p> : (
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
          {filtered.map((s) => <SongCard key={s.id} song={s} />)}
        </div>
      )}
    </div>
  );
}

