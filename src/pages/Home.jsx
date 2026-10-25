import React from "react";
import songsData from "../data";
import SongCard from "../components/SongCard";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the music player — here's a quick list of songs.</p>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
        {songsData.map((s) => <SongCard key={s.id} song={s} />)}
      </div>
    </div>
  );
}
