const WatchList = require('../database/models/watchList');

exports.add = async (req, res) => {
    try {
        const { movieId, userId } = req.body;

        if(!movieId || !userId) {
            res.status(400).send("Lack of necessary data!");
            return;
        }

        const createdWatchList = new WatchList({
            movieId: movieId,
            userId: userId,
            seen: false
        });

        createdWatchList
        .save(createdWatchList)
        .then(response => {
            if(response) res.status(200).send(response);
            else res.status(500).send('Error while setting movie in watch list!');
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

exports.find = (req, res) => {
    try {
        const filter = req.body.filter ? req.body.filter : {};
        const limit = req.body.limit ? req.body.limit : 10;
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

        WatchList.find({
            ...filter
        })
        .limit(limit)
        .select(select)
        .sort(sort)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send(`Error when trying to find watch list: ${err}`);
        });
    }
    catch(err) {
        res.status(500).send(`Error when trying to find watch list: ${err}`);
    }
}

exports.updateStatus = async (req, res) => {
    try {
        const { userId, movieId, seen } = req.body;

        if(!userId || !movieId) {
            res.status(400).send('Lack of necessary data!');
            return;
        }
        
        WatchList.findOneAndUpdate({
            userId: userId,
            movieId: movieId
        },
        {
            seen: !seen
        })
        .then(response => {
            if(response) res.status(200).send('Watch list status updated with success!');
            else res.status(400).send('Watch list status update failed!');
        })
        .catch(err => {
            res.status(500).send(`Error when trying to update the watch list from: ${email}. Error: ${err}`);
        });
    }
    catch(err) {
        res.status(500).send(`Error when trying to update watch list: ${err}`);
    }
}

exports.remove = async (req, res) => {
    try {
        const { userId, movieId } = req.body;

        if(!userId || !movieId) {
            res.status(400).send('Lack of necessary data!');
            return;
        }

        WatchList.findOneAndDelete({
            userId: userId,
            movieId: movieId
        })
        .then(response => {
            if(response) res.status(200).send('Watch list movie removed with success!');
            else res.status(400).send('Watch list movie or user not exists!');
        })
        .catch(err => {
            res.status(500).send(`Error when trying to remove the movie from this user: ${email} watch list. Error: ${err}`);
        });
    }
    catch(err) {
        res.status(500).send(`Error when trying to remove movie from watch list. Error: ${err}`);
    }
}