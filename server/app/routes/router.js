const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');

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
// route.put('/users', userController.update);
// route.delete('/users', userController.delete);
route.post('/signin', userController.signin);

module.exports = route;