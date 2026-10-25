import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        padding: "8px 10px",
        borderRadius: 8,
        textDecoration: "none",
        color: isActive ? "white" : "#94a3b8",
        background: isActive ? "rgba(124,58,237,0.16)" : "transparent"
      })}
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  return (
    <header className="navbar" style={{ display: "flex", gap: 12, padding: "12px 20px", alignItems: "center" }}>
      <div className="logo">MyMusic</div>
      <nav style={{ display: "flex", gap: 8, marginLeft: 16 }}>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/genres">Genres</NavItem>
        <NavItem to="/playlists">Playlists</NavItem>
        <NavItem to="/create-playlist">Create</NavItem>
        <NavItem to="/add-song">Add Song</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/settings">Settings</NavItem>
        <NavItem to="/now-playing">Now Playing</NavItem>
      </nav>
    </header>
  );
}
