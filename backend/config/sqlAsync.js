// sqlAsync.js
import db from "../models";  // Ensure that this is the correct path to the models directory

const initializeDatabase = async () => {
  try {
    // Authenticate the connection
    await db.sequelize.authenticate();
    console.log('MySQL connection has been established successfully.');

    // Synchronize all models
    await db.sequelize.sync({ alter: true });
    console.log('All models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to MySQL:', error);
    throw error;  // Re-throw the error to be handled in server.js
  }
};

export default initializeDatabase;
