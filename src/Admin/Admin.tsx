import { useState } from "react";
import "./Admin.css";

const API = "https://angelina-portfolio-api.onrender.com";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [token, setToken] = useState("");
  const [bio, setBio] = useState("");
  const [bioSaved, setBioSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<{url: string, name: string}[]>([]);

  async function handleLogin() {
    setLoginError("");
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) { setLoginError("Wrong password. Try again."); return; }
      const data = await res.json();
      setToken(data.token);
      setIsLoggedIn(true);
      loadContent();
    } catch {
      setLoginError("Cannot connect to server.");
    }
  }

  async function loadContent() {
    const bioRes = await fetch(`${API}/bio`);
    const bioData = await bioRes.json();
    setBio(bioData.bio || "");
    const photosRes = await fetch(`${API}/photos`);
    const photosData = await photosRes.json();
    setPhotos(photosData.photos || []);
  }

  async function handleSaveBio() {
    await fetch(`${API}/admin/bio`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ bio }),
    });
    setBioSaved(true);
    setTimeout(() => setBioSaved(false), 2500);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);
      await fetch(`${API}/admin/upload-photo`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
    }
    await loadContent();
    setUploading(false);
  }

  async function handleDelete(url: string) {
    if (!window.confirm("Delete this photo?")) return;
    await fetch(`${API}/admin/photo?url=${encodeURIComponent(url)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setPhotos(photos.filter((p) => p.url !== url));
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setToken("");
    setPassword("");
  }

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <h1>Admin Panel</h1>
          <p>Sign in to manage Angelina's portfolio</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <button onClick={handleLogin}>Sign In</button>
          {loginError && <p className="admin-login__error">{loginError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <header className="admin__header">
        <h1>Admin Panel</h1>
        <button className="admin__logout" onClick={handleLogout}>Sign out</button>
      </header>
      <main className="admin__main">
        <section className="admin__card">
          <h2>Bio</h2>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write Angelina's bio here..."
            rows={5}
          />
          <div className="admin__row">
            <button onClick={handleSaveBio}>Save Bio</button>
            {bioSaved && <span className="admin__success">✓ Saved!</span>}
          </div>
        </section>
        <section className="admin__card">
          <h2>Photos</h2>
          <label className="admin__upload">
            <input type="file" accept="image/*" multiple onChange={handleUpload} />
            {uploading ? "Uploading..." : "Click to upload photos"}
          </label>
          <div className="admin__grid">
            {photos.map((photo) => (
              <div key={photo.url} className="admin__photo">
                <img src={photo.url} alt={photo.name} />
                <button className="admin__delete" onClick={() => handleDelete(photo.url)}>✕</button>
              </div>
            ))}
            {photos.length === 0 && (
              <p className="admin__empty">No photos yet. Upload some above!</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}