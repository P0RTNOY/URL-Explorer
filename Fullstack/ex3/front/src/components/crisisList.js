//crisisList.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Heading, List, ListItem, Text } from '@chakra-ui/react'; 
import DeleteCrisisButton from './deleteCrisisButton';

const CrisisList = () => {
  const [crises, setCrises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCrises();
  }, []);

  const fetchCrises = () => {
    fetch('https://leafy-chaja-d4f8f6.netlify.app/.netlify/functions/api/crises')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCrises(data);
        } else {
          setCrises([]); // Ensure crises is an empty array if no data or incorrect data is returned
        }
      })
      .catch(error => {
        console.error('Error fetching crises:', error);
        setCrises([]); // Ensure crises is set to an empty array in case of error
      });
  };

  const handleUpdateCrisis = (id) => {
    navigate(`/update-crisis/${id}`);
  };

  const handleDelete = () => {
    fetchCrises(); // Refresh the crises list after delete
  };

  return (
    <Box className="crisis-list">
      <Box className="container" p={4}>
        <Heading mb={4}>Crisis List</Heading>
        <List spacing={3}>
          {crises.length > 0 ? (
            crises.map(crisis => (
              <ListItem key={crisis._id} p={4} borderWidth={1} borderRadius="md">
                <Box>
                  <Link to={`/crises/${crisis._id}`} className="text-decoration-none crisis-title">
                    <Heading size="md">{crisis.title}</Heading>
                  </Link>
                  <Text mt={2}>
                    <strong>Description:</strong> 
                    {crisis.description.length > 20 ? `${crisis.description.slice(0, 20)}...` : crisis.description}
                  </Text>
                  <Text mt={2}><strong>Date:</strong> {new Date(crisis.date).toLocaleString()}</Text>
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button colorScheme="teal" onClick={() => handleUpdateCrisis(crisis._id)}>Edit</Button>
                    <DeleteCrisisButton crisisId={crisis._id} onDelete={handleDelete} />
                  </Box>
                </Box>
              </ListItem>
            ))
          ) : (
            <ListItem>No crises found</ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default CrisisList;
