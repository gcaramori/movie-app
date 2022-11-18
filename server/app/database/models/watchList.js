const { DataTypes } = require('sequelize');
const db = require('../connection');

const WatchList = db.define("watch_list", {
    movieID: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

db.sync().then(() => {
   console.log('Watch list table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});

module.exports = WatchList;