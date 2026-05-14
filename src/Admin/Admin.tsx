import { useState, useEffect } from "react";
import "./Admin.css";

const API = "https://angelina-portfolio-api.onrender.com";

type Section = "bio" | "stats" | "social" | "contact" | "video" | "about-photo" | "portfolio";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [token, setToken] = useState("");
  const [activeSection, setActiveSection] = useState<Section>("bio");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Bio
  const [bio, setBio] = useState("");
  const [bioSaved, setBioSaved] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    age: "",
    height: "",
    bust: "",
    waist: "",
    hips: "",
    shoe: "",
    eyes: "",
    hair: ""
  });
  const [statsSaved, setStatsSaved] = useState(false);

  // Social
  const [social, setSocial] = useState({
    instagram: "",
    facebook: "",
    twitter: ""
  });
  const [socialSaved, setSocialSaved] = useState(false);

  // Contact
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    location: ""
  });
  const [contactSaved, setContactSaved] = useState(false);

  // Portfolio
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
      if (!res.ok) { 
        setLoginError("Wrong password. Try again."); 
        return; 
      }
      const data = await res.json();
      setToken(data.token);
      setIsLoggedIn(true);
      loadContent();
    } catch {
      setLoginError("Cannot connect to server.");
    }
  }
useEffect(() => {
  if (isLoggedIn) {
    loadContent();
  }
}, [isLoggedIn]);
  async function loadContent() {
    try {
      const [bioRes, statsRes, socialRes, contactRes, photosRes] = await Promise.all([
        fetch(`${API}/bio`),
        fetch(`${API}/stats`),
        fetch(`${API}/social`),
        fetch(`${API}/contact`),
        fetch(`${API}/photos`)
      ]);

      const bioData = await bioRes.json();
      const statsData = await statsRes.json();
      const socialData = await socialRes.json();
      const contactData = await contactRes.json();
      const photosData = await photosRes.json();

      setBio(bioData.bio || "");
      setStats(statsData.stats || stats);
      setSocial(socialData.social || social);
      setContact(contactData.contact || contact);
      setPhotos(photosData.photos || []);
    } catch (err) {
      console.error("Failed to load content:", err);
    }
  }

  async function handleSaveBio() {
    try {
      await fetch(`${API}/admin/bio`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ bio }),
      });
      setBioSaved(true);
      setTimeout(() => setBioSaved(false), 2500);
    } catch (err) {
      console.error("Failed to save bio:", err);
    }
  }

  async function handleSaveStats() {
    try {
      await fetch(`${API}/admin/stats`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(stats),
      });
      setStatsSaved(true);
      setTimeout(() => setStatsSaved(false), 2500);
    } catch (err) {
      console.error("Failed to save stats:", err);
    }
  }

  async function handleSaveSocial() {
    try {
      await fetch(`${API}/admin/social`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(social),
      });
      setSocialSaved(true);
      setTimeout(() => setSocialSaved(false), 2500);
    } catch (err) {
      console.error("Failed to save social:", err);
    }
  }

  async function handleSaveContact() {
    try {
      await fetch(`${API}/admin/contact`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(contact),
      });
      setContactSaved(true);
      setTimeout(() => setContactSaved(false), 2500);
    } catch (err) {
      console.error("Failed to save contact:", err);
    }
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
        <button 
          className="admin__hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <h1>Admin Panel</h1>
        <button className="admin__logout" onClick={handleLogout}>Sign out</button>
      </header>

      <div className="admin__container">
        <aside className={`admin__sidebar ${sidebarOpen ? 'admin__sidebar--open' : ''}`}>
          <nav className="admin__nav">
            <button 
              className={activeSection === "bio" ? "admin__nav-item--active" : "admin__nav-item"}
              onClick={() => { setActiveSection("bio"); setSidebarOpen(false); }}
            >
              Bio
            </button>
            <button 
              className={activeSection === "stats" ? "admin__nav-item--active" : "admin__nav-item"}
              onClick={() => { setActiveSection("stats"); setSidebarOpen(false); }}
            >
              Stats
            </button>
            <button 
              className={activeSection === "social" ? "admin__nav-item--active" : "admin__nav-item"}
              onClick={() => { setActiveSection("social"); setSidebarOpen(false); }}
            >
              Social Media
            </button>
            <button 
              className={activeSection === "contact" ? "admin__nav-item--active" : "admin__nav-item"}
              onClick={() => { setActiveSection("contact"); setSidebarOpen(false); }}
            >
              Contact
            </button>
            <button 
              className={activeSection === "video" ? "admin__nav-item--active" : "admin__nav-item"}
              onClick={() => { setActiveSection("video"); setSidebarOpen(false); }}
            >
              Home Video
            </button>
            <button 
              className={activeSection === "about-photo" ? "admin__nav-item--active" : "admin__nav-item"}
              onClick={() => { setActiveSection("about-photo"); setSidebarOpen(false); }}
            >
              About Photo
            </button>
            <button 
              className={activeSection === "portfolio" ? "admin__nav-item--active" : "admin__nav-item"}
              onClick={() => { setActiveSection("portfolio"); setSidebarOpen(false); }}
            >
              Portfolio
            </button>
          </nav>
        </aside>

        <main className="admin__content">
          {activeSection === "bio" && (
            <div className="admin__section">
              <h2>Bio</h2>
              <p className="admin__description">Update the bio text shown on the About page</p>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write Angelina's bio here..."
                rows={8}
              />
              <div className="admin__row">
                <button onClick={handleSaveBio}>Save Bio</button>
                {bioSaved && <span className="admin__success">✓ Saved!</span>}
              </div>
            </div>
          )}

          {activeSection === "stats" && (
            <div className="admin__section">
              <h2>Stats</h2>
              <p className="admin__description">Update measurements and physical attributes shown on the About page</p>
              <div className="admin__grid-2">
                <div className="admin__field">
                  <label>Age</label>
                  <input
                    type="text"
                    value={stats.age}
                    onChange={(e) => setStats({...stats, age: e.target.value})}
                    placeholder="24"
                  />
                </div>
                <div className="admin__field">
                  <label>Height</label>
                  <input
                    type="text"
                    value={stats.height}
                    onChange={(e) => setStats({...stats, height: e.target.value})}
                    placeholder="175 cm / 5'9&quot;"
                  />
                </div>
                <div className="admin__field">
                  <label>Bust</label>
                  <input
                    type="text"
                    value={stats.bust}
                    onChange={(e) => setStats({...stats, bust: e.target.value})}
                    placeholder="86 cm"
                  />
                </div>
                <div className="admin__field">
                  <label>Waist</label>
                  <input
                    type="text"
                    value={stats.waist}
                    onChange={(e) => setStats({...stats, waist: e.target.value})}
                    placeholder="61 cm"
                  />
                </div>
                <div className="admin__field">
                  <label>Hips</label>
                  <input
                    type="text"
                    value={stats.hips}
                    onChange={(e) => setStats({...stats, hips: e.target.value})}
                    placeholder="89 cm"
                  />
                </div>
                <div className="admin__field">
                  <label>Shoe Size</label>
                  <input
                    type="text"
                    value={stats.shoe}
                    onChange={(e) => setStats({...stats, shoe: e.target.value})}
                    placeholder="EU 39"
                  />
                </div>
                <div className="admin__field">
                  <label>Eye Color</label>
                  <input
                    type="text"
                    value={stats.eyes}
                    onChange={(e) => setStats({...stats, eyes: e.target.value})}
                    placeholder="Brown"
                  />
                </div>
                <div className="admin__field">
                  <label>Hair Color</label>
                  <input
                    type="text"
                    value={stats.hair}
                    onChange={(e) => setStats({...stats, hair: e.target.value})}
                    placeholder="Dark Brown"
                  />
                </div>
              </div>
              <div className="admin__row">
                <button onClick={handleSaveStats}>Save Stats</button>
                {statsSaved && <span className="admin__success">✓ Saved!</span>}
              </div>
            </div>
          )}

          {activeSection === "social" && (
            <div className="admin__section">
              <h2>Social Media</h2>
              <p className="admin__description">Add or update social media links shown in the footer</p>
              <div className="admin__field">
                <label>Instagram URL</label>
                <input
                  type="url"
                  value={social.instagram}
                  onChange={(e) => setSocial({...social, instagram: e.target.value})}
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
              <div className="admin__field">
                <label>Facebook URL</label>
                <input
                  type="url"
                  value={social.facebook}
                  onChange={(e) => setSocial({...social, facebook: e.target.value})}
                  placeholder="https://facebook.com/yourhandle"
                />
              </div>
              <div className="admin__field">
                <label>Twitter URL</label>
                <input
                  type="url"
                  value={social.twitter}
                  onChange={(e) => setSocial({...social, twitter: e.target.value})}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              <div className="admin__row">
                <button onClick={handleSaveSocial}>Save Social Media</button>
                {socialSaved && <span className="admin__success">✓ Saved!</span>}
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div className="admin__section">
              <h2>Contact</h2>
              <p className="admin__description">Update contact information shown in the footer</p>
              <div className="admin__field">
                <label>Email</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({...contact, email: e.target.value})}
                  placeholder="angelina@example.com"
                />
              </div>
              <div className="admin__field">
                <label>Phone</label>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({...contact, phone: e.target.value})}
                  placeholder="+358 12 345 6789"
                />
              </div>
              <div className="admin__field">
                <label>Location</label>
                <input
                  type="text"
                  value={contact.location}
                  onChange={(e) => setContact({...contact, location: e.target.value})}
                  placeholder="Helsinki, Finland"
                />
              </div>
              <div className="admin__row">
                <button onClick={handleSaveContact}>Save Contact</button>
                {contactSaved && <span className="admin__success">✓ Saved!</span>}
              </div>
            </div>
          )}

          {activeSection === "video" && (
            <div className="admin__section">
              <h2>Home Video</h2>
              <p className="admin__description">Upload a new hero video for the homepage (coming soon)</p>
              <p className="admin__placeholder">Video upload feature will be added soon</p>
            </div>
          )}

          {activeSection === "about-photo" && (
            <div className="admin__section">
              <h2>About Photo</h2>
              <p className="admin__description">Upload a new profile photo for the About page (coming soon)</p>
              <p className="admin__placeholder">Photo upload feature will be added soon</p>
            </div>
          )}

          {activeSection === "portfolio" && (
            <div className="admin__section">
              <h2>Portfolio</h2>
              <p className="admin__description">Manage portfolio photos shown on the Portfolio page</p>
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
            </div>
          )}
        </main>
      </div>
    </div>
  );
}