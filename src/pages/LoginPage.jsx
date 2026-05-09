import "../index.css";

function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <input placeholder="Email" />
      <input placeholder="Password" />
      <button className="btn-primary">Login</button>
    </div>
  );
}

export default LoginPage;