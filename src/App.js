import React, {useState} from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import Game from "./components/game";
import PrivateRoute from "./components/auth/privateRoute";
import TopNav from "./components/TopNav";
import SideBar from "./components/Sidebar";
import Achievements from "./components/Achievements";
import Settings from "./components/Settings";
import Instructions from "./components/Instructions";

function App() {
  const [menu, setMenu] = useState(false);  
  const handleMenuClick = () => {
    console.log("handle Menu Click fired");
    setMenu(!menu);
  }

  return (
    <Router history={history}>
      <TopNav menuClickHandler={handleMenuClick} />
      <SideBar visible={menu}/>
      <div id="main" className="w3-main w3-display-container" style={{marginTop:"43px", marginLeft: menu ? "25%": "0%" }}>      
        <Switch>
          <Route path="/" exact component={Game}/>
          <PrivateRoute path="/achievements" component={Achievements} />
          <Route path="/settings" component={Settings}/>
          <Route path="/instructions" component={Instructions}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;