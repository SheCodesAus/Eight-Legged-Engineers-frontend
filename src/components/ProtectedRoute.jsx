
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function ProtectedRoute() {
    const [session, setSession] = useState(undefined);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
        });
    }, []);

    if (session === undefined) return null;
    if (!session) return <Navigate to="/login" replace />;
    return <Outlet />;
}

export default ProtectedRoute;

