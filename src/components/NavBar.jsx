import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="layout-root">
      <nav className="dev-nav">
        <Link to="/">Home</Link>
        <Link to="/home">Logged In</Link>
        <Link to="/login">Login</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/activities/1">Detail</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
}

export default NavBar;