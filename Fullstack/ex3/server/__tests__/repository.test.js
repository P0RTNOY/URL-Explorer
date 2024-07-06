//__tests__/repository.test.js

// Importing required modules and functions
const repository = require('../repository/repository');
const Crisis = require('../model/model');

// Mocking the Crisis model
jest.mock('../model/model');

// Testing the getAllCrises repository function
describe('getAllCrises', () => {
  test('It should return an array of crises', async () => {
    // Mock data
    const mockCrises = [{ _id: '1', name: 'Crisis 1' }, { _id: '2', name: 'Crisis 2' }];
    // Mocking the Crisis model function to resolve with mockCrises
    Crisis.find.mockResolvedValue(mockCrises);
    // Calling the repository function
    const result = await repository.getAllCrises();
    // Verifying if the result matches mockCrises
    expect(result).toEqual(mockCrises);
  });
});

// Testing the addNewCrisis repository function
describe('addNewCrisis', () => {
  test('It should add a new crisis', async () => {
    // Mock data
    const newCrisis = { name: 'New Crisis' };
    const mockAddedCrisis = { _id: '3', name: 'New Crisis' }; // Mock the added crisis
    // Mocking the Crisis model function to resolve with mockAddedCrisis
    Crisis.create.mockResolvedValue(mockAddedCrisis);
    // Calling the repository function
    const result = await repository.addNewCrisis(newCrisis);
    // Verifying if the result matches mockAddedCrisis
    expect(result).toEqual(mockAddedCrisis);
  });
});

// Testing the updateCrisis repository function
describe('updateCrisis', () => {
  test('It should update an existing crisis', async () => {
    // Mock data
    const crisisId = '1';
    const updatedCrisis = { name: 'Updated Crisis' };
    const mockUpdatedCrisis = { _id: crisisId, ...updatedCrisis }; // Mock the updated crisis
    // Mocking the Crisis model function to resolve with mockUpdatedCrisis
    Crisis.findByIdAndUpdate.mockResolvedValue(mockUpdatedCrisis);
    // Calling the repository function
    const result = await repository.updateCrisis(crisisId, updatedCrisis);
    // Verifying if the result matches mockUpdatedCrisis
    expect(result).toEqual(mockUpdatedCrisis);
  });
});

// Testing the deleteCrisis repository function
describe('deleteCrisis', () => {
  test('It should delete an existing crisis', async () => {
    // Mock data
    const crisisId = '1';
    const mockDeletedCrisis = { _id: crisisId, name: 'Deleted Crisis' }; // Mock the deleted crisis
    // Mocking the Crisis model function to resolve with mockDeletedCrisis
    Crisis.findByIdAndDelete.mockResolvedValue(mockDeletedCrisis);
    // Calling the repository function
    const result = await repository.deleteCrisis(crisisId);
    // Verifying if the result matches mockDeletedCrisis
    expect(result).toEqual(mockDeletedCrisis);
  });
});
