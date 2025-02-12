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
    logging: console.log, // Disable logging; set to true for debugging
});

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('MySQL connection has been established successfully.');
        
//         // create tables if doesn't exists
//         // await sequelize.sync({alter:true});
//         // await Address.sync({force:false})
//         await sequelize.sync({alter:true})
//         console.log("All models synchronized");

//     } catch (error) {
//         console.error('Unable to connect to MySQL:', error);
//     }
// })();

export default sequelize