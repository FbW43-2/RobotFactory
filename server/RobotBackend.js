const express = require('express')
const app = express()
const cors = require('cors');
const port = 3001

/**
 * advaced task: create collection in Postman
 */

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// omit cors errors
app.use(cors());

let robotFactory = [];

createRobot = (robotName) => {
    robotFactory.push({
        id: robotFactory.length,
        slug: robotName || "Bot",
        name: robotName || "Bot",
        posX: 0,
        posY: 0,
        heading: "NORTH",
    })
}

turnRight = (id) => {
    try {
        switch (robotFactory[id].heading) {
            case "NORTH": robotFactory[id].heading = "EAST"; break;
            case "EAST": robotFactory[id].heading = "SOUTH"; break;
            case "SOUTH": robotFactory[id].heading = "WEST"; break;
            case "WEST": robotFactory[id].heading = "NORTH"; break;
            default: null;
        }
    } catch (error) {
        console.log("robot could not turn right");
    }
}

turnLeft = (id) => {
    try {
        switch (robotFactory[id].heading) {
            case "NORTH": robotFactory[id].heading = "WEST"; break;
            case "EAST": robotFactory[id].heading = "NORTH"; break;
            case "SOUTH": robotFactory[id].heading = "EAST"; break;
            case "WEST": robotFactory[id].heading = "SOUTH"; break;
            default: null;
        }
    }
    catch (error) {
        console.log("robot could not turn left");
    }
}

moveForward = (id) => {
    try {
        switch (robotFactory[id].heading) {
            case "NORTH": robotFactory[id].posY++; break;
            case "EAST": robotFactory[id].posX++; break;
            case "SOUTH": robotFactory[id].posY--; break;
            case "WEST": robotFactory[id].posX--; break;
            default: null;
        }
    }
    catch (error) {
        console.log("robot could not move forward");
    }
}

app.get('/', (req, res) => {
    res.send(robotFactory);
})

app.put('/create', (req, res) => {
    createRobot(req.body.name);
    res.send(robotFactory);
});

app.post('/right', (req, res) => {
    const id = req.body.id || 0;
    turnRight(id);
    res.send(robotFactory[id]);
});

app.post('/left', (req, res) => {
    const id = req.body.id || 0;
    turnLeft(id);
    res.send(robotFactory[id]);
});

app.post('/move', (req, res) => {
    console.log("BP");
    const id = req.body.id || 0;
    moveForward(id);
    res.send(robotFactory[id]);
});

app.listen(port, () => {
    console.log(`Eddy is listening for commands at http://localhost:${port}`)
});