import { useEffect, useState } from "react";
  import { Link, Outlet, useNavigate } from "react-router-dom";
  import { supabase } from "../lib/supabaseClient";
  import "./NavBar.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

  function NavBar() {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      supabase.auth.getSession().then(({ data }) => {
        setSession(data.session);
        if (data.session?.access_token) {
          fetch(`${API_BASE}/users/me/`, {
            headers: { Authorization: `Bearer ${data.session.access_token}` },
          })
            .then((res) => res.json())
            .then((user) => setIsAdmin(user.is_staff || user.is_superuser));
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session?.access_token) {
          fetch(`${API_BASE}/users/me/`, {
            headers: { Authorization: `Bearer ${session.access_token}` },
          })
            .then((res) => res.json())
            .then((user) => setIsAdmin(user.is_staff || user.is_superuser));
        } else {
          setIsAdmin(false);
        }
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
          {session ? (
            <>
              <Link to="/home">Home</Link>
              <Link to="/activities">Activities</Link>
              <Link to="/profile">Profile</Link>
              {isAdmin && <Link to="/admin">Admin</Link>}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/activities">Activities</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </nav>

        <div className="layout-content">
          <Outlet />
        </div>
      </div>
    );
  }
export default NavBar;