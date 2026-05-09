import "../index.css";

function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <input className="input-field" placeholder="Email" />
      <input className="input-field" placeholder="Password" />
      <button className="btn-primary">Login</button>
    </div>
  );
}

export default LoginPage;