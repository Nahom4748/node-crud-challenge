// Import the person service to handle data operations
const person = require("../services/person.service");

// Controller to handle fetching all persons
async function getAllPerson(req, res, next) {
  // Call the getAllPersons method from the person service
  const persons = await person.getAllPersons();

  // Check if the fetch operation was successful
  if (!persons) {
    // If failed, send a 400 error response
    res.status(400).json({
      error: "Failed to get all persons!",
    });
  } else {
    // If successful, send a 200 response with the persons data
    res.status(200).json({
      status: "success",
      data: persons,
    });
  }
}

// Controller to handle creating a new person
const createPerson = async (req, res) => {
  try {
    // Extract name, age, and hobbies from the request body
    const { name, age, hobbies } = req.body;

    // Validate name to ensure it's a required string
    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ error: "Name is required and must be a string" });
    }

    // Validate age to ensure it's a required number
    if (typeof age !== "number") {
      return res
        .status(400)
        .json({ error: "Age is required and must be a number" });
    }

    // Validate hobbies to ensure it's an array
    if (!Array.isArray(hobbies)) {
      return res.status(400).json({ error: "Hobbies must be an array" });
    }

    // Call the createPerson method from the person service
    const NewPerson = await person.createPerson(name, age, hobbies);

    // Check if creation was successful
    if (!NewPerson) {
      return res.status(400).json({
        error: "Failed to add the person!",
      });
    } else {
      // If successful, send a 200 response with the new person data
      return res.status(200).json({
        success: true,
        message: "Person added successfully",
        data: NewPerson,
      });
    }
  } catch (error) {
    // Log the error and send a 500 response for unexpected issues
    console.error(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

// Controller to handle fetching a specific person by ID
const getbyId = async (req, res) => {
  // Retrieve the person ID from the request parameters
  const Id = req.params;

  // Call the ById method from the person service
  const searchData = await person.ById(Id);

  // Check if person was found
  if (searchData) {
    res.json(searchData);
  } else {
    // If not found, send a 404 error response
    res.status(404).json({ error: "Person not found" });
  }
};

// Controller to handle deleting a person by ID
const DeletePerson = async (req, res) => {
  // Retrieve the person ID from the request parameters
  const Id = req.params;

  // Call the DeletebyId method from the person service
  const DeletedData = await person.DeletebyId(Id);

  // Check if deletion was successful
  if (DeletedData) {
    res.json(DeletedData);
  } else {
    // If deletion fails, send a 404 error response
    res.status(404).json({ error: "Error: Person not found" });
  }
};

// Controller to handle updating a person by ID
const UpdatePerson = async (req, res) => {
  // Extract name, age, and hobbies from the request body
  const { name, age, hobbies } = req.body;

  // Retrieve the person ID from the request parameters
  const id = req.params;

  try {
    // Call the Update method from the person service
    const updatedPerson = await person.Update(id, name, age, hobbies);

    // Check if update was successful or if an error occurred
    if (updatedPerson.error) {
      return res.status(400).json(updatedPerson); // Send error message
    }

    // If successful, send a 200 response with the updated person data
    res.status(200).json(updatedPerson);
  } catch (error) {
    // Handle unexpected errors and send a 500 response
    res
      .status(500)
      .json({ error: "An error occurred while updating the person" });
  }
};

// Export all controllers for use in route definitions
module.exports = {
  getAllPerson,
  createPerson,
  getbyId,
  DeletePerson,
  UpdatePerson,
};
