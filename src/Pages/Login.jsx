import { TextField, Card, CardActions, CardContent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setAuth, auth } = useAuth();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Validation
  useEffect(() => {
    if (auth.accessToken) return navigate("/", { replace: true });
  }, []);

  useEffect(() => {
    setErrorMessage("");
    setError(false);
  }, [user, password]);

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newUser = {
      user,
      password
    };
    await axios
      .post("/auth/login", newUser, { withCredentials: true })
      .then(async (e) => {
        await setAuth({ user: e.data.user, accessToken: e?.data?.accessToken });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err?.response?.data?.message);
        console.log(err);
      });
    setLoading(false);
    return;
  };

  return (
    <>
      {success ? (
        <>
          <h1>Login Successfully</h1>
        </>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <Card
            className="card"
            sx={{ borderRadius: { sm: "20px", xs: "0" }, padding: "20px" }}
          >
            <CardContent>
              <h1>Login</h1>
              <br />
              <div className="form">
                <div className="message">{error ? errorMessage : null}</div>
                <div className="form-g">
                  <TextField
                    sx={{ width: "100%", marginBottom: "10px" }}
                    disabled={success || loading}
                    className="input"
                    id="outlined-basic"
                    label="Enter Email Or Username"
                    variant="outlined"
                    error={error}
                    value={user}
                    onChange={(e) => {
                      setUser(e.target.value);
                    }}
                  />
                </div>
                <div className="form-g">
                  <TextField
                    sx={{ width: "100%" }}
                    disabled={success || loading}
                    id="outlined-password-input"
                    className="input"
                    label="Enter Password"
                    type="password"
                    autoComplete="current-password"
                    error={error}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <br />
                <br />
                <p>
                  Don't have an account?{" "}
                  <Link to="/register" style={{ textDecoration: "underline" }}>
                    Register
                  </Link>
                </p>
              </div>
            </CardContent>
            <CardActions>
              <LoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                size="large"
                className="btn"
                disabled={!user || !password}
              >
                Login
              </LoadingButton>
            </CardActions>
          </Card>
        </form>
      )}
    </>
  );
};

export default Login;
