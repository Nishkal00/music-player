import React from "react";
import { Link } from "react-router-dom";

const genres = ["Pop","Rock","Classical","Jazz","EDM","Hip-Hop","Country","Reggae"];

export default function Genres() {
  return (
    <div>
      <h1>Genres</h1>
      <p>Browse by genre.</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {genres.map((g) => (
          <Link key={g} to={`/genres/${encodeURIComponent(g)}`} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, textDecoration: "none", color: "inherit" }}>
            {g}
          </Link>
        ))}
      </div>
    </div>
  );
}
