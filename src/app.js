import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import Questions from "./pages/questions";
import Responses from "./pages/responses";
import Generator from "./pages/generator";
import store from "./store";
import Nav from "./components/nav";
import PageTransition from "./components/page-transition";
import Loading from "./pages/loading";
import Container from "./components/container";
import PromptViz from "./pages/prompt-viz/";

const dev = process.env.NODE_ENV === "development";
const publicUrl = process.env.PUBLIC_URL;
const parts = publicUrl.replace(/https?:\/\//, "").split("/");
const base = parts.slice(1).join("/");
const basename = dev ? "" : base;

const NoData = () => (
  <Container>
    <p style={{ textAlign: "center", fontSize: "1.5rem" }}>No responses available...yet!</p>
  </Container>
);

@observer
class App extends Component {
  render() {
    const hasLoaded = store.hasLoaded;
    const hasData = store.data !== null && Object.keys(store.data).length !== 0;

    return (
      <BrowserRouter basename={basename}>
        <div>
          <Nav />
          <Route
            render={({ location }) => {
              let contents;
              if (!hasLoaded) contents = <Loading />;
              else if (!hasData) contents = <NoData />;
              else
                contents = (
                  <Switch location={location}>
                    <Route exact path="/" render={() => <Generator store={store} />} />
                    <Route path="/questions" render={() => <Questions store={store} />} />
                    <Route path="/responses" render={() => <Responses store={store} />} />
                    <Route path="/prompt-viz" render={() => <PromptViz store={store} />} />
                    <Redirect to="/" />
                  </Switch>
                );

              return <PageTransition pageKey={location.pathname}>{contents}</PageTransition>;
            }}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
