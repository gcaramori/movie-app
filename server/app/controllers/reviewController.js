const Review = require('../database/models/review');

exports.add = async (req, res) => {
    try {
        const { movieId, userId, title, content, avaliation } = req.body;

        if(!movieId || !userId || !title || !content || !avaliation) {
            res.status(400).send("Lack of necessary data!");
            return;
        }

        const createdReview = new Review({
            movieId: movieId,
            userId: userId,
            title: title,
            content: content,
            avaliation: avaliation
        });

        createdReview
        .save(createdReview)
        .then(response => {
            if(response) res.status(200).send(response);
            else res.status(500).send('Error while setting movie review!');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating an review"
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

        Review.find({
            ...filter
        })
        .limit(limit)
        .select(select)
        .sort(sort)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send(`Error when trying to find review: ${err}`);
        });
    }
    catch(err) {
        res.status(500).send(`Error when trying to find review: ${err}`);
    }
}

exports.update = async (req, res) => {
    try {
        const { userId, movieId, title, content, avaliation } = req.body;

        if(!userId || !movieId) {
            res.status(400).send('Lack of necessary data!');
            return;
        }
        
        Review.findOneAndUpdate({
            userId: userId,
            movieId: movieId
        },
        {
            title: title,
            content: content,
            avaliation: avaliation
        })
        .then(response => {
            if(response) res.status(200).send('Review status updated with success!');
            else res.status(400).send('Review status update failed!');
        })
        .catch(err => {
            res.status(500).send(`Error when trying to update the review from: ${email}. Error: ${err}`);
        });
    }
    catch(err) {
        res.status(500).send(`Error when trying to update review: ${err}`);
    }
}

exports.remove = async (req, res) => {
    try {
        const { userId, movieId } = req.body;

        if(!userId || !movieId) {
            res.status(400).send('Lack of necessary data!');
            return;
        }

        Review.findOneAndDelete({
            userId: userId,
            movieId: movieId
        })
        .then(response => {
            if(response) res.status(200).send('Review removed with success!');
            else res.status(400).send('Review or user not exists!');
        })
        .catch(err => {
            res.status(500).send(`Error when trying to remove the review from this user: ${email}. Error: ${err}`);
        });
    }
    catch(err) {
        res.status(500).send(`Error when trying to remove a review: ${err}`);
    }
}