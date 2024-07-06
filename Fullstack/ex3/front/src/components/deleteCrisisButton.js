//deleteCrisisButton.js
import React from 'react';
import { Button } from '@chakra-ui/react';

const DeleteCrisisButton = ({ crisisId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://leafy-chaja-d4f8f6.netlify.app/.netlify/functions/api/crises/${crisisId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete crisis');
      }
      console.log('Crisis deleted successfully');
      if (onDelete) {
        onDelete(); // Call the onDelete callback after successful delete
      }
    } catch (error) {
      console.error('Error deleting crisis:', error);
    }
  };

  return (
    <Button onClick={handleDelete} colorScheme="red">Delete</Button>
  );
};

export default DeleteCrisisButton;
