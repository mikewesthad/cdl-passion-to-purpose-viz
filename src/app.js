import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";
import List from "./pages/list";
import Generator from "./pages/generator";

const dev = process.env.NODE_ENV === "development";
const publicUrl = process.env.PUBLIC_URL;
const parts = publicUrl.replace(/https?:\/\//, "").split("/");
const base = parts.slice(1).join("/");
const basename = dev ? "" : base;

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={basename}>
        <div>
          <nav>
            <NavLink to="/" exact activeClassName="active">
              Generator
            </NavLink>
            <NavLink to="/list" activeClassName="active">
              See all
            </NavLink>
          </nav>
          <Route
            render={({ location }) => (
              <Switch location={location}>
                <Route exact path="/" component={Generator} />
                <Route path="/list" component={List} />
                <Redirect to="/" />
              </Switch>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
