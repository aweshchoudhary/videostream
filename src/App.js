import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard";
import Search from "./Pages/Search";
import Video from "./Pages/Video";
import Upload from "./Pages/Upload";
import User from "./Pages/User";
import Login from "./Pages/Login";
import PersistLogin from "./Components/PersistLogin";
import RequireAuth from "./Components/RequireAuth";
import { ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import Register from "./Pages/Register";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  },
  shape: {
    borderRadius: 9999
  }
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<PersistLogin />}>
              {"Public Routes"}
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />

              {"Protected Routes"}
              <Route element={<RequireAuth />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="search" element={<Search />} />
                <Route path="upload" element={<Upload />} />
                <Route path="video" element={<Video />} />
                <Route path="user" element={<User />} />
                {/* <Route path="login" element={<Search />} /> */}
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
