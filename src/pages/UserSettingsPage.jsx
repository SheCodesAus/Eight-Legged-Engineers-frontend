import "../index.css";

function UserSettingsPage() {
  return (
    <div>
      <h2>User Settings</h2>

      <section>
        <button className="btn-primary">Profile</button>
        <button className="btn-secondary">Saved</button>
        <button className="btn-tertiary">Logout</button>
      </section>

    </div>
  );
}

export default UserSettingsPage;