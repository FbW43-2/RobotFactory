# Robot Factory

In the second step you are going to create a basic backend server using express.

# Task

Add middlewares for

* Getting all robots from the backend
* Rotating one robot to the right by passing an ID
* Rotating one robot to the left by passing an ID
* Moving one robot forward by passing an ID


# Advise

Store the robots in an array in the backend.
Example:

let robotFactory = [];

createRobot = (robotName) => {
    robotFactory.push({
        id: ...,
        name: ...,
        posX: 0,
        posY: 0,
        heading: "NORTH",
    })
}
