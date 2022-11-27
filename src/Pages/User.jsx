import {
  Box,
  Button,
  Divider,
  Typography,
  CircularProgress
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VideoCardContainer from "../Components/VideoCardContainer";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxios from "../Hooks/useAxiosPrivate";
import axios from "../api/axios";
import { LoadingButton } from "@mui/lab";
import useAuth from "../Hooks/useAuth";

const User = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const axiosPrivate = useAxios();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    setLoading(true);
    await axios
      .get("/auth/logout", { withCredentials: true })
      .then(() => {
        setAuth({});
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  const deleteAccount = async () => {
    const deleteVideos = async () => {
      await axiosPrivate
        .delete("/api/deletevideos", { params: { userId } })
        .then(() => {
          setAuth({});
          navigate("/login", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    setLoading(true);
    await axiosPrivate
      .delete("/auth/", { withCredentials: true })
      .then(() => {
        deleteVideos();
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const fetchVideos = async () => {
    await axiosPrivate
      .get("/api/getvideos", {
        params: { offset: page, userId }
      })
      .then((e) => {
        if (e.data.length) {
          setData([...data, ...e.data]);
          setPage(page + 1);
        } else {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const getUser = async () => {
      await axiosPrivate
        .get(`/auth/getuser?id=${userId}`)
        .then((e) => {
          setUser(e.data);
          fetchVideos();
        })
        .catch((err) => console.log(err));
    };
    getUser();
  }, []);

  return (
    <>
      {user ? (
        <Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
              {user.name}
            </Typography>
            <div style={{ display: "flex", gap: "20px" }}>
              <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <YouTubeIcon /> 25
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <VisibilityIcon /> 100K
              </p>
            </div>
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <LoadingButton
              onClick={logout}
              loading={loading}
              loadingPosition="start"
              variant="contained"
              sx={{ marginRight: "10px" }}
            >
              Logout
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              color="error"
              onClick={deleteAccount}
            >
              Delete Account
            </LoadingButton>
          </Box>
          <Divider sx={{ marginY: "15px" }} />
          <Box>
            <VideoCardContainer
              data={data}
              fetch={fetchVideos}
              hasMore={hasMore}
              page={page}
            />
          </Box>
        </Box>
      ) : (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default User;
