const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000
};

const connectMongo = () => {
    try {
        //mongodb connection string
        mongoose.connect(process.env.MONGO_URI, options, () => {
            console.log(`MongoDB Connected!`);
        });
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectMongo;