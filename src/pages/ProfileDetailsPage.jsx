function ProfileDetailsPage() {
  return (
    <div>
      <h1>Profile Details</h1>

      <section>
        <input placeholder="First Name" />
        <input placeholder="Email" />
        <input placeholder="Password" />
      </section>

      <section>
        <h3>Children</h3>
        <input placeholder="Age range" />
        <input placeholder="Age range" />
        <button>Add another child</button>
      </section>

      <footer>Footer</footer>
    </div>
  );
}

export default ProfileDetailsPage;