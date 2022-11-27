import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../Hooks/useRefresh";
import useAuth from "../Hooks/useAuth";
import { CircularProgress } from "@mui/material";

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
