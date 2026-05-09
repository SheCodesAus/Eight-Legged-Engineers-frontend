import "../index.css";

function SignUpPage() {
  return (
    <div>
      <h1>Sign Up</h1>

      <section>
        <h3> Add your details</h3>
        <input placeholder="First Name" />
        <input placeholder="Email" />
        <input placeholder="Password" />
      </section>

      <section>
        <h3>Add children</h3>
        <input placeholder="Age range" />
        <button className="btn-secondary">Add child</button>
      </section>

      <button className="btn-primary">Submit</button>

      <footer>Footer</footer>
    </div>
  );
}

export default SignUpPage;