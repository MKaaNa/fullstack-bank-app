# Customer Management System

This project is a Customer Management System built with a React frontend, an Express.js backend, and PostgreSQL for the database. The system supports customer registration, querying, status management (active/passive), and more. 

## Table of Contents
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Frontend Components](#frontend-components)
- [License](#license)

## Project Structure

```
/project-root
│
├── backend (server)
│   ├── db
│   │   └── connect.js
│   ├── middleware
│   │   └── auth.js
│   ├── node_modules
│   ├── routes
│   │   ├── account.js
│   │   ├── auth.js
│   │   ├── customer.js
│   │   ├── customerController.js
│   │   ├── newCustomer.js
│   │   ├── profile.js
│   │   └── transactions.js
│   ├── utils
│   │   ├── api.js
│   │   └── common.js
│   ├── .env
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   ├── scripts.sql
│   └── yarn.lock
│
├── frontend (src)
│   ├── actions
│   │   ├── auth.js
│   │   ├── errors.js
│   │   ├── profile.js
│   │   └── transactions.js
│   ├── components
│   │   ├── AccountOperations.js
│   │   ├── CustomerInfo.js
│   │   ├── Dashboard.css
│   │   ├── Dashboard.js
│   │   ├── Header.js
│   │   ├── Login.css
│   │   ├── Login.js
│   │   ├── Logout.js
│   │   ├── NewCustomer.js
│   │   └── Profile.js
│   ├── CSS
│   │   └── main.scss
│   ├── reducers
│   │   ├── account.js
│   │   ├── auth.js
│   │   ├── errors.js
│   │   ├── profile.js
│   │   └── transactions.js
│   ├── router
│   │   └── AppRouter.js
│   ├── store
│   │   └── store.js
│   ├── utils
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── webpack.config.js
│   └── yarn.lock
```

## Installation

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   yarn install
   ```
3. Set up the PostgreSQL database using the provided `scripts.sql` file.

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   yarn install
   ```

## Configuration

### Backend
- Create a `.env` file in the `backend` directory with the following variables:
  ```
  PORT=5000
  DATABASE_URL=your_postgres_connection_string
  JWT_SECRET=your_jwt_secret
  ```

### Frontend
- Create a `.env` file in the `frontend` directory with the following variables:
  ```
  REACT_APP_API_URL=http://localhost:5000/api
  ```

## Running the Application

### Backend
Start the Express server:
```bash
yarn start
```

### Frontend
Start the React development server:
```bash
yarn start
```

## Usage

- **New Customer Registration**: Navigate to the `NewCustomer` screen to register new customers.
- **Customer Information Query**: Use the `CustomerInfo` screen to query customers by TCKN and manage their status.
- **User Management**: Use the dashboard to perform actions like updating, activating, or deactivating users.

## Features

- **Customer Registration**: Validate and store customer details, including TCKN, name, date of birth, and more.
- **Status Management**: Activate or deactivate users instead of deleting them from the database.
- **User Authentication**: Secure login with JWT.
- **Filtering**: Filter users based on active or passive status.

## API Endpoints

- **POST /api/auth/login**: User login.
- **POST /api/customers**: Register a new customer.
- **GET /api/customers**: Query customers by TCKN.
- **PATCH /api/customers/:id/status**: Update customer status.

## Frontend Components

- **Dashboard.js**: The main dashboard where users can manage customers.
- **CustomerInfo.js**: Component for querying and displaying customer information.
- **NewCustomer.js**: Component for registering new customers.
- **Login.js**: Component for user login.

## License

This project is licensed under the MIT License.

---
