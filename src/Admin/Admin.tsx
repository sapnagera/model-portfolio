import { useState } from "react";
import "./Admin.css";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [bio, setBio] = useState("");
  const [bioSaved, setBioSaved] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  function handleLogout() {
    setIsLoggedIn(false);
    setPassword("");
  }

  function handleSaveBio() {
    setBioSaved(true);
    setTimeout(() => setBioSaved(false), 2500);
  }

  function handleUpload() {
    // will connect to backend later
  }

  function handleLogin() {
    if (password === "test123") {
      setIsLoggedIn(true);
    } else {
      setLoginError("Wrong password. Try again.");
    }
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
        <button className="admin__logout" onClick={handleLogout}>
          Sign out
        </button>
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
            {photos.length === 0 && (
              <p className="admin__empty">No photos yet. Upload some above!</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}