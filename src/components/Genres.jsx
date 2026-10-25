import React from "react";

const genres = ["All", "Pop", "Rock", "Classical", "Jazz", "EDM", "Hip-Hop", "Country", "Reggae"];

export default function Genre({ onSelectGenre, selected }) {
  return (
    <div>
      <h3 style={{ marginTop: 0, marginBottom: 12, color: "#94a3b8" }}>Genres</h3>
      <ul className="genre-list">
        {genres.map((g) => (
          <li
            key={g}
            onClick={() => onSelectGenre && onSelectGenre(g)}
            className={g === selected ? "selected" : ""}
          >
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
}
