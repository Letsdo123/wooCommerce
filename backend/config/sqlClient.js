import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// configuring the dotenv
dotenv.config()

console.log('DB Name:', process.env.DB_NAME);
console.log('DB User:', process.env.DB_USER);
console.log('DB Password:', process.env.DB_PASSWORD);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Disable logging; set to true for debugging
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to MySQL:', error);
    }
})();

export default sequelize