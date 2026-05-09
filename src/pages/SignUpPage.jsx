import "../index.css";

function SignUpPage() {
  return (
    <div>
      <h1>Sign Up</h1>

      <section>
        <h3> Add your details</h3>
        <input className="input-field" placeholder="First Name" />
        <input className="input-field" placeholder="Email" />
        <input className="input-field" placeholder="Password" />
      </section>

      <section>
        <h3>Add children</h3>
        <input className="input-field" placeholder="Age range" />
        <button className="btn-secondary">Add child</button>
      </section>

      <button className="btn-primary">Submit</button>

    </div>
  );
}

export default SignUpPage;