import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import "../index.css";
import "./ProfileDetailsPage.css";

function ProfileDetailsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const token = data.session?.access_token;
      if (!token) return;

      fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        });
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="profile-details-page">
      <header className="profile-header">
        <div className="profile-avatar">
          {user?.email?.[0].toUpperCase() ?? "U"}
        </div>

        <div className="profile-header-info">
          <div className="profile-name-row">
            <h1 className="profile-name">{user?.email}</h1>
            <span className="profile-role-badge">Parent</span>
          </div>
          <p className="profile-email">{user?.email}</p>
        </div>
      </header>

      <section className="profile-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "profile"}
          className={`profile-tab ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "saved"}
          className={`profile-tab ${activeTab === "saved" ? "active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          Saved Locations
        </button>
      </section>

      {activeTab === "profile" && (
        <section className="profile-content">
          <h4>
            Your <span className="text-coral">profile</span>
          </h4>
          <input
            className="input-field"
            placeholder="Email"
            defaultValue={user?.email}
            readOnly
          />
        </section>
      )}

      {activeTab === "saved" && (
        <section className="profile-content">
          <h4>
            Your <span className="text-coral">saved locations</span>
          </h4>
          <p>Saved locations coming soon.</p>
        </section>
      )}
    </main>
  );
}

export default ProfileDetailsPage;
