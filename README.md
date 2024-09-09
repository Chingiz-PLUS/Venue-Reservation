## Features

- **User Authentication**: Registration and login with JWT-based authentication.
- **Venue Management**: Admins can create, update, delete venues and all users can view venues.
- **Reservation Management**: Users can create, view, and delete reservations. Admins have full control over all reservations.

## Technologies Used

- **Node.js**: Backend runtime.
- **Express.js**: Web framework for building the API.
- **Mongoose**: MongoDB object modeling for data management.
- **JWT**: JSON Web Tokens for authentication.

## Project Setup

Follow these steps to set up the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/Chingiz-PLUS/Venue-Reservation
    ```

2. Navigate to the project directory:
    ```bash
    cd Venue-Reservation
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and follow variables from .env.example.js file:


5. Start the application:
    ```bash
    npm start
    ```

6. Start the application in development mode:
    ```bash
    npm run dev
    ```

7. Start the application on the docker and start using Redis:
    ```bash
    docker-compose build
    docker-compose up -d
    ```
   

## API Endpoints

For API endpoints please import openApi.json to Postman



