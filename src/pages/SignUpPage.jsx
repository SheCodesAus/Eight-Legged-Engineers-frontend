function SignUpPage() {
  return (
    <div>
      <h1>Sign Up</h1>

      <section>
        <input placeholder="First Name" />
        <input placeholder="Email" />
        <input placeholder="Password" />
      </section>

      <section>
        <h3>Children</h3>
        <input placeholder="Age range" />
        <button>Add child</button>
      </section>

      <button>Submit</button>

      <footer>Footer</footer>
    </div>
  );
}

export default SignUpPage;