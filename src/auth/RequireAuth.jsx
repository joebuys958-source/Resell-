import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";

export default function RequireAuth() {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      setChecking(false);
    });

    return () => unsub();
  }, []);

  if (checking) return <div className="loading">Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
}
