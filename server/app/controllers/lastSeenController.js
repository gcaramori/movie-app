exports.getLastSeen = async (req, res) => {
    try {
        const cacheResults = await redisClient.get(lastSeen);

        if(!cacheResults) {
            res.status(200).send({ data: {} })
            return;
        }

        res.status(200).send({
            fromCache: true,
            data: JSON.parse(cacheResults)
        });
    } 
    catch (error) {
        res.status(404).send({ message: error || "Error searching in redis!" });
    }
}