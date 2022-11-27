import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Bottombar from "../Components/Bottombar";
import useAuth from "../Hooks/useAuth";

const Layout = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth.accessToken ? (
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
            padding: "0"
          }}
        >
          <Navbar />
          <Box
            sx={{
              height: "calc(100vh - 120px)",
              padding: "10px",
              width: "100vw",
              overflowY: "auto",
              overflowX: "hidden"
            }}
          >
            <Outlet />
          </Box>
          <Bottombar />
        </Box>
      ) : (
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            overflowX: "hidden",
            padding: { sm: "20px 0" },
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Outlet />
        </Box>
      )}
    </>
  );
};

export default Layout;
