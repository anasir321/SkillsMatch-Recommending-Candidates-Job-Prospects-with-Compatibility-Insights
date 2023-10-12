const express = require('express');
const app = express();
const authRoutes = require('./routes/auth'); // Import the auth routes

app.use(express.json()); // Middleware for parsing JSON request bodies

// Define your routes
app.use('/api/auth', authRoutes); // Mount the auth routes under /api/auth

// ... Other middleware and routes ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
