const bcrypt = require('bcrypt');
const UserModel = require('../database/models/user');

exports.create = async (req, res) => {
    if(!req.body) {
        res.status(400).send({ message: 'Empty request data!' });
        return; 
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    UserModel.create({
       username: req.body.username,
       password: hashedPassword,
       email: req.body.email,
       phone: req.body.phone,
       birth: req.body.birth
    }).then(response => {
        res.status(200).send(response);
    }).catch((error) => {
        res.status(500).send({ message: `Error while trying to create user: ${error}` });
    });
}

exports.findAll = async (req, res) => {

}