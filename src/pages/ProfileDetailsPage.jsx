import "../index.css";

function ProfileDetailsPage() {
  return (
    <div>
      <h2>Profile</h2>

      <section>
        <h4>Your details</h4>
        <input placeholder="First Name" />
        <input placeholder="Email" />
        <input placeholder="Password" />
      </section>

      <section>
        <h4>Children</h4>
        <input placeholder="Age range" />
        <input placeholder="Age range" />
        <button className="btn-primary">Add another child</button>
      </section>

      <footer>Footer</footer>
    </div>
  );
}

export default ProfileDetailsPage;