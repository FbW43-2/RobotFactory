var express = require('express');
var router = express.Router();
const { getAllRobots, createRobot, turnRobotLeft, turnRobotRight, moveRobot } = require('../controllers/robotController');

router.get('/getAllRobots', getAllRobots);

router.put('/create', createRobot);

router.post('/right', turnRobotRight);

router.post('/left', turnRobotLeft);

router.post('/move', moveRobot);

module.exports = router;
