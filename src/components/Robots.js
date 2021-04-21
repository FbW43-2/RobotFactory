import React, { useState } from "react";
import { Link } from "react-router-dom";


const Robots = ({ robots, addRobot }) => {
  const [name, setName] = useState("");
  const createRobot = (event) => {
    event.preventDefault();
    addRobot(name);
    setName("");
  }
  return (
  <article className="container">
    <form className="container" onSubmit={createRobot}>
      <h2>Create a new robot</h2>
      <p>
        <label htmlFor="form-name">Name:</label>
        <input
          id="form-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </p>
      <p>
        <button type="submit">Create</button>
      </p>
    </form>
    <h1>Robots</h1>
    <ul>
      {robots.length < 1 && <li key="empty">No robots yet!</li>}
      {robots.map(robot => (
        <li key={robot.id}>
          <h2>
            <Link to={`/robot/${robot.slug}`}>{robot.name}</Link>
          </h2>
        </li>
      ))}
    </ul>
  </article>
);
      }

export default Robots;
