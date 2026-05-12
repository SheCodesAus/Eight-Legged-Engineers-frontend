import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="layout-root">
      <nav className="dev-nav">
        <Link to="/">Home</Link>
        <Link to="/home">Logged In</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/activities/1">Detail</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/admin">Admin</Link>
        {session ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
}

export default NavBar;