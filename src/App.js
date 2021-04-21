import React, { useState, useEffect } from "react";
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
const axios = require('axios').default;

const App = (props) => {
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    sendGetRequest();
  }, []);

  const sendGetRequest = async () => {
    try {
      const resp = await axios.get('http://localhost:3001/');
      setRobots(resp.data);
    } catch (err) {
      // error handling
      console.error(err);
    }
  };

  const addRobot = async (name) => {
    try {
      await axios.put('http://localhost:3001/create', {"name": name});
      sendGetRequest();
    } catch (err) {
      // error handling
      console.error(err);
    }
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
              if (robot) return <Robot robot={robot} onUpdate={sendGetRequest} />;
              else return <NotFound />;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;