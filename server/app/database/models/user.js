const { Sequelize, DataTypes } = require('sequelize');
const db = require('../connection');

const User = db.define("users", {
    userID: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    timestamps: true
});

db.sync().then(() => {
   console.log('Users table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});

module.exports = User;