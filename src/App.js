import React, { useState, useCallback } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import Game from "./components/Game/Game";
import PrivateRoute from "./components/auth/privateRoute";
import TopNav from "./components/TopNav";
import MaterialSidebar from "./components/MaterialSidebar";
import Achievements from "./components/Achievements";
import Settings from "./components/Settings";
import Instructions from "./components/Instructions";

import { Grid } from "@material-ui/core";

import { createMuiTheme } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const App = () => {
  const createColorTheme = (color) => 
    createMuiTheme({
    palette: {
      primary: colors[color.toLowerCase()]
    },
  });
  const [menu, setMenu] = useState(false);
  const [themeColor, setThemeColor] = useState("Red");
  const [muiTheme, setMuiTheme] = useState(createColorTheme(themeColor))
  const handleMenuClick = () => {
    setMenu(!menu);
  };


  const changeTheme = (color) => {
    setMuiTheme(() => createColorTheme(color));
    setThemeColor(color);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Router history={history}>
        <Grid container direction="column" wrap="nowrap">
          <Grid item>
            <TopNav
              menuClickHandler={handleMenuClick}
              currentColor={themeColor}
              changeTheme={changeTheme}
            />
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item xs={false} sm={3}>
                {/* <MaterialSidebar
                visible={menu}
                menuClickHandler={handleMenuClick}
              /> */}
              </Grid>
              <Grid item xs={false} sm={1}></Grid>
              <Switch>
                <Route
                  path="/react-card-game"
                  exact
                  render={(props) => (
                    <Game {...props} themeColor={themeColor} />
                  )}
                />
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
