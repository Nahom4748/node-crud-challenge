// Import the Express module to facilitate route creation and HTTP request handling
const express = require("express");

// Initialize a new router instance from Express to organize person-related routes
const router = express.Router();

// Import the person controller to handle route logic for person operations
const person = require("../controllers/person.controller");

// Define a route to retrieve all persons from memory, handled by the getAllPerson function
router.get("/person", person.getAllPerson);

// Define a route to create a new person entry in memory, handled by the createPerson function
router.post("/person", person.createPerson);

// Define a route to retrieve a specific person by their ID, handled by the getbyId function
router.get("/person/:personId", person.getbyId);

// Define a route to delete a person from memory by ID, handled by the DeletePerson function
router.delete("/person/:personId", person.DeletePerson);

// Define a route to update an existing person's information by ID, handled by the UpdatePerson function
router.put("/person/:personId", person.UpdatePerson);

// Export the router instance to make these routes available for use in the main application
module.exports = router;
