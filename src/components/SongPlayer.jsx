// src/components/SongPlayer.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../SongContext";
import songsData from "../data";
import "./SongPlayer.css"; // optional if you want separate CSS, but styles below are inline

export default function SongPlayer() {
  const { currentSong, setCurrentSong } = useSong();
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState(null);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // off, one, all

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (currentSong) {
      setError(null);
      audioRef.current.src = currentSong.src;
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch((e) => {
          setPlaying(false);
          setError("Playback prevented (user gesture required) or network error.");
          console.error(e);
        });
    } else {
      audioRef.current.pause();
      setPlaying(false);
      setProgress(0);
      setDuration(0);
    }
  }, [currentSong]);

  function onTimeUpdate() {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime / (audioRef.current.duration || 1));
    setDuration(audioRef.current.duration || 0);
  }

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  function seekToFraction(fraction) {
    if (!audioRef.current || !audioRef.current.duration) return;
    audioRef.current.currentTime = fraction * audioRef.current.duration;
    setProgress(fraction);
  }

  function prevSong() {
    if (!currentSong) return;
    const idx = songsData.findIndex((s) => s.id === currentSong.id);
    if (idx <= 0) {
      if (repeatMode === "all") {
        setCurrentSong(songsData[songsData.length - 1]);
      } else {
        audioRef.current.currentTime = 0;
      }
      return;
    }
    setCurrentSong(songsData[idx - 1]);
  }

  function nextSong() {
    if (!currentSong) return;
    // shuffle behavior
    if (shuffle) {
      const r = Math.floor(Math.random() * songsData.length);
      setCurrentSong(songsData[r]);
      return;
    }
    const idx = songsData.findIndex((s) => s.id === currentSong.id);
    if (idx >= songsData.length - 1) {
      if (repeatMode === "all") {
        setCurrentSong(songsData[0]);
      } else {
        // end reached
        audioRef.current.pause();
        setPlaying(false);
      }
      return;
    }
    setCurrentSong(songsData[idx + 1]);
  }

  function forwardSec(n) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + n);
  }

  function backwardSec(n) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - n);
  }

  function onEnded() {
    if (repeatMode === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }
    nextSong();
  }

  function formatTime(sec) {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration || 0);
        }}
        onEnded={onEnded}
        onError={(e) => {
          console.error("audio error", e);
          setError("Audio failed to load or play.");
        }}
      />

      <div className="footer-player" style={{
        position: "fixed", left: 0, right: 0, bottom: 0,
        background: "linear-gradient(90deg, rgba(10,10,10,0.8), rgba(5,5,10,0.8))",
        padding: 12, borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex", gap: 12, alignItems: "center", zIndex: 60
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 260 }}>
          <div style={{ width: 56, height: 56, borderRadius: 8, background: "linear-gradient(180deg,#111827,#0b1220)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
            🎵
          </div>

          <div style={{ minWidth: 180 }}>
            {currentSong ? (
              <>
                <div style={{ fontWeight: 700 }}>{currentSong.title}</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>{currentSong.artist}</div>
              </>
            ) : <div style={{ color: "#94a3b8" }}>No song selected</div>}
          </div>
        </div>

        {/* controls */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <button onClick={() => setShuffle(!shuffle)} title="Shuffle" style={{ padding: 8, borderRadius: 8, border: "none", cursor: "pointer", background: shuffle ? "rgba(124,58,237,0.2)" : "transparent" }}>🔀</button>
            <button onClick={() => backwardSec(10)} title="Back 10s" style={{ padding: 8, borderRadius: 8 }}>⏪ 10s</button>
            <button onClick={prevSong} title="Previous" style={{ padding: 10, borderRadius: 10 }}>⏮️</button>
            <button onClick={togglePlay} title="Play/Pause" style={{ padding: "8px 14px", borderRadius: 12, background: "linear-gradient(180deg,#7c3aed,#5b21b6)", color: "white", border: "none" }}>
              {playing ? "⏸ Pause" : "▶ Play"}
            </button>
            <button onClick={nextSong} title="Next" style={{ padding: 10, borderRadius: 10 }}>⏭️</button>
            <button onClick={() => forwardSec(10)} title="Forward 10s" style={{ padding: 8, borderRadius: 8 }}>10s ⏩</button>
            <button onClick={() => setRepeatMode(repeatMode === "off" ? "one" : repeatMode === "one" ? "all" : "off")} title="Repeat" style={{ padding: 8, borderRadius: 8, background: repeatMode !== "off" ? "rgba(124,58,237,0.12)" : "transparent" }}>
              {repeatMode === "off" ? "🔁" : repeatMode === "one" ? "🔂 (1)" : "🔁 (all)"}
            </button>
          </div>

          {/* progress bar */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ fontSize: 12, color: "#94a3b8", width: 48, textAlign: "right" }}>{formatTime((audioRef.current?.currentTime) || 0)}</div>

            <div style={{ flex: 1 }}>
              <input
                type="range"
                min={0}
                max={1}
                step={0.001}
                value={progress}
                onChange={(e) => seekToFraction(parseFloat(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ fontSize: 12, color: "#94a3b8", width: 48 }}>{formatTime(duration)}</div>
          </div>
        </div>

        {/* volume */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ color: "#94a3b8" }}>🔊</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{ width: 120 }}
          />
        </div>
      </div>

      {error && (
        <div style={{
          position: "fixed", bottom: 88, left: 20, background: "#2a2a2a", color: "#fff", padding: 8, borderRadius: 8
        }}>
          {error}
        </div>
      )}
    </>
  );
}
