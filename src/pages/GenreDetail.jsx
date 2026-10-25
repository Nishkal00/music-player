import React from "react";
import { useParams } from "react-router-dom";
import songsData from "../data";
import SongCard from "../components/SongCard";

export default function GenreDetail() {
  const { genre } = useParams();
  const decoded = decodeURIComponent(genre || "");
  const filtered = songsData.filter((s) => s.genre === decoded);

  return (
    <div>
      <h1>{decoded} Songs</h1>
      {filtered.length === 0 ? <p>No songs found for this genre.</p> : (
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
          {filtered.map((s) => <SongCard key={s.id} song={s} />)}
        </div>
      )}
    </div>
  );
}
