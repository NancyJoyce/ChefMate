// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import recipeRoutes from './routes/recipeRoutes';
// import favouriteRoutes from './routes/favouriteRoutes';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/recipes', recipeRoutes);
// app.use('/api/favourites', favouriteRoutes);

// app.get('/api/health', (_req, res) => {
//   res.json({ status: 'ChefMate API is running!' });
// });

// // Connect to MongoDB then start server
// mongoose
//   .connect(process.env.MONGODB_URI as string)
//   .then(() => {
//     console.log('Connected to MongoDB Atlas');
//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });

// export default app;


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipeRoutes';
import favouriteRoutes from './routes/favouriteRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.use('/api/recipes', recipeRoutes);
app.use('/api/favourites', favouriteRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ChefMate API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;