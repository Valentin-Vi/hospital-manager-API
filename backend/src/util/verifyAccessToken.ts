import 'dotenv';
const jwt = require('jsonwebtoken');

export default function verifyAccessToken (
    access_token: string
): any {
    return jwt.verify(access_token, process.env.ACCESS_JWT_SECRET);
};