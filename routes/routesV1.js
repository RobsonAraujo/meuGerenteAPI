//Here are all routes.

const express = require('express')
const router = express.Router();
const controllers = require('../controllers');
const authMiddleware = require('../middleware/auth')();





// BUSINNES RULES

router.get('/compareExponencialGrowth/:id', controllers.insightsController.compareExponencialGrowth);
router.get('/compareCompetitive/:id/:segment', controllers.insightsController.compareCompetitive);




// USER
router.post('/login', controllers.userController.login);
router.post('/register', controllers.userController.register);




module.exports = router;
