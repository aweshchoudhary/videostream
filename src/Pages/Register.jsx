import { TextField, Card, CardActions, CardContent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [usernameloading, setUsernameLoading] = useState(false);

  const { auth } = useAuth();
  const navigate = useNavigate();

  // Validation
  useEffect(() => {
    if (auth.accessToken) return navigate("/", { replace: true });
  }, []);

  const [fullname, setFullname] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [checkUsername, setCheckUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [cpassword, setCpassword] = useState("");
  const [validCpassword, setValidCpassword] = useState(false);
  const [cpasswordFocus, setCpasswordFocus] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const usernameRegex = /^[a-z0-9_-]{5,15}$/;
  const fullnameRegex = /^([\w]{1,})+\s+([\w\s]{1,})+$/i;
  const emaiRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    setValidName(fullnameRegex.test(fullname));
  }, [fullname]);

  useEffect(() => {
    setValidUsername(usernameRegex.test(username));
    // functions
    const usernameExists = async () => {
      setUsernameLoading(true);
      await axios
        .post("/auth/checkusername", {
          username
        })
        .then((e) => {
          setCheckUsername(true);
          console.log(e);
        })
        .catch((err) => {
          setCheckUsername(false);
          setValidUsername(false);
          console.log(err);
        });
      setUsernameLoading(false);
    };
    usernameExists();
  }, [username]);

  useEffect(() => {
    setValidEmail(emaiRegex.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(passwordRegex.test(password));
  }, [password]);

  useEffect(() => {
    setValidCpassword(password === cpassword);
  }, [cpassword, password]);

  useEffect(() => {
    setErrorMessage("");
  }, [fullname, username, password, email]);

  useEffect(() => {
    if (success) return navigate("/login", { replace: true });
  }, [success]);

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newUser = {
      name: fullname,
      username,
      email,
      password
    };

    await axios
      .post("/auth/register", newUser)
      .then((e) => {
        setSuccess(true);
        navigate("/login", { replace: true });
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
          <h1>Registered Successfully</h1>
        </>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <Card
            className="card"
            sx={{ borderRadius: { sm: "20px", xs: "0" }, padding: "20px" }}
          >
            <CardContent>
              <h1>Create Account</h1>
              <br />
              <div className="form">
                <div className="message">
                  {error
                    ? errorMessage
                    : null || success
                    ? "Account Created Successfully"
                    : null}
                </div>
                <div className="form-g">
                  <TextField
                    sx={{ width: "100%", margin: "5px 0" }}
                    disabled={success || loading}
                    className="input"
                    label="Your Name"
                    variant="outlined"
                    autoComplete="off"
                    error={!validName && fullname}
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                  <div
                    className={`input-message ${
                      userFocus && fullname && !validName ? "" : "offscreen"
                    }`}
                  >
                    5 to 24 characters <br />
                    Don't use special characters <br />
                    Atleast one space
                  </div>
                </div>
                <div className="form-g">
                  <TextField
                    sx={{ width: "100%", margin: "5px 0" }}
                    disabled={success || loading}
                    className="input"
                    label="Update Username"
                    variant="outlined"
                    autoComplete="off"
                    error={!validUsername && username && !checkUsername}
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  {!usernameloading ? (
                    username && usernameFocus ? (
                      !checkUsername ? (
                        <p className="error-color">Username Not Available</p>
                      ) : (
                        <p className="success-color">Username Available</p>
                      )
                    ) : null
                  ) : (
                    <p>Loading...</p>
                  )}
                  <div
                    className={`input-message ${
                      usernameFocus && username.length && !validUsername
                        ? ""
                        : "offscreen"
                    }`}
                  >
                    5 to 15 characters <br />
                    It must be unique <br />
                    Don't use special characters <br />
                    Numbers Are Allowed
                  </div>
                </div>
                <div className="form-g">
                  <TextField
                    sx={{ width: "100%", margin: "5px 0" }}
                    disabled={success || loading}
                    className="input"
                    label="Your Email"
                    variant="outlined"
                    autoComplete="off"
                    error={!validEmail && email}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div
                    className={`input-message ${
                      emailFocus && email && !validEmail ? "" : "offscreen"
                    }`}
                  >
                    Enter a valid email
                  </div>
                </div>
                <div className="form-g">
                  <TextField
                    sx={{ width: "100%", margin: "5px 0" }}
                    disabled={success || loading}
                    id="outlined-password-input"
                    className="input"
                    label="Create Password"
                    type="password"
                    autoComplete="off"
                    error={!validPassword && password}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className={`input-message ${
                      passwordFocus && password && !validPassword
                        ? ""
                        : "offscreen"
                    }`}
                  >
                    Create 8 to 16 characters strong password <br />
                    Atleast 1 special characters <br />
                    Atleast 1 Alphabet and 1 Number
                  </div>
                </div>
                <div className="form-g">
                  <TextField
                    sx={{ width: "100%", margin: "5px 0" }}
                    disabled={success || loading}
                    id="outlined-password-input"
                    className="input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="off"
                    error={!validCpassword && cpassword}
                    onFocus={() => setCpasswordFocus(true)}
                    onBlur={() => setCpasswordFocus(false)}
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                  />
                  <div
                    className={`input-message ${
                      cpasswordFocus && cpassword && !validCpassword
                        ? ""
                        : "offscreen"
                    }`}
                  >
                    Password not match!
                  </div>
                </div>
                <br />
                <br />
                <p>
                  Already have an account?{" "}
                  <Link to="/login" style={{ textDecoration: "underline" }}>
                    Login
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
                disabled={
                  !validName ||
                  !validUsername ||
                  !validEmail ||
                  !validPassword ||
                  !validCpassword
                }
              >
                Register
              </LoadingButton>
            </CardActions>
          </Card>
        </form>
      )}
    </>
  );
};

export default RegisterForm;
