// Import the UUID library to generate unique IDs for each person
const { v4: uuidv4 } = require("uuid");

// Array to store all persons' data in memory as a temporary database
let persons = [];

// Function to fetch and return all persons' data from memory
const getAllPersons = async () => {
  try {
    // Check if there are any persons in the persons array
    if (persons.length === 0) {
      // If not, return an error message
      return { error: "No persons found" };
    }
    // Return all person data to be used in the controller
    return persons;
  } catch (error) {
    // If an error occurs, throw an error for handling in the controller
    throw new Error("Error fetching persons");
  }
};

// Function to create a new person, save them in memory, and return the new data
const createPerson = async (name, age, hobbies) => {
  // Format the new person's data and generate a unique ID
  const newPerson = { id: uuidv4(), name, age, hobbies };

  // Add the new person's data to the end of the persons array
  persons.push(newPerson);

  // Return all persons, including the new entry, to the controller
  return persons;
};

// Function to fetch a specific person by their ID and return the data
const ById = async (Id) => {
  // Find the person by their ID in the persons array
  const personData = persons.find((p) => p.id === Id.personId);

  // If the person is found, return their data
  if (personData) {
    return personData;
  }

  // If not found, return false
  return false;
};

// Function to delete a specific person by their ID and return the updated data
const DeletebyId = async (Id) => {
  // Find the person's index by their ID in the persons array
  const personIndex = persons.findIndex((p) => p.id === Id.personId);

  // If the person is not found, return an error message
  if (personIndex === -1) {
    return { error: "Person not found" };
  }

  // If found, delete the person using the splice method
  persons.splice(personIndex, 1);

  // Return the updated persons array
  return { message: "Person deleted successfully", persons: persons };
};
// Function to update a person's data by their ID
const Update = async (id, name, age, hobbies) => {
  // Find the person's index by their ID in the persons array
  const personIndex = persons.findIndex((p) => p.id === id.personId);

  // If the person is not found, return an error message
  if (personIndex === -1) {
    return { error: "Person not found" };
  }

  // Validate the 'name' parameter to ensure it's a string, if provided
  if (name && typeof name !== "string") {
    return { error: "Name must be a string" };
  }
  // Validate the 'age' parameter to ensure it's a number, if provided
  if (age !== undefined && typeof age !== "number") {
    return { error: "Age must be a number" };
  }
  // Validate the 'hobbies' parameter to ensure it's an array, if provided
  if (hobbies && !Array.isArray(hobbies)) {
    return { error: "Hobbies must be an array" };
  }

  // Merge the updated fields with the existing person's data
  const updatedPerson = {
    ...persons[personIndex],
    ...(name && { name }),
    ...(age !== undefined && { age }),
    ...(hobbies && { hobbies }),
  };

  // Update the person in the persons array with the new data
  persons[personIndex] = updatedPerson;

  // Return the updated person data to the controller
  return updatedPerson;
};

// Export all functions for use in the controller
module.exports = {
  getAllPersons,
  createPerson,
  ById,
  DeletebyId,
  Update,
};
