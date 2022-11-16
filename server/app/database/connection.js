const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize.authenticate()
.then(() => {
    console.log('MySQL Connected!');
})
.catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;