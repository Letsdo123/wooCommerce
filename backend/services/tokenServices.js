import jwt from 'jsonwebtoken'

// generating the access token
export const generateAccessToken = (userId)=>{
    return jwt.sign(
        {userId},
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {expiresIn:'7d'}
    )
}

// generating the refresh token
export const generateRefreshToken = (userId)=>{
    return jwt.sign(
        {userId},
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {expiresIn:'1h'}
    )
}