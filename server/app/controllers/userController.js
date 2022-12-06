const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user');

exports.create = async (req, res) => {
    try {
        const { username, password, email, name, phone, birth, profile_pic } = req.body;

        if(!username || !password || !email || !name || !phone || !birth) {
            res.status(400).send("Lack of necessary data!");
        }

        const searchUser = await User.find({ email: email });
        
        if(searchUser[0]) {
            res.status(400).send("User already exists");
            return;
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = new User({
            username: username,
            password: hashedPassword,
            email: email,
            name: name,
            phone: phone,
            birth: birth,
            profile_pic: profile_pic
        });

        createdUser
        .save(createdUser)
        .then(response => {
            const token = jwt.sign({
                user_id: response._id, email
            },
                process.env.TOKEN_KEY,
            {
                expiresIn: "24h",
            });
            
            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            
            if(createdUser && token) res.status(200).send(createdUser);
            else res.status(500).send('Token error!');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating an user"
            });
        });
    }
    catch(err) {
        res.status(500).send(`Error when creating user: ${err}`);
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            res.status(400).send({ message: "Lack of necessary data!" });
            return;
        }
        
        const user = await User.find({ email: email });
        
        if(!user[0] || !(await bcrypt.compare(password, user[0].password))) {
            res.status(400).send({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            { user_id: user[0]._id, email },
                process.env.TOKEN_KEY,
            {
                expiresIn: "24h",
            }
        );
        
        if(token) {
            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            res.status(200).send({ user: user[0], token: token });
        }
        else res.status(500).send('Token error!');
    }
    catch(err) {
        res.status(500).send(`Signin error: ${err}`);
    }
}

exports.find = (req, res) => {
    try {
        const filter = req.body.filter ? req.body.filter : {};
        const limit = req.body.limit ? req.body.limit : 1;
        const select = req.body.select ? req.body.select : {};
        const sort = req.body.sort ? req.body.sort : { name: 1 };

        if(typeof filter !== 'object') {
            res.status(400).send('Filter parameter must be an object!');
            return;
        }
        
        if(typeof select !== 'object') {
            res.status(400).send('Select parameter must be an object!');
            return;
        }

        if(typeof sort !== 'object') {
            res.status(400).send('Sort parameter must be an object!');
            return;
        }

        User.find({
            ...filter
        })
        .limit(limit)
        .select(select)
        .sort(sort)
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

exports.update = async (req, res) => {
    try {
        const { email, ...parameters } = req.body;

        if(!email) {
            res.status(400).send('Must pass user id parameter!');
            return;
        }

        if(parameters.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(parameters.password, salt);

            parameters.password = hashedPassword;
        }

        const searchUser = await User.find({ email: email });
        
        if(!searchUser[0]) {
            res.status(400).send("User not exists");
            return;
        }
        
        User.findOneAndUpdate({
            email: email
        },
        { 
            ...parameters
        })
        .then(response => {
            if(response) res.status(200).send({ message: 'User updated with success!' });
            else res.status(400).send({ message: 'User update failed!' });
        })
        .catch(err => {
            res.status(500).send({ message: `Error when trying to update this user: ${email}. Error: ${err}` });
        });
    }
    catch(err) {
        res.status(500).send({ message: `Error when trying to update user: ${err}` });
    }
}

exports.delete = async (req, res) => {
    try {
        const { email, ...parameters } = req.body;

        if(!email) {
            res.status(400).send('Must pass user id parameter');
            return;
        }

        User.findOneAndDelete({
            email,
            ...parameters
        })
        .then(response => {
            console.log(response);
            if(response) res.status(200).send('User deleted with success!');
            else res.status(400).send('User not exists!');
        })
        .catch(err => {
            res.status(500).send(`Error when trying to delete this user: ${email}. Error: ${err}`);
        });
    }
    catch(err) {
        res.status(500).send(`Error when trying to delete user: ${err}`);
    }
}

exports.logout = (req, res) => {
    try {
        res.clearCookie("jwt");

        res.status(200).send({ status: true });
    }
    catch(err) {
        res.status(500).send({ message: `Error while trying to logout. Error: ${err}` });
    }
}