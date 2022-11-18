const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const watchListController = require('../controllers/watchListController');
const auth = require("../middleware/auth");

/**
 * @description Root route
 * @method GET/
 */
route.get('/', (req, res) => {
    res.send('Hello world');
});

//API

//users
route.post('/users', userController.create);
route.post('/users/find', userController.find);
route.put('/users', auth, userController.update);
route.delete('/users', userController.delete);
route.post('/signin', userController.signin);

//watch_list
route.post('/watch_list', watchListController.create);
route.post('/watch_list/find', watchListController.find);
route.put('/watch_list', auth, watchListController.updateStatus);
route.delete('/watch_list', watchListController.delete);

module.exports = route;