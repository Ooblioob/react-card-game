import React, {useState} from "react";
import { useAuth0 } from "../react-auth0-spa";
import Profile from "./profile";
import Login from "./auth/Login";
import { NavLink } from "react-router-dom";


import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const Sidebar = (props) => {
  const { loading } = useAuth0();

  const classes = useStyles();
  const theme = useTheme();

  if (loading) {
    return null;
  }
  return (
    <Drawer open={props.visible} variant="persistent" className={classes.drawer} classes={{
      paper: classes.drawerPaper,
    }}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={props.menuClickHandler}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button key="Dashboard">
          <ListItemIcon>
            <InboxIcon/>
            <ListItemText>Dashboard</ListItemText>
          </ListItemIcon>
        </ListItem>
        <ListItem button key="Instructions">
          <ListItemIcon>
            <InboxIcon/>
            <ListItemText>Instructions</ListItemText>
          </ListItemIcon>
        </ListItem>
        <ListItem button key="Achievements">
          <ListItemIcon>
            <InboxIcon/>
            <ListItemText>Achievements</ListItemText>
          </ListItemIcon>
        </ListItem>
        <ListItem button key="Settings">
          <ListItemIcon>
            <InboxIcon/>
            <ListItemText>Settings</ListItemText>
          </ListItemIcon>
        </ListItem>
      </List>
    </Drawer>
  )
};
    // <nav
    //   className="w3-sidebar w3-white w3-animate-left"
    //   style={{
    //     zIndex: 3,
    //     width: "300px",
    //     display: props.visible ? "block" : "none",
    //   }}
    //   id="mySidebar"
    // >
    //   <br />
    //   <Profile />
    //   <hr />
    //   <div className="w3-container">
    //     <h5>Dashboard</h5>
    //   </div>
    //   <div className="w3-bar-block">
    //     <NavLink
    //       exact
    //       to="/react-card-game"
    //       activeClassName="w3-blue"
    //       className="w3-bar-item w3-button w3-padding"
    //     >
    //       <i className="fa fa-home fa-fw"></i> Home
    //     </NavLink>
    //     <NavLink
    //       to="/react-card-game/instructions"
    //       activeClassName="w3-blue"
    //       className="w3-bar-item w3-button w3-padding"
    //     >
    //       <i className="fa fa-book fa-fw"></i>  Instructions
    //     </NavLink>
    //     <NavLink
    //       to="/react-card-game/achievements"
    //       activeClassName="w3-blue"
    //       className="w3-bar-item w3-button w3-padding"
    //     >
    //       <i className="fa fa-trophy fa-fw"></i>  Achievements
    //     </NavLink>
    //     <NavLink
    //       to="/react-card-game/settings"
    //       activeClassName="w3-blue"
    //       className="w3-bar-item w3-button w3-padding"
    //     >
    //       <i className="fa fa-cog fa-fw"></i>  Settings
    //     </NavLink>
    //     <Login />
    //   </div>
    // </nav>

Sidebar.defaultProps = {
  visible: false,
};

export default Sidebar;
