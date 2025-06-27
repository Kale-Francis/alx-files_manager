ALX Files Manager
Overview
This project is a Node.js-based file management system built as part of the ALX back-end curriculum. It provides a RESTful API for user authentication, file uploading, file permission management, and image thumbnail generation. The system uses Express for the API, MongoDB for persistent storage, Redis for temporary data, and Bull for background processing.
Team

Kale Francis

Technologies

Node.js: JavaScript runtime for the server.
Express.js: Web framework for building the API.
MongoDB: NoSQL database for storing users and files.
Redis: In-memory data store for authentication tokens.
Bull: Queue system for background tasks (e.g., thumbnail generation, welcome emails).
ES6: Modern JavaScript syntax with Babel for transpilation.
Mocha/Chai: Testing framework for unit tests.

Learning Objectives
By completing this project, you will understand:

How to create an API with Express.
User authentication using tokens.
Data storage in MongoDB.
Temporary data storage in Redis.
Background processing with Bull.

Requirements

OS: Ubuntu 18.04 LTS
Node.js: Version 12.x.x
Editors: vi, vim, emacs, Visual Studio Code
Dependencies: Listed in package.json
Linting: ESLint
Files: All files must end with a new line and use the .js extension.

Setup

Clone the Repository:
git clone https://github.com/your-username/alx-files_manager.git
cd alx-files_manager


Install Dependencies:
npm install


Set Up Environment Variables: Create a .env file in the project root with the following:
PORT=5000
DB_HOST=localhost
DB_PORT=27017
DB_DATABASE=files_manager
FOLDER_PATH=/tmp/files_manager


Start MongoDB and Redis: Ensure MongoDB and Redis servers are running:
sudo service mongod start
sudo service redis-server start


Run the Application:

Start the server:
npm run start-server


Start the worker (for background tasks):
npm run start-worker




Run Tests:
npm test



API Endpoints



Method
Endpoint
Description



GET
/status
Check Redis and MongoDB status


GET
/stats
Get count of users and files


POST
/users
Create a new user


GET
/connect
Authenticate user and generate token


GET
/disconnect
Sign out user by deleting token


GET
/users/me
Retrieve authenticated user's details


POST
/files
Upload a file or create a folder


GET
/files/:id
Retrieve a file by ID


GET
/files
List files with pagination


PUT
/files/:id/publish
Make a file public


PUT
/files/:id/unpublish
Make a file private


GET
/files/:id/data
Retrieve file content (or thumbnail)


Authentication

Connect: Use Basic Auth with Authorization: Basic <Base64(email:password)>.
Token: Use X-Token header for authenticated requests.

File Storage

Files are stored locally in FOLDER_PATH (default: /tmp/files_manager).
Images trigger background thumbnail generation (sizes: 100, 250, 500).

Testing

Tests are located in the tests/ directory.

Run tests using:
npm test


Tests cover Redis, MongoDB, and all API endpoints.


Background Processing

File Queue: Generates thumbnails for images.
User Queue: Logs a welcome message for new users (simulating email sending).

Project Timeline

Start: June 19, 2025, 6:00 AM
End: June 26, 2025, 6:00 AM
Checker Release: June 21, 2025, 12:00 AM
Review: Request a manual QA review upon completion.

Usage Example

Create a User:
curl -XPOST 0.0.0.0:5000/users -H "Content-Type: application/json" -d '{"email": "bob@dylan.com", "password": "toto1234!"}'


Authenticate:
curl 0.0.0.0:5000/connect -H "Authorization: Basic Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE="


Upload a File:
curl -XPOST 0.0.0.0:5000/files -H "X-Token: <token>" -H "Content-Type: application/json" -d '{"name": "myText.txt", "type": "file", "data": "SGVsbG8gV2Vic3RhY2shCg=="}'


Retrieve File Content:
curl -XGET 0.0.0.0:5000/files/<file_id>/data -H "X-Token: <token>"



Notes

Ensure MongoDB and Redis are running before starting the server or worker.
Use nodemon for development: npm run dev.
The project is designed for learning purposes, simulating a file management platform.

Repository

GitHub: alx-files_manager

Enjoy building and exploring the ALX Files Manager!
