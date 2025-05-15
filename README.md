Swift Backend Assignment (Node.js + TypeScript + MongoDB)
This project is a simple REST API server built with Node.js, TypeScript, and MongoDB. It allows basic CRUD operations for Users, Posts, and Comments data. The data is fetched from the JSON Placeholder API and stored in local MongoDB.

Features
Load 10 users, their posts, and comments from JSON Placeholder and store them in MongoDB.

CRUD operations for users.

Users' posts and comments included in user retrieval.

Type-safe development using TypeScript.

Follows RESTful API standards with proper error handling.

Technologies Used
Node.js (with Express.js)

TypeScript

MongoDB (native driver)

Axios (for fetching data)

Morgan (for logging)

Nodemon (for development)

ESLint (optional for code quality)

Useful Commands
| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Run the server with Nodemon    |
| `npm run build` | Build the project (TypeScript) |
| `npm start`     | Start the built project        |


API Endpoints
| Method | Endpoint         | Description                                 |
| ------ | ---------------- | ------------------------------------------- |
| GET    | `/load`          | Loads users, posts, and comments into DB    |
| DELETE | `/users`         | Deletes all users                           |
| DELETE | `/users/:userId` | Deletes a specific user by ID               |
| GET    | `/users/:userId` | Gets a user along with their posts/comments |
| PUT    | `/users`         | Adds a new user                             |


*Best Practices Followed
TypeScript strict mode enabled.

Centralized error handling.

Proper status codes and meaningful messages.

Request validation before DB operations.

Clean folder structure for scalability.

Author
Prashanth Nalagonda
