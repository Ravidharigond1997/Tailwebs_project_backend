📚 Assignment Management Backend

This is a Node.js + Express + MongoDB backend for an Assignment Management System with role-based authentication for Teachers and Students.

🚀 Features
🔑 Authentication

Single login page for both roles (Teacher & Student).

JWT-based authentication.

Passwords hashed with bcrypt.

👩‍🏫 Teacher Features

Create, update, and delete assignments.

Manage assignment lifecycle:

Draft → Published → Completed

View all student submissions.

Filter assignments by status.

Pagination for assignment listing.

👨‍🎓 Student Features

View only Published assignments.

Submit one answer per assignment.

View submitted answers.

Cannot edit submissions once sent.

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Auth: JWT, bcrypt

Validation: Joi

Middleware: Express error handling

📂 Project Structure
backend/
├── config/
│   └── dbConnect.js        # MongoDB connection
├── controllers/
│   ├── userController.js   # Auth (register/login)
│   └── assignmentController.js
├── middleware/
│   ├── auth.js             # JWT auth middleware
├── models/
│   ├── User.js
│   └── Assignment.js
├── routers/
│   ├── userRouter.js
│   └── assignmentRouter.js
├── .env
├── .gitignore
├── package.json
└── server.js

⚙️ Installation & Setup

Clone the repo

git clone 
cd assignment-backend


Install dependencies

npm install


Setup environment variables
Create a .env file in the root:

PORT=5000
MONGO_URI=mongodb+srv://tailwebs:tailwebs1234@tailwebs.x5tgrsm.mongodb.net/
JWT_SECRET=123456


Run the server

npm run dev   # with nodemon
# or
npm start


Server runs on:
👉 http://localhost:3000

📬 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/user/register	Register teacher or student
POST	/user/login	Login and get JWT
Assignment Routes
Method	Endpoint	Role	Description
POST	/assignment	Teacher	Create assignment
PUT	/assignment/:id	Teacher	Update status/details
GET	/assignment	Both	List assignments (with filter + pagination)
PUT	/assignment/:id/submit	Student	Submit assignment answer
