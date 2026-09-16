import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGO_URI) {
    console.log('MONGODB_URI is missing in enviroment variables');
    
}
if (!process.env.JWT_SECRET) {
    console.log('JWT_SECRET is missing in enviroment variables');
    
}
if (!process.env.PORT) {
    console.log('PORT is missing in enviroment variables');
}
if (!process.env.JWT_EXPIRES_IN) {
    console.log('JWT_EXPIRES_IN is missing in enviroment variables');
}
if (!process.env.FRONTEND_URL) {
    console.log('FRONTEND_URL is missing in enviroment variables');
}

const config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRES_IN : process.env.JWT_EXPIRES_IN,
    PORT : process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL
}

export default config;