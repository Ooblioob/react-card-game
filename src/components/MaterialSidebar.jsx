import React from "react";
import { useAuth0 } from "../react-auth0-spa";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

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
  // const theme = useTheme();

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

Sidebar.defaultProps = {
  visible: false,
};

export default Sidebar;
