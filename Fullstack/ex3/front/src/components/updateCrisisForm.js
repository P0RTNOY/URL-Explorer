//updateCrisisForm.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading } from '@chakra-ui/react'; 

const UpdateCrisisForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://leafy-chaja-d4f8f6.netlify.app/.netlify/functions/api/crises/${id}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.title);
        setDescription(data.description);
      })
      .catch(error => console.error('Error fetching crisis details:', error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://leafy-chaja-d4f8f6.netlify.app/.netlify/functions/api/crises/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        throw new Error('Failed to update crisis');
      }
      console.log('Crisis updated successfully');
      navigate('/'); // Redirect to home page after updating crisis
    } catch (error) {
      console.error('Error updating crisis:', error);
    }
  };

  return (
    <Box className="update-crisis-form" p={4}>
      <Link to="/" className="nav-link">Home</Link>
      <Heading mb={4}>Update Crisis</Heading>
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
        <Button type="submit" colorScheme="blue">Update Crisis</Button>
      </form>
    </Box>
  );
};

export default UpdateCrisisForm;
