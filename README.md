Swift Assignment - User, Post, Comment Management API
This project is a Node.js + TypeScript REST API that:

Loads data from JSON Placeholder API (users, posts, comments).

Stores them in MongoDB.

Supports CRUD operations on users.

Supports cascade delete of related posts and comments.

Setup Instructions
Clone the repository
git clone https://github.com/Prashanthnalagonda/Swift-Assignment.git
cd Swift-Assignment

Install dependencies
npm install

**Configure MongoDB**

Ensure MongoDB is running locally (mongodb://localhost:27017 by default).

Or update your MongoDB connection string in src/config/db.ts.

**Run the project in development mode**
npm start

**API will be available at**
http://localhost:3000

**API Endpoints**
| Method | Endpoint         | Description                                 |
| ------ | ---------------- | ------------------------------------------- |
| GET    | `/load`          | Loads 10 users, posts, and comments into DB |
| PUT    | `/users`         | Add a new user (checks for duplicate `id`)  |
| GET    | `/users`         | Get all users                               |
| GET    | `/users/:userId` | Get a specific user with posts and comments |
| DELETE | `/users/:userId` | Delete a user by `userId` (cascade delete)  |
| DELETE | `/users`         | Delete all users                            |

**Postman Collection**
https://web.postman.co/workspace/118013cf-797f-45b2-82bd-b7cc5d403aa2/documentation/44952353-25111fbb-627f-4cc9-901f-28158264012a

You can easily test all APIs using the shared Postman collection:

**Swift Assignment API Collection (Postman)**
https://web.postman.co/workspace/118013cf-797f-45b2-82bd-b7cc5d403aa2/documentation/44952353-25111fbb-627f-4cc9-901f-28158264012a

Open the link.

Click Fork/Run in Postman.

http://localhost:3000.

Start testing the API!


Best Practices Followed TypeScript strict mode enabled.

Centralized error handling.

Proper status codes and meaningful messages.

Request validation before DB operations.

Clean folder structure for scalability.

**Author**
Prashanth Nalagonda
https://github.com/Prashanthnalagonda/Swift-Assignment.git
