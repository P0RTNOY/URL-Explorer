Project: URL Explorer

Description:
The URL Explorer project is designed to fetch, parse, and store HTML content and URL links from a given URL.
It provides an API to accept incoming URLs, trigger the fetching, parsing, and storage process, and retrieve stored URLs along with their associated raw HTML content. The system also supports recursive link extraction to traverse and explore sub-URL links.

Components:
1. router.js: Defines API endpoints for URL handling.
2. recursive_ctrl.js: Implements recursive URL crawling functionality.
3. repository.js: Handles data storage by interacting with the database.
4. url.js: Defines the database schema for storing URLs and their corresponding HTML content.

Dependencies:
- axios: For making HTTP requests to fetch HTML content.
- mongoose: For interacting with MongoDB database.
- xmldom: For parsing HTML content.
- jest: For testing.

Usage:
1. Start the MongoDB server using 'node index.js'
2. Configure environment variables in a .env file, including database connection details.
3. Run the application using `npm start`.
4. Use the provided API endpoints to interact with the system.

Testing:
1. Unit tests are provided for the controller functions in the controller.test.js file.
2. Run tests using `npx jest`.


Error Handling and Logging:
- Error handling mechanisms are implemented to handle cases of invalid URLs, network errors, and other exceptions during the fetching and parsing process.
- Logging functionality captures relevant events and errors for debugging and monitoring purposes.



