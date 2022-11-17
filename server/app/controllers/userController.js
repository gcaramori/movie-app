const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../database/models/user');

exports.create = async (req, res) => {
    try {
        const { username, password, email, phone, birth } = req.body;

        if(!(username, password, email, phone, birth)) {
            res.status(400).send("Lack of necessary data!");
        }

        const searchUser = await UserModel.findAll({
            attributes: ['username'],
            limit: 1,
            where: {
                email: email   
            }
        });
        
        if(searchUser.length > 0) {
            res.status(401).send("User already exists");
            return;
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const createdUser = await UserModel.create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        phone: req.body.phone,
        birth: req.body.birth
        });

        const token = jwt.sign({
            user_id: createdUser.userID, email
        },
            process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        });
        
        createdUser.dataValues.token = token;
        
        if(createdUser && token) res.status(200).send(createdUser);
        else res.status(500).send('Token error!');
    }
    catch(err) {
        res.status(500).send(`Error when creating user: ${err}`);
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!(email && password)) {
            res.status(402).send("Lack of necessary data!");
        }
        
        const user = await UserModel.findAll({
            attributes: ['userID', 'username', 'password'],
            limit: 1,
            where: {
                email: email
            }
        });
        
        if(!user || !(await bcrypt.compare(password, user[0].password))) {
            res.status(405).send("Invalid credentials");
            return;
        }

        const token = jwt.sign(
            { user_id: user[0].userID, email },
                process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        user.token = token;
        
        if(token) res.status(200).send(user);
        else res.status(500).send('Token error!');
    }
    catch(err) {
        res.status(500).send(`Signin error: ${err}`);
    }
}

exports.find = async (req, res) => {
    try {
        const filters = req.body.filters ? req.body.filters : '';
        const limit = req.body.limit ? req.body.limit : 10;
        const attributes = req.body.attributes ? req.body.attributes : false;

        UserModel.findAll({
            attributes: attributes,
            limit: limit,
            where: filters
        })
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send(`Error when trying to find users: ${err}`);
        });
    }
    catch(err) {
        res.status(500).send(`Error when trying to find users: ${err}`);
    }
}