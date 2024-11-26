import { createClient } from 'redis'

// Initialize Redis client with TLS enabled
const redisClient = createClient({
    socket: {
        host: '127.0.0.1',
        port: 6379,
    },
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

(async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis from redis client');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
})();

export default redisClient