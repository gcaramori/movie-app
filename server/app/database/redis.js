const redis = require('redis');

const connectRedis = async () => {
    try {
        const redisClient = redis.createClient();

        redisClient.on('error', (error) => {
            console.log(`Error connecting redis: ${error}`);
        });

        await redisClient.connect();
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectRedis;