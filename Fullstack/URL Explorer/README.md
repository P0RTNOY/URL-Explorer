Assignment 4: URL Explorer

Overview
Assignment 4: URL Explorer is a web application that allows users to save a URL and fetch all the links from that URL.


This project consists of two main components:

Backend: A Node.js and Express server that handles URL storage, link extraction, and data retrieval from MongoDB.
Frontend: A React application that interacts with the backend to save URLs, display extracted links, and manage the data.

Features
Save a URL and fetch all links from that URL.
Display all fetched links on the web page.
Delete all stored URLs from the database.


Getting Started
Prerequisites
Node.js and npm (Node Package Manager)
MongoDB (or a MongoDB cloud service)

Installation
Clone the repository:

bash
Copy code
git clone https://https://github.com/P0RTNOY/URL-Explorer.git
cd Url-Explorer
Install dependencies for the backend:

Navigate to the back directory and run:
bash
Copy code
cd back
npm install

Install dependencies for the frontend:

Navigate to the client directory and run:
bash
Copy code
cd client
npm install
Configuration
Set up environment variables:

Create a .env file in the back directory with the following content:
USERNAME=omerportnoy
PASSWORD=oeFY7KjbCV5cRhAd
CLUSTER=URLExplorer
PORT=8080



Running the Application
Start the backend server:

Navigate to the back directory and run:

bash
Copy code
node index.js


Start the frontend application:

Navigate to the client directory and run:

bash
Copy code
npm start
This will open the React application in your default web browser.

Usage
Saving a URL:
Enter a URL into the input field and click "Run" to fetch links from the URL and display them on the page.

Deleting All URLs:
Click the "Delete All" button to remove all stored URLs from the database.

Testing
Backend Tests:

Run the following command from the back directory:

bash
cd back
npm test

Frontend Tests:(doesnt work)

Run the following command from the client directory:

bash
cd client
npm test

API Endpoints
POST /urls: Save a new URL and fetch its links.

GET /urls: Get all stored URLs.

DELETE /urls: Delete all stored URLs.


Technologies Used
Backend: Node.js, Express, MongoDB
Frontend: React, Axios, Jest, React Testing Library
Libraries: jest-fetch-mock, identity-obj-proxy, fetch-mock