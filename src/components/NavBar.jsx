import { Link, Outlet } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/home">Logged In Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/signup">Sign Up</Link> |{" "}
        <Link to="/search">Search</Link> |{" "}
        <Link to="/activities">Activities</Link> |{" "}
        <Link to="/activities/1">Activity Detail</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/settings">Settings</Link> |{" "}
        <Link to="/saved-locations">Saved Locations</Link> |{" "}
        <Link to="/admin">Admin</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default NavBar;