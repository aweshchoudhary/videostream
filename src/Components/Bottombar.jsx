import * as React from "react";
import { BottomNavigationAction, BottomNavigation } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";
import { useNavigate } from "react-router-dom";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("home");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue === "home" ? "/" : newValue);
  };

  return (
    <BottomNavigation
      sx={{ height: "60px", backgroundColor: "black", display: { sm: "none" } }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Search"
        value="search"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Upload"
        value="upload"
        icon={<UploadIcon />}
      />
    </BottomNavigation>
  );
}
