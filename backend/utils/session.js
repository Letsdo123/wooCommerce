import redisClient from "../config/redisClient.js";

// Store refersh token in Redis with expiaration
export const saveSession = async (userId,refreshToken)=>{
    const expiryTime = 7 * 24 * 60 * 60; // 7 days in seconds
    await redisClient.set(`user_session:${userId}`,refreshToken,{
        EX:expiryTime // Token experies after 7 days
    })
}

// Get refresh token from Redis
export const getSession = async (userId)=>{
    const refreshToken = await redisClient.get(`user_session:${userId}`);
    return refreshToken;
}

// Delete session when user logs out or token experies
export const deleteSession = async (userId)=>{
    await redisClient.del(`user_session:${userId}`)
} 