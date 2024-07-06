//addCrisisForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading } from '@chakra-ui/react'; 

const AddCrisisForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://leafy-chaja-d4f8f6.netlify.app/.netlify/functions/api/crises/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        throw new Error('Failed to add crisis');
      }
      console.log('Crisis added successfully');
      navigate('/'); // Redirect to home page after adding crisis
    } catch (error) {
      console.error('Error adding crisis:', error);
    }
  };

  return (
    <Box className="add-crisis-form" p={4}>
      <Link to="/" className="nav-link">Home</Link>
      <Heading mb={4}>Add New Crisis</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="title">Title:</FormLabel>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="description">Description:</FormLabel>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">Add Crisis</Button>
      </form>
    </Box>
  );
};

export default AddCrisisForm;
