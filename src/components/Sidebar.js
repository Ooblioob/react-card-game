import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import Profile from "./profile"
import Login from "./auth/Login";
import { NavLink } from "react-router-dom";

const Sidebar = props => {  
  const { loading } = useAuth0();

  if (loading) {
    return null;
  }
  return (
    <nav className="w3-sidebar w3-white w3-animate-left" style={{zIndex: 3, width: "300px", display: props.visible ? "block" : "none"}} id="mySidebar"><br />
      <Profile />
      <hr />
      <div className="w3-container">
        <h5>Dashboard</h5>
      </div>
      <div className="w3-bar-block">
        <NavLink exact to="/" activeClassName="w3-blue" className="w3-bar-item w3-button w3-padding"><i className="fa fa-home fa-fw"></i> Home</NavLink>
        <NavLink to="/instructions" activeClassName="w3-blue" className="w3-bar-item w3-button w3-padding"><i className="fa fa-book fa-fw"></i>  Instructions</NavLink>
        <NavLink to="/achievements" activeClassName="w3-blue" className="w3-bar-item w3-button w3-padding"><i className="fa fa-trophy fa-fw"></i>  Achievements</NavLink>
        <NavLink to="/settings" activeClassName="w3-blue" className="w3-bar-item w3-button w3-padding"><i className="fa fa-cog fa-fw"></i>  Settings</NavLink>
        <Login />
      </div>
    </nav>
  );
}

Sidebar.defaultProps = { 
  visible: false
}

export default Sidebar;