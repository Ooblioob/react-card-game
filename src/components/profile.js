import React from "react";
import { useAuth0 } from "../react-auth0-spa";

const Profile = props => {
  const { loading, user } = useAuth0();
  
  if (loading || !user) {
    return null;
  }

  return (
  <div className="w3-container w3-row">
      <div className="w3-col s4">
        <img src={user.picture} className="w3-circle w3-margin-right" style={{width:"46px"}} alt="User Profile" />
      </div>
      <div className="w3-col s8 w3-bar">
        <span>Welcome, <strong>{user.nickname}</strong></span>
      </div>
    </div> 
  )
};

export default Profile;