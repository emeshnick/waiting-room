import React from "react";
import Home from "./components/Home";
import { Route } from "react-router-dom";

class Routes extends React.Component {
  render() {
    return <Route exact path="/" component={Home} />;
  }
}

export default Routes;
