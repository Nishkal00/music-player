import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SongPlayer from "./components/SongPlayer";

/* Pages */
import Home from "./pages/Home";
import Genres from "./pages/Genres";
import GenreDetail from "./pages/GenreDetail";
import NowPlaying from "./pages/NowPlaying";
import Artist from "./pages/Artist";
import CreatePlaylist from "./pages/CreatePlaylist";
import Playlists from "./pages/Playlists";
import About from "./pages/About";
import AddSong from "./pages/AddSong";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main style={{ padding: 20, paddingBottom: 100 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/genres/:genre" element={<GenreDetail />} />
          <Route path="/now-playing" element={<NowPlaying />} />
          <Route path="/artist/:artist" element={<Artist />} />
          <Route path="/create-playlist" element={<CreatePlaylist />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-song" element={<AddSong />} />
          <Route path="/settings" element={<Settings />} />
          {/* catch-all can be added if you want */}
        </Routes>
      </main>

      <SongPlayer />
    </div>
  );
}

