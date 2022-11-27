import { Box, Typography, styled, alpha, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VideoCardContainer from "../Components/VideoCardContainer";
import { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxiosPrivate";

const Search = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");

  const axiosPrivate = useAxios();

  const fetchVideos = async () => {
    if (!query) return null;
    await axiosPrivate
      .get("/api/search", {
        params: { query }
      })
      .then((e) => {
        if (e.data.length) {
          setData(e.data);
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
  }, [query]);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: "15px",
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch"
      }
    }
  }));
  return (
    <form>
      <Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          Search
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            autoFocus
          />
        </Search>
        <Box sx={{ marginY: "20px" }}>
          {data.length ? (
            <VideoCardContainer
              data={data}
              fetch={fetchVideos}
              hasMore={hasMore}
              page={page}
            />
          ) : (
            <Typography variant="h5">Search your video....</Typography>
          )}
        </Box>
      </Box>
    </form>
  );
};

export default Search;
