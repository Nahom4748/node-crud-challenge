// Import dependencies
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const router = require("./routes");
// Import route definitions

// Middleware for parsing JSON requests
app.use(express.json());

// Enable CORS with specific settings for security and flexibility
app.use(
  cors({
    origin: "*", // Allow all origins; modify as needed for security
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type"], // Allow only Content-Type header
  })
);

// Mounts imported routes to the application, enabling organized route management
app.use(router);

// Start server and listen on specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
