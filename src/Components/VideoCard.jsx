import {
  styled,
  Box,
  Button,
  Menu,
  alpha,
  MenuItem,
  Divider
} from "@mui/material";
import { Link } from "react-router-dom";
import ViewIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL } from "../api/axios";
import useAxios from "../Hooks/useAxiosPrivate";

const VideoCard = ({ data }) => {
  const [user, setUser] = useState({});
  const axiosPrivate = useAxios();
  const Card = styled("div")(({ theme }) => ({
    height: "260px",
    width: "98%",
    // background: "black",
    marginBottom: "10px",
    flexShrink: 0,
    marginRight: "10px",

    [theme.breakpoints.up("sm")]: {
      width: "calc(100%/2 - 10px)"
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(100%/3 - 10px)"
    },
    [theme.breakpoints.up("lg")]: {
      width: "calc(100%/4 - 10px)"
    }
  }));
  const ImgContainer = styled("div")(({ theme }) => ({
    height: "200px",
    width: "100%",
    background: "gray"
  }));

  const Thumbnail = styled("video")(({ theme }) => ({
    height: "100%",
    width: "100%",
    objectFit: "cover"
  }));

  const Content = styled("div")(({ theme }) => ({
    // height: "100%",
    width: "100%",
    paddingTop: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "15px",
    padding: "0 5px"
    // background: "black"
  }));
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0"
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5)
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          )
        }
      }
    }
  }));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const getUser = async () => {
      await axiosPrivate
        .get(`/auth/getuser?id=${data.userId}`)
        .then((e) => {
          setUser(e.data);
        })
        .catch((err) => console.log(err));
    };
    getUser();
  }, []);
  return (
    <Card>
      <ImgContainer>
        <Link to={`/video?id=${data._id}`}>
          <Thumbnail
            src={BASE_URL + `/api/playvideo?path=${data?.path}`}
          ></Thumbnail>
        </Link>
      </ImgContainer>
      <p style={{ padding: "5px", fontWeight: "500" }}>{data.name}</p>
      <Content>
        <p>
          <Link to={`/user?id=${data.userId}`}>{user.name}</Link>
        </p>

        <div style={{ display: "flex" }}>
          <p style={{ display: "flex", alignItems: "center" }}>
            {data.views || 0} <ViewIcon sx={{ marginLeft: "5px" }} />
          </p>
          <Box sx={{ position: "relative" }}>
            <div>
              <Button
                sx={{ minWidth: 0, padding: 0 }}
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="text"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              ></Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button"
                }}
                sx={{ position: "absolute" }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  <DeleteIcon />
                  Delete
                </MenuItem>
              </StyledMenu>
            </div>
          </Box>
        </div>
      </Content>
      <Divider sx={{ marginTop: "10px" }} />
    </Card>
  );
};

export default VideoCard;
