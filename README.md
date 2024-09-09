Venue Reservation System
Overview
This project is a Venue Reservation System built using Node.js, Express.js, and MongoDB. It provides functionality for users to make reservations for various venues, and for admins to manage venues and reservations. The system includes authentication, role-based access control, and various endpoints for managing reservations and venues.

Features
Authentication: User registration and login with JWT-based authentication.
Venue Management: Admins can create, update, and delete venues.
Reservation Management: Users can create, view, and delete reservations. Admins can view and delete any reservation.
Pagination and Filtering: Pagination and location-based filtering for viewing venues.
Getting Started
Prerequisites
Node.js
MongoDB
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/yourusername/venue-reservation-system.git
cd venue-reservation-system
Install Dependencies

bash
Copy code
npm install
Set Up Environment Variables

Create a .env file in the root directory and add the following environment variables:

env
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the Application

bash
Copy code
npm start
The application will run on http://localhost:3000 by default.

API Documentation
Authentication
Register: POST /api/auth/register
Login: POST /api/auth/login
Venue Management
Create Venue: POST /api/venues
Get All Venues: GET /api/venues
Query Parameters: page, limit, location
Get Venue by ID: GET /api/venues/:id
Update Venue: PUT /api/venues/:id
Delete Venue: DELETE /api/venues/:id
Reservation Management
Create Reservation: POST /api/reservations
Get Reservations: GET /api/reservations/:id
Get User Reservations: GET /api/reservations/user/:userId
Delete Reservation: DELETE /api/reservations/:id
Error Handling
AppError: General application errors, such as conflicts or validation errors.
NotFoundError: When a resource is not found.
ForbiddenError: When access to a resource is denied.
Contributing
If you would like to contribute to this project, please fork the repository and create a pull request with your proposed changes. Make sure to follow the coding standards and include tests for new features.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any questions or feedback, please reach out to your-email@example.com.