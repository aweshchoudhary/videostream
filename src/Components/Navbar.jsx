import { Box, IconButton, styled, Typography } from "@mui/material";
import UserIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { auth } = useAuth();
  const ListContainer = styled("ul")(({ theme }) => ({
    display: "none",
    gap: "10px",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  }));
  console.log(auth);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "60px",
        backgroundColor: "black",
        color: "white",
        paddingX: "10px"
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
        <Link to="/">VideoStream</Link>
      </Typography>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ListContainer>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
        </ListContainer>
        <div>
          <IconButton>
            <Link to={`/user?id=${auth?.user?._id}`}>
              <UserIcon />
            </Link>
          </IconButton>
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
