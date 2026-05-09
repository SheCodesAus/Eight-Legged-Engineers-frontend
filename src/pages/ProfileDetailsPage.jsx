import "../index.css";

function ProfileDetailsPage() {
  return (
    <div>
      <h2>Profile</h2>

      <section>
        <h4>Your details</h4>
        <input className="input-field" placeholder="First Name" />
        <input className="input-field" placeholder="Email" />
        <input className="input-field" placeholder="Password" />
      </section>

      <section>
        <h4>Children</h4>
        <input className="input-field" placeholder="Age range" />
        <input className="input-field" placeholder="Age range" />
        <button className="btn-primary">Add another child</button>
      </section>

    </div>
  );
}

export default ProfileDetailsPage;