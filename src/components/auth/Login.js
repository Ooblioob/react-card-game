import React from "react";
import { useAuth0 } from "../../react-auth0-spa";

const Login = props => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  
  if (isAuthenticated) {
    return (
      <button className="w3-bar-item w3-button w3-padding" onClick={() => logout()}><i className="fa fa-sign-out fa-fw"></i>  Log Out</button>
    )
  }
  
  return (
    <button className="w3-bar-item w3-button w3-padding" onClick={() => loginWithRedirect({})}><i className="fa fa-sign-in fa-fw"></i>  Log In</button>
  )
}

export default Login;