import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";
import { observer } from "mobx-react";
import List from "./pages/list";
import PassionPurposeList from "./pages/passion-purpose-list";
import Generator from "./pages/generator";
import store from "./store";

const dev = process.env.NODE_ENV === "development";
const publicUrl = process.env.PUBLIC_URL;
const parts = publicUrl.replace(/https?:\/\//, "").split("/");
const base = parts.slice(1).join("/");
const basename = dev ? "" : base;

@observer
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
            <NavLink to="/full-list" activeClassName="active">
              All Responses
            </NavLink>
          </nav>
          <Route
            render={({ location }) => (
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  render={() => <Generator store={store} />}
                />
                <Route path="/list" render={() => <List store={store} />} />
                <Route
                  path="/full-list"
                  render={() => <PassionPurposeList store={store} />}
                />
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
