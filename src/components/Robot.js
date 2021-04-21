import React from "react";
import { Link } from "react-router-dom";


const Robot = ({ robot }) => {
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
        </article>
    );
};

export default Robot;