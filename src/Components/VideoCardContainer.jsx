import { Box } from "@mui/material";
import VideoCard from "./VideoCard";
import { useEffect, useRef } from "react";

const VideoCardContainer = ({ data, page, hasMore, fetch }) => {
  const containerRef = useRef();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: { sm: "flex" },
          flexWrap: { sm: "wrap" },
          height: "100vh",
          width: "100vw",
          overflowX: "hidden"
        }}
        onScroll={handleScroll}
        ref={containerRef}
      >
        {data
          ? data.map((e, i) => {
              return <VideoCard key={i} data={e} />;
            })
          : "Nothing To Shows"}
      </Box>
    </>
  );
  function handleScroll() {
    const container = containerRef.current;
    var isAtBottom =
      container.scrollHeight - container.scrollTop <= container.clientHeight;
    if (hasMore && isAtBottom) {
      fetch();
    }
  }
};

export default VideoCardContainer;
