import React, { useContext, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import UserContext from "../context/UserContext";
import "./UserNav.css";
import Logo from "../images/Navlogo.png";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  drawer: {
    width: "200px",
  },
});

function UserNav() {
  const { userData, setUserData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const username = userData.user.username;
  const classes = useStyles();

  const handleDrawer = () => {
    setOpen(!open);
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  const itemsList = [
    {
      text: "General",
      icon: <BusinessIcon />,
      functional: handleDrawer,
      path: "/",
    },
    {
      text: "Ingresos",
      icon: <CallMadeIcon />,
      functional: handleDrawer,
      path: "/ingresos",
    },
    {
      text: "Egresos",
      icon: <CallReceivedIcon />,
      functional: handleDrawer,
      path: "/egresos",
    },
    {
      text: "Metas",
      icon: <EmojiFlagsIcon />,
      functional: handleDrawer,
      path: "/metas",
    },
    {
      text: "Logout",
      icon: <ExitToAppIcon />,
      functional: logout,
      path: "/",
    },
  ];

  return (
    <div className="root">
      <AppBar position="fixed">
        <Toolbar className="try">
          <IconButton edge="start" aria-label="menu" onClick={handleDrawer}>
            <MenuIcon />
          </IconButton>
          <div className="container">
            <Typography variant="h6">{username}</Typography>
            <Link to="/">
              <img className="Logo" src={Logo} alt="navlogo" />
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        anchor="left"
        className={classes.drawer}
        onClose={handleDrawer}
      >
        <div>
          <List>
            {itemsList.map((item, index) => {
              const { text, icon, functional, path } = item;
              return (
                <Link to={path} onClick={functional}>
                  <ListItem button key={text}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default UserNav;
