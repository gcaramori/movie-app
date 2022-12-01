const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const watchListController = require('../controllers/watchListController');
const reviewController = require('../controllers/reviewController');
const auth = require("../middleware/auth");

route.get('/*', (req, res) => {
    res.status(200).send('OLÁ MUNDO!');
});

//API

//users
route.post('/api/users', userController.create);
route.post('/api/users/find', userController.find);
route.put('/api/users', userController.update);
route.delete('/api/users', userController.delete);
route.post('/api/signin', userController.signin);
route.get('/api/logout', userController.logout);

//watch_list
route.post('/api/watch_list', watchListController.add);
route.post('/api/watch_list/find', watchListController.find);
route.put('/api/watch_list', auth, watchListController.updateStatus);
route.delete('/api/watch_list', watchListController.remove);


//review
route.post('/api/reviews', reviewController.add);
route.post('/api/reviews/find', reviewController.find);
route.put('/api/reviews', auth, reviewController.update);
route.delete('/api/reviews', reviewController.remove);

module.exports = route;