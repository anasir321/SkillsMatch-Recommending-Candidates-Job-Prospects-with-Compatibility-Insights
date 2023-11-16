const express = require('express');
const app = express();
const authRoutes = require('./routes/auth'); // Import the auth routes
const crudRoutes = require('./routes/crudRoutes'); // Import the crud routes
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware for parsing JSON request bodies

// Defining routes
app.use('/api/auth', authRoutes); // Mount the auth routes under /api/auth
app.use('/api/crudAuthenticated', crudRoutes); // Mount the crud routes under /api/crudAuthenticated

// ... Other middleware and routes ...



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
