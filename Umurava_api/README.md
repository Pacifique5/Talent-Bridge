# Challenge Management API

## 📌 Overview
The **Challenge Management API** is a RESTful API built with Node.js and Express for managing coding challenges. It provides CRUD operations for creating, retrieving, updating, and deleting challenges.

## 🚀 Features
- ✅ Create, read, update, and delete challenges
- ✅ Input validation using `express-validator`
- ✅ Middleware-based request validation
- ✅ PostgreSQL database integration
- ✅ Modular architecture for scalability

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Validation:** `express-validator`
- **Middleware:** Custom validation middleware

## 📂 Folder Structure
📦 UmuravaAPIs ┣ 📂 controllers ┃ ┗ 📜 challengeController.js ┣ 📂 routes ┃ ┗ 📜 challengeRoute.js ┣ 📂 validations ┃ ┗ 📜 challengeValidationRules.js ┣ 📂 middleware ┃ ┗ 📜 validateMiddleware.js ┣ 📜 app.js ┣ 📜 server.js ┗ 📜 README.md


## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/your-repo/challenge-management-api.git
cd challenge-management-api
2️⃣ Install Dependencies
npm install
3️⃣ Set Up Environment Variables
Create a .env file and configure your PostgreSQL database:
DATABASE_URL=your_postgresql_connection_string
PORT=5000
4️⃣ Run the Server

npm run dev  # Runs with nodemon
📌 API Endpoints
🚀 Challenges
Method	Endpoint	Description
GET	/api/challenges	Get all challenges
GET	/api/challenges/:id	Get a single challenge
POST	/api/challenges	Create a new challenge
PUT	/api/challenges/:id	Update an existing challenge
DELETE	/api/challenges/:id	Delete a challenge
🛠️ Validation Rules
Title: Required, string (3-100 chars)
Description: Required, string (10-500 chars)
Difficulty: Must be one of easy, medium, hard
Duration: Required, positive integer
📌 License
This project is licensed under the MIT License.
