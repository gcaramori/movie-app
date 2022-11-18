const { DataTypes } = require('sequelize');
const db = require('../connection');
const userModel = require('./user');

const Reviews = db.define("reviews", {
    reviewID: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    movieID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

Reviews.hasMany(userModel);

db.sync().then(() => {
   console.log('Reviews table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});

module.exports = Reviews;