import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import "../index.css";
import "./ProfileDetailsPage.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

async function getToken() {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? "";
}

function calculateAge(birthMonth, birthYear) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  let age = currentYear - birthYear;
  if (currentMonth < birthMonth) age -= 1;
  return age;
}

function ProfileDetailsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [kids, setKids] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const token = data.session?.access_token;
      if (!token) return;

      fetch(`${API_BASE}/users/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setKids(data.kids ?? []);
          setLoading(false);
        });
    });
  }, []);

  async function handleAddKid(e) {
    e.preventDefault();
    setFormError("");

    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    const currentYear = new Date().getFullYear();

    if (!month || !year) {
      setFormError("Both month and year are required.");
      return;
    }
    if (monthNum < 1 || monthNum > 12) {
      setFormError("Month must be between 1 and 12.");
      return;
    }
    if (yearNum < 2010 || yearNum > currentYear) {
      setFormError(`Year must be between 2010 and ${currentYear}.`);
      return;
    }

    const token = await getToken();
    const res = await fetch(`${API_BASE}/kids/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ birth_month: monthNum, birth_year: yearNum }),
    });

    if (res.ok) {
      const newKid = await res.json();
      setKids((prev) => [...prev, newKid]);
      setMonth("");
      setYear("");
    } else {
      setFormError("Failed to add child. Please try again.");
    }
  }

  async function handleRemoveKid(id) {
    const token = await getToken();
    const res = await fetch(`${API_BASE}/kids/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setKids((prev) => prev.filter((k) => k.id !== id));
    }
  }

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

          <h4>
            Your <span className="text-coral">children</span>
          </h4>

          {kids.length === 0 ? (
            <p>No children added yet.</p>
          ) : (
            <ul className="kids-list">
              {kids.map((kid) => {
                const age = calculateAge(kid.birth_month, kid.birth_year);
                return (
                  <li key={kid.id} className="kids-list-item">
                    <span>Age {age}</span>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => handleRemoveKid(kid.id)}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <form className="add-kid-form" onSubmit={handleAddKid}>
            <h5>Add a child</h5>
            {formError && <p className="form-error">{formError}</p>}
            <input
              className="input-field"
              type="number"
              placeholder="Birth month (1–12)"
              value={month}
              min={1}
              max={12}
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              className="input-field"
              type="number"
              placeholder={`Birth year (2010–${new Date().getFullYear()})`}
              value={year}
              min={2010}
              max={new Date().getFullYear()}
              onChange={(e) => setYear(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              Add Child
            </button>
          </form>
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