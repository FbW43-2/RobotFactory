import React from "react";
import { Link } from "react-router-dom";
const axios = require('axios').default;

const Robot = ({ robot, onUpdate }) => {

    const rotateRight = async () => {
        try {
            await axios.post('http://localhost:3001/right', { "id": robot.id });
            onUpdate();
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }

    const rotateLeft = async () => {
        try {
            await axios.post('http://localhost:3001/left', { "id": robot.id });
            onUpdate();
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }

    const moveForward = async () => {
        try {
            await axios.post('http://localhost:3001/move', { "id": robot.id });
            onUpdate();
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }

    return (
        <article className="container">
            <h2>
                <Link to={'/'}>Go back</Link>
            </h2>
            <h1>{robot.name}</h1>
            <h2>Position</h2>
            <p>posX: {robot.posX}</p>
            <p>posY: {robot.posY}</p>
            <h2>Heading</h2>
            <p>{robot.heading}</p>
            <button type="submit" onClick={rotateRight}>Right</button>
            <button type="submit" onClick={rotateLeft}>Left</button>
            <button type="submit" onClick={moveForward}>Move</button>
        </article>
    );
};

export default Robot;