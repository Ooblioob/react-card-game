import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TopNav = (props) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={props.menuClickHandler}
        >
          <MenuIcon />
        </IconButton>
        {/* TODO: find a way to remove typography below while still keeping Login pinned right */}
        <Typography variant="h6" className={classes.title}></Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};
/* <div className="w3-bar w3-top w3-black w3-large" style={{ zIndex: "4" }}>
      <button
        className="w3-bar-item w3-button w3-hover-none w3-hover-text-light-grey"
        onClick={props.menuClickHandler}
      >
        <i className="fa fa-bars"></i>  Menu
      </button>

      <a
        className="w3-bar-item w3-right w3-button"
        href="https://github.com/Ooblioob/react-card-game"
      >
        <i className="fa fa-github"></i>
      </a>
      <a
        className="w3-bar-item w3-right w3-button"
        href="https://github.com/Ooblioob/react-card-game/blob/master/README.md"
      >
        <i className="fa fa-book"></i> Docs
      </a>
    </div>
  );
}; */

export default TopNav;
