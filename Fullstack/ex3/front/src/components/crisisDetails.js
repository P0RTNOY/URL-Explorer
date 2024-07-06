//crisisDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Text, VStack, Spinner } from '@chakra-ui/react'; 
import DeleteCrisisButton from './deleteCrisisButton';

const CrisisDetails = () => {
  const { id } = useParams();
  const [crisis, setCrisis] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://leafy-chaja-d4f8f6.netlify.app/.netlify/functions/api/crises/${id}`)
      .then(response => response.json())
      .then(data => setCrisis(data))
      .catch(error => console.error('Error fetching crisis details:', error));
  }, [id]);

  const handleDelete = () => {
    fetch(`https://leafy-chaja-d4f8f6.netlify.app/.netlify/functions/api/crises/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('Error deleting crisis:', error));
  };

  if (!crisis) {
    return <Spinner size="xl" />;
  }

  return (
    <Box p={4}>
      <Link to="/" className="nav-link">Home</Link>
      <VStack spacing={4} align="start">
        <Heading mb={4}>Crisis Details</Heading>
        <Text><strong>Title:</strong> {crisis.title}</Text>
        <Text><strong>Description:</strong> {crisis.description}</Text>
        <Text><strong>Date:</strong> {new Date(crisis.date).toLocaleString()}</Text>
        <Box>
          <Button as={Link} to={`/update-crisis/${id}`} colorScheme="teal" mr={4}>Update Crisis</Button>
          <DeleteCrisisButton crisisId={id} />
        </Box>
      </VStack>
    </Box>
  );
};

export default CrisisDetails;
