const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const watchListController = require('../controllers/watchListController');
const reviewController = require('../controllers/reviewController');
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
route.get('/logout', userController.logout);

//watch_list
route.post('/watch_list', watchListController.add);
route.post('/watch_list/find', watchListController.find);
route.put('/watch_list', auth, watchListController.updateStatus);
route.delete('/watch_list', watchListController.remove);


//review
route.post('/reviews', reviewController.add);
route.post('/reviews/find', reviewController.find);
route.put('/reviews', auth, reviewController.update);
route.delete('/reviews', reviewController.remove);

module.exports = route;