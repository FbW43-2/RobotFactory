import React, { useState } from "react";
import Header from "./components/Header";
import Robots from "./components/Robots";
import Robot from "./components/Robot";
import NotFound from "./components/NotFound"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "./App.css";

const App = (props) => {
  const [robots, createRobot] = useState([
    {
      id: 0,
      slug: "eddy",
      name: "Eddy",
      posX: 0,
      posY: 0,
      heading: "NORTH",
    },
    {
      id: 1,
      slug: "sam",
      name: "Sam",
      posX: 0,
      posY: 0,
      heading: "NORTH",
    },
    {
      id: 2,
      slug: "chuck",
      name: "Chuck",
      posX: 0,
      posY: 0,
      heading: "NORTH",
    },
  ]);

  const addRobot = (robotName) => {
    const robotsCount = robots.length;
    const newRobot = {
      id: robotsCount,
      slug: robotName,
      name: robotName,
      posX: 0,
      posY: 0,
      heading: "NORTH",
    }
    createRobot([...robots, newRobot]);
    console.log(robots);
  }

  return (
    <Router>
    <div className="App">
      <Header />
      <Switch>
      <Route exact path="/" render={() => <Robots robots={robots} addRobot={addRobot} />} />
      <Route
            path="/robot/:robotSlug"
            render={(props) => {
              const robot = robots.find(
                (robot) => robot.slug === props.match.params.robotSlug
              );
              if (robot) return <Robot robot={robot} />;
              else return <NotFound />;
            }}
          />
      </Switch>
    </div>
    </Router>
  );
};

export default App;