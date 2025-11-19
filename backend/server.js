import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index.js';
import todosRouter from './routes/todos.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Todo Tracker API',
    version: '1.0.0',
    endpoints: {
      todos: '/todos'
    }
  });
});

app.use('/todos', todosRouter);

// Error handling middleware
app.use(errorHandler);

// Database sync and server start
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();