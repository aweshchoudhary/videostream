import {
  Box,
  Button,
  CircularProgress,
  styled,
  Typography
} from "@mui/material";
import ViewIcon from "@mui/icons-material/Visibility";
import UserIcon from "@mui/icons-material/Person";
import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxiosPrivate";
import { BASE_URL } from "../api/axios";

const Video = () => {
  const [video, setVideo] = useState();
  const [user, setUser] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const videoId = searchParams.get("id");

  const axiosPrivate = useAxios();
  const VideoContainer = styled("div")(({ theme }) => ({
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60%"
    }
  }));
  const Video = styled("video")(({ theme }) => ({
    height: "250px",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      height: "400px"
    }
  }));

  const handlePlay = async () => {
    await axiosPrivate.get("/api/updateviews", { params: { id: videoId } });
  };

  useEffect(() => {
    const getUser = async (userId) => {
      await axiosPrivate
        .get(`/auth/getuser`, {
          params: { id: userId }
        })
        .then((e) => {
          setUser(e.data);
        })
        .catch((err) => console.log(err));
    };
    const getVideo = async () => {
      await axiosPrivate
        .get("/api/getvideo", { params: { id: videoId } })
        .then(async (e) => {
          await setVideo(e.data);
          getUser(e.data.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getVideo();
  }, []);
  return (
    <>
      {user && video ? (
        <VideoContainer>
          <Video
            src={BASE_URL + `/api/playvideo?path=${video?.path}`}
            controls
            autoPlay
            onPlay={handlePlay}
          ></Video>
          <Typography>{video?.name}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingY: "10px"
            }}
          >
            <Typography
              sx={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <UserIcon />
              <Link to={`/user?id=${user?._id}`}>{user?.name}</Link>
            </Typography>

            <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              {video?.views}
              <ViewIcon />
            </p>
          </Box>
        </VideoContainer>
      ) : (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Video;
