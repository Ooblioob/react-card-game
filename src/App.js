import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import Game from "./components/game";
import PrivateRoute from "./components/auth/privateRoute";
import TopNav from "./components/TopNav";
import MaterialSidebar from "./components/MaterialSidebar";
import Achievements from "./components/Achievements";
import Settings from "./components/Settings";
import Instructions from "./components/Instructions";

import {Grid } from "@material-ui/core";

function App() {
  const [menu, setMenu] = useState(false);
  const handleMenuClick = () => {
    setMenu(!menu);
  };

  return (
    <Router history={history}>
      <Grid container direction="column">
        <Grid item>
          <TopNav menuClickHandler={handleMenuClick} />
        </Grid>
        <Grid item >
          <Grid container>
            <Grid item xs={0} sm={3}> 
              <MaterialSidebar visible={menu} menuClickHandler={handleMenuClick} />
            </Grid>
            <Grid item xs={0} sm={1}></Grid>
            <Grid item xs={12} sm={4}>
              <Switch>
                <Route path="/react-card-game" exact component={Game} />
                <PrivateRoute
                  path="/react-card-game/achievements"
                  component={Achievements}
                />
                <Route path="/react-card-game/settings" component={Settings} />
                <Route
                  path="/react-card-game/instructions"
                  component={Instructions}
                />
              </Switch>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
