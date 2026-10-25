import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const songs = [
  { id: 1, title: "Shape of You", artist: "Ed Sheeran", genre: "Pop", src: "https://example.com/audio/shape-of-you.mp3", duration: "3:53" },
  { id: 2, title: "Believer", artist: "Imagine Dragons", genre: "Rock", src: "https://example.com/audio/believer.mp3", duration: "3:24" }
];

app.get("/api/songs", (req, res) => res.json(songs));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
