const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);

turnRight = (heading) => {
    try {
        switch (heading) {
            case "NORTH": return "EAST";
            case "EAST": return "SOUTH";
            case "SOUTH": return "WEST";
            case "WEST": return "NORTH";
            default: return heading;
        }
    } catch (error) {
        console.log("robot could not turn right");
    }
}

turnLeft = (heading) => {
    try {
        switch (heading) {
            case "NORTH": return "WEST";
            case "EAST": return "NORTH";
            case "SOUTH": return "EAST";
            case "WEST": return "SOUTH";
            default: return heading;
        }
    } catch (error) {
        console.log("robot could not turn right");
    }
}

moveForward = (heading, posX, posY) => {
    try {
        switch (heading) {
            case "NORTH": return {"posX": posX, "posY": posY + 1};
            case "EAST": return {"posX": posX + 1, "posY": posY};
            case "SOUTH": return {"posX": posX, "posY": posY - 1};
            case "WEST": return {"posX": posX -1, "posY": posY};
            default: {posX, posY};
        }
    }
    catch (error) {
        console.log("robot could not move forward");
    }
}

exports.getAllRobots = (req, res, next) => {
    const robots = db.get('robots').value();
    res.status(200).send(robots);
}

exports.createRobot = (req, res, next) => {
    const robotName = req.body.name;
    const newRobot = {
        slug: robotName || "Bot",
        name: robotName || "Bot",
        posX: 0,
        posY: 0,
        heading: "NORTH",
    }
    db.get('robots').push(newRobot)
        .last()
        .assign({ id: Date.now().toString() })
        .write()

    res.status(200).send(newRobot);
}

exports.turnRobotRight = (req, res, next) => {
    const robotID = req.body.id;
    const robot = db.get('robots').find({"id": robotID}).value();
    const updatedRobot = {
        "slug": robot.slug,
        "name": robot.name,
        "posX": robot.posX,
        "posY": robot.posY,
        "heading": turnRight(robot.heading),
    }
    const result = db.get('robots').find({"id": robotID}).assign(updatedRobot).write();
    res.status(200).send(result);
}

exports.turnRobotLeft = (req, res, next) => {
    const robotID = req.body.id;
    const robot = db.get('robots').find({"id": robotID}).value();
    const updatedRobot = {
        "slug": robot.slug,
        "name": robot.name,
        "posX": robot.posX,
        "posY": robot.posY,
        "heading": turnLeft(robot.heading),
    }
    const result = db.get('robots').find({"id": robotID}).assign(updatedRobot).write();
    res.status(200).send(result);
}

exports.moveRobot = (req, res, next) => {
    const robotID = req.body.id;
    const robot = db.get('robots').find({"id": robotID}).value();
    const coordinates = moveForward(robot.heading, robot.posX, robot.posY);
    const updatedRobot = {
        "slug": robot.slug,
        "name": robot.name,
        "posX": coordinates.posX,
        "posY": coordinates.posY,
        "heading": robot.heading,
    }
    const result = db.get('robots').find({"id": robotID}).assign(updatedRobot).write();
    res.status(200).send(result);
}