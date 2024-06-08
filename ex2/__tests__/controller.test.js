// controller.test.js

// Importing required modules and functions
const { getAllCrises, addNewCrisis, updateCrisis, deleteCrisis } = require('../controller/controller');
const repository = require('../repository/repository');

// Mocking the repository functions
jest.mock('../repository/repository'); 

// Testing the getAllCrises controller function
describe('getAllCrises', () => {
  test('It should return an array of crises', async () => {
    // Mock data
    const mockCrises = [{ _id: '1', name: 'Crisis 1' }, { _id: '2', name: 'Crisis 2' }];
    // Mocking the repository function to resolve with mockCrises
    repository.getAllCrises.mockResolvedValue(mockCrises);
    // Mock request and response objects
    const req = {};
    const res = {
      json: jest.fn()
    };
    // Calling the controller function
    await getAllCrises(req, res);
    // Verifying if the response JSON method is called with mockCrises
    expect(res.json).toHaveBeenCalledWith(mockCrises);
  });
});

// Testing the addNewCrisis controller function
describe('addNewCrisis', () => {
  test('It should add a new crisis', async () => {
    // Mock data
    const newCrisis = { name: 'New Crisis' };
    const mockAddedCrisis = { _id: '3', name: 'New Crisis' }; // Mock the added crisis
    // Mocking the repository function to resolve with mockAddedCrisis
    repository.addNewCrisis.mockResolvedValue(mockAddedCrisis);
    // Mock request and response objects
    const req = { body: newCrisis };
    const res = {
      json: jest.fn()
    };
    // Calling the controller function
    await addNewCrisis(req, res);
    // Verifying if the response JSON method is called with mockAddedCrisis
    expect(res.json).toHaveBeenCalledWith(mockAddedCrisis);
  });
});

// Testing the updateCrisis controller function
describe('updateCrisis', () => {
  test('It should update an existing crisis', async () => {
    // Mock data
    const crisisId = '1';
    const updatedCrisis = { name: 'Updated Crisis' };
    const mockUpdatedCrisis = { _id: crisisId, ...updatedCrisis }; // Mock the updated crisis
    // Mocking the repository function to resolve with mockUpdatedCrisis
    repository.updateCrisis.mockResolvedValue(mockUpdatedCrisis);
    // Mock request and response objects
    const req = { params: { id: crisisId }, body: updatedCrisis };
    const res = {
      json: jest.fn()
    };
    // Calling the controller function
    await updateCrisis(req, res);
    // Verifying if the response JSON method is called with mockUpdatedCrisis
    expect(res.json).toHaveBeenCalledWith(mockUpdatedCrisis);
  });
});

// Testing the deleteCrisis controller function
describe('deleteCrisis', () => {
  test('It should delete an existing crisis', async () => {
    // Mock data
    const crisisId = '1';
    // Mocking the repository function to resolve with true indicating successful deletion
    repository.deleteCrisis.mockResolvedValue(true); // Mock the deletion
    // Mock request and response objects
    const req = { params: { id: crisisId } };
    const res = {
      json: jest.fn()
    };
    // Calling the controller function
    await deleteCrisis(req, res);
    // Verifying if the response JSON method is called with a success message
    expect(res.json).toHaveBeenCalledWith({ message: 'Crisis deleted successfully' });
  });
});
