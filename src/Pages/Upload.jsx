import {
  Box,
  Typography,
  styled,
  InputBase,
  alpha,
  Button
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { useRef, useState } from "react";
import useAxios from "../Hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const Upload = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const prevUrl = file ? URL.createObjectURL(file) : null;
  const axiosPrivate = useAxios();

  const inputRef = useRef();
  const navigate = useNavigate();

  const handleUpload = () => {
    inputRef.current.click();
  };
  const upload = async () => {
    setLoading(true);
    console.log(file);
    await axiosPrivate
      .post(
        "/api/upload",
        { name, video: file },
        {
          headers: {
            "Content-type": "multipart/form-data"
          }
        }
      )
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const remove = async () => {
    setFile(null);
    // prevUrl = "";
  };

  const UploadContainer = styled("div")(({ theme }) => ({
    position: "relative",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    width: "100%",
    height: "250px",
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }));
  const IconContainer = styled("div")(({ theme }) => ({
    textAlign: "center"
  }));
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    width: "100%"
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: "15px",
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch"
      }
    }
  }));
  return (
    <Box sx={{ width: { sm: "50%", xs: "100%" }, margin: "auto" }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", marginBottom: "10px" }}
      >
        Upload Video
      </Typography>
      <Search>
        <StyledInputBase
          placeholder="Video Name"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
        />
      </Search>
      <UploadContainer onClick={handleUpload}>
        {!file ? (
          <>
            <input
              type="file"
              style={{ visibility: "hidden", position: "absolute" }}
              ref={inputRef}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <IconContainer>
              <UploadIcon sx={{ fontSize: "50px" }} /> <br />
              Drag or Click to upload video
            </IconContainer>
          </>
        ) : (
          <video
            src={prevUrl}
            style={{ height: "100%", width: "100%" }}
            controls
          ></video>
        )}
      </UploadContainer>
      <LoadingButton
        sx={{ marginTop: "10px", marginRight: "10px" }}
        loading={loading}
        onClick={upload}
        variant="contained"
        size="large"
        className="btn"
        disabled={!name && !file}
      >
        Upload
      </LoadingButton>
      <Button
        sx={{ marginTop: "10px" }}
        variant="outlined"
        size="large"
        color="error"
      >
        Cancel
      </Button>
      {file ? (
        <Button
          sx={{ marginTop: "10px", marginLeft: "5px" }}
          variant="outlined"
          size="large"
          color="error"
          onClick={remove}
        >
          Remove Video
        </Button>
      ) : null}
    </Box>
  );
};

export default Upload;
