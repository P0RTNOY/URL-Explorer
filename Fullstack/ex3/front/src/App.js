//App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChakraProvider, Box, Button } from '@chakra-ui/react'; 
import CrisisList from './components/crisisList';
import CrisisDetails from './components/crisisDetails';
import AddCrisisForm from './components/addCrisisForm';
import UpdateCrisisForm from './components/updateCrisisForm';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Box className="app-container" p={4}>
          <Box as="nav" mb={4} p={4} bg="gray.100" borderRadius="md">
            <Button as={Link} to="/" colorScheme="teal" mr={4}>Home</Button>
            <Button as={Link} to="/add-crisis" colorScheme="blue">Add Crisis</Button>
          </Box>
          <Box className="main-content" p={4}>
            <Routes>
              <Route path="/" element={<CrisisList />} />
              <Route path="/crises/:id" element={<CrisisDetails />} />
              <Route path="/add-crisis" element={<AddCrisisForm />} />
              <Route path="/update-crisis/:id" element={<UpdateCrisisForm />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
