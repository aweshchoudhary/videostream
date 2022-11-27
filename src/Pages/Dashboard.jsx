import { Box } from "@mui/material";
import VideoCardContainer from "../Components/VideoCardContainer";
import { useState, useEffect } from "react";
import useAxios from "../Hooks/useAxiosPrivate";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const axiosPrivate = useAxios();

  const fetchVideos = async () => {
    await axiosPrivate
      .get("/api/getvideos", {
        params: { offset: page }
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
    fetchVideos();
  }, []);

  return (
    <Box>
      <VideoCardContainer
        data={data}
        fetch={fetchVideos}
        hasMore={hasMore}
        page={page}
      />
    </Box>
  );
};

export default Dashboard;
