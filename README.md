# MyMusic – React Music Player

A simple music player web app built with **React** and **Vite**, made as a mini project for my Web Technology course.

## Features

- Browse a list of songs on the home page
- Filter songs by genre
- Artist page with a short bio, photo and their songs
- Persistent bottom player that keeps playing while you switch pages
- Play / pause, next / previous, seek bar, volume
- Skip forward / back 10 seconds
- Shuffle and repeat (off / one / all)
- "Now Playing" page for the current song
- Demo pages for Playlists, Create Playlist, Add Song and Settings (UI only, nothing is saved)

## Tech Stack

- **Frontend:** React 18, React Router, Vite
- **Backend (basic):** Node.js + Express (one sample API route)
- **Audio:** HTML5 `<audio>` element, demo tracks from SoundHelix

## How It Works

- `src/data.js` holds the song list (title, artist, genre, audio URL, bio, image).
- `src/SongContext.jsx` uses React Context to share the **current song** across the whole app.
- Clicking **Play** on a `SongCard` sets the current song, and the `SongPlayer` component (always mounted at the bottom) loads and plays it.
- React Router handles navigation between pages without reloading, so the music never stops.

> Note: The song titles are just labels. The actual audio files are free sample tracks from SoundHelix.

## Project Structure

```
music-player/
├── backend/
│   └── server.js          # Express server with GET /api/songs
├── src/
│   ├── components/        # Navbar, SongCard, SongPlayer
│   ├── pages/             # Home, Genres, Artist, NowPlaying, etc.
│   ├── data.js            # Song data
│   ├── SongContext.jsx    # Global "current song" state
│   ├── App.jsx            # Routes
│   └── main.jsx           # Entry point
├── index.html
└── package.json
```

## Getting Started

**Requirements:** Node.js (v18 or above)

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/music-player.git
cd music-player

# 2. Install and run the frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

**Optional – run the backend:**

```bash
cd backend
npm install
npm start
```

Runs on http://localhost:5000 (`/api/songs`). The frontend currently uses local data and doesn't depend on it.

## Future Improvements

- Connect the frontend to the backend API
- Save playlists and added songs (database or localStorage)
- Search bar
- Mobile-friendly layout
