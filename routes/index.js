// Import the Express module to use its functionalities for creating and managing routes
const express = require("express");

// Create a new router instance using Express's Router method to define route handlers
const router = express.Router();

// Import the routes defined in the 'person.routes' module for handling person-related requests
const person = require("./person.routes");

// Mount the imported 'person' router onto the main router to manage all person-related routes
router.use(person);

// Export the router module to make it available for use in other parts of the application
module.exports = router;
