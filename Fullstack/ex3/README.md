# Assignment 3: Assignment 3: React-Enhanced Crisis Management System

This project is a comprehensive crisis management system developed with Node.js for the backend and React with Chakra UI and MUI for the frontend.
The application provides functionalities for managing crisis data, including creating, reading, updating, and deleting crisis records.

## Project Overview

This application consists of a backend server built with Node.js and a frontend application developed with React. It provides a web interface for users to manage crisis records, including features for viewing details, adding new records, updating existing ones, and deleting records.

## Technologies Used

- **Backend**:
  - **Node.js**: JavaScript runtime for server-side operations.
  - **Express.js**: Web framework for Node.js.
  - **MongoDB**: NoSQL database for storing crisis records.
  - **Mongoose**: ODM library for MongoDB.
  - **Jest**: Testing framework for backend unit tests.
- **Netlify**: Deployment platform for the React frontend application.

- **Frontend**:
  - **React**: JavaScript library for building user interfaces.
  - **Chakra UI**: React component library for accessible and reusable components.
  - **MUI (Material-UI)**: React component library for a rich set of components.
  - **React Router**: Declarative routing for React applications.
  - **Tailwind CSS**: Utility-first CSS framework for styling.


## Installation

To get started with the project, follow these steps:

### Frontend 

    **Clone the Repository**

    ```bash
    git clone https://github.com/P0RTNOY/ex3.git
    cd ex3
    cd crisis-management-app
    npm install

## API Endpoints
    GET	https://leafy-chaja-d4f8f6.netlify.app/.netlify/functions/api/crises	        Fetches a list of all crises.
    POST	https://leafy-chaja-d4f8f6.netlify.app/.netlify/functions/api/crises/new	Adds a new crisis.
    PUT	https://leafy-chaja-d4f8f6.netlify.app/.netlify/functions/api/crises/:id	    Updates an existing crisis.
    DELETE	https://leafy-chaja-d4f8f6.netlify.app/.netlify/functions/api/crises/:id	Deletes a crisis.


## Running the Application
make sure you are in ex3/crisis-management-app
run 'npm start'


## Enhancements and Challenges
1.  API Deployment, Deployed backend to Netlify, Configured CORS policies, tested endpoints with Postman.
2.  Page Refresh After Deletion, Refreshing the list view on deletion, Updated component to use useNavigate for page refresh.
3.  UI/UX Improvements, Integration of new UI libraries, Used Chakra UI layout system and Tailwind CSS for styling.