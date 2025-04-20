import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import authRouter from './routes/authRoutes.js';
import menuRouter from './routes/menuRoutes.js';
import approvalRouter from './routes/approvalRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import productRouter from './routes/productRoutes.js';
import client from './config/redisClient.js';
import db from './models/index.js';

dotenv.config();

// Connect to Database
connectDB();

// Initialize Express app
const app = express();


// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
// app.use(cors()); // Enable CORS for all origins

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Add allowed frontend URLs here
  credentials: true,
};
app.use(cors(corsOptions));

// Configuration for helmet.js for extra security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'trusted-cdn.com'],
      },
    },
    referrerPolicy: { policy: 'no-referrer' },
    crossOriginResourcePolicy: { policy: 'same-origin' },
  })
);

// Error Handling Middleware
app.use(errorHandler);

// Define PORT
const PORT = process.env.PORT || 5000;

// Test Redis connection function
const testRedisConnection = async () => {
  try {
    // Set a test key-value pair in Redis (expires in 10 seconds)
    await client.set('testKey', 'Redis is working!', 'EX', 10);

    // Retrieve the value from Redis
    const redisData = await client.get('testKey');

    if (redisData) {
      console.log('Redis test successful:', redisData);
    } else {
      console.log('Redis test failed: Data not found');
    }
  } catch (err) {
    console.error('Error testing Redis:', err);
  }
};
// Uncomment this to run the test connection
// testRedisConnection();

// Function to list all keys in Redis
const listKeys = async () => {
  try {
    const keys = await client.keys('*'); // Get all keys
    console.log('Stored Keys:', keys);

    // Fetch and print the value for each key
    for (const key of keys) {
      const value = await client.get(key);
      console.log(`${key}: ${value}`);
    }
  } catch (err) {
    console.error('Error fetching data from Redis:', err);
  } finally {
    client.quit(); // Close Redis connection
  }
};
// Uncomment this to list keys
// listKeys();

// API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin/dashboard', menuRouter);
app.use('/api/v1/approval', approvalRouter);
app.use('/api/v1/products/category', categoryRouter);
app.use('/api/v1/products', productRouter);

// Basic test route
app.get('/', (req, res) => {
  res.send('Welcome to My Online E-commerce Platform');
});

// making sync with sql database
// await sequelize.sync({alter:true})


// Syncing all sequilize models
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('MySQL connection has been established successfully.');

    // create tables if doesn't exists
    // await sequelize.sync({alter:true});
    // await Address.sync({force:false})
    await db.sequelize.sync()
    console.log("All models synchronized");

  } catch (error) {
    console.error('Unable to connect to MySQL:', error);
  }
})();

// await sequelize.sync();
console.log('All models were synchronized successfully.');

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
