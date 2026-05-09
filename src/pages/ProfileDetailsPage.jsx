import { useState } from "react";
import "../index.css";
import "./ProfileDetailsPage.css";
import BottomNav from "../components/BottomNav";

function ProfileDetailsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <main className="profile-details-page">
      <header className="profile-header">
        <div className="profile-avatar">U</div>

        <div className="profile-header-info">
          <div className="profile-name-row">
            <h1 className="profile-name">User Name</h1>
            <span className="profile-role-badge">Parent</span>
          </div>
          <p className="profile-email">useremail@email.com.au</p>
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
        <>
          <section className="profile-content">
            <h4>
              Your <span className="text-coral">profile</span>
            </h4>
            <input className="input-field" placeholder="First Name" />
            <input className="input-field" placeholder="Email" />
            <input className="input-field" placeholder="Password" />
          </section>

          <section className="profile-content">
            <h4>
              Your <span className="text-olive">children</span>
            </h4>
            <input className="input-field" placeholder="Age range" />
            <input className="input-field" placeholder="Age range" />
            <button className="btn-primary">Add another child</button>
          </section>
        </>
      )}

      {activeTab === "saved" && (
        <section className="profile-content">
          <h4>
            Your <span className="text-coral">saved locations</span>
          </h4>

          <div className="list-card">
            <div className="activity-thumb"></div>
            <div className="card-text">
              <p className="card-name">Swimming Pool</p>
              <p className="card-sub">Family friendly activity</p>
              <p className="card-meta">Saved location</p>
            </div>
          </div>

          <div className="list-card">
            <div className="activity-thumb"></div>
            <div className="card-text">
              <p className="card-name">Pizza Place</p>
              <p className="card-sub">Kid-friendly eatery</p>
              <p className="card-meta">Saved location</p>
            </div>
          </div>
        </section>
      )}
      <BottomNav />
    </main>
  );
}

export default ProfileDetailsPage;