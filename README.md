# Customer Information Query Screen

This project is a web application designed for querying, updating, and managing customer information. Users can save customer details, manage their active/passive status, and search among registered customers. The project uses **React** for the frontend, **Express.js** for the backend, and **PostgreSQL** as the database.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Features](#features)
3. [Installation and Setup](#installation-and-setup)
4. [Usage](#usage)
5. [Directory Structure](#directory-structure)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)
8. [Contributing](#contributing)
9. [License](#license)

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js with Express.js
- **Database:** PostgreSQL
- **Other Libraries:** Axios, Material-UI, etc.

## Features

- **Customer Registration:** Save new customer details, including TCKN, name, date of birth, contact information, and more.
- **Status Management:** Mark customers as active or passive, and filter them accordingly.
- **Search Functionality:** Search customers by TCKN and view their stored details.
- **Update Functionality:** Reactivate passive customers and update their status.
- **Responsive Design:** User interface adapts to different screen sizes.

## Installation and Setup

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine
- PostgreSQL installed and running

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/your-repository.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd your-repository
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Set up the database:**

   - Create a PostgreSQL database.
   - Run the SQL scripts to create necessary tables (e.g., `mvt_musteri`).

5. **Configure environment variables:**

   Create a `.env` file in the root directory with the following content:

   ```bash
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_NAME=your_database_name
   ```

6. **Run the application:**
   ```bash
   npm start
   ```

## Usage

Once the server is running, you can access the application in your browser at `http://localhost:3000`. The Customer Information Query Screen will allow you to:

- Search for customers using their TCKN.
- View, activate, or deactivate customer records.
- Filter customers by their active or passive status.

## Directory Structure

```
/project-root
│
├── /backend
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   └── /database
│
├── /frontend
│   ├── /src
│   │   ├── /components
│   │   ├── /screens
│   │   ├── /services
│   │   └── App.js
│   └── /public
│
└── .env
```

## API Endpoints

- **GET /customers:** Fetch all customers (active or passive).
- **GET /customers/:tckn:** Fetch a specific customer by TCKN.
- **PUT /customers/:tckn:** Update the status of a customer (active/passive).
- **POST /customers:** Add a new customer.

## Database Schema

The primary table in the PostgreSQL database is `mvt_musteri`, which stores customer details. Key columns include:

- **tckn (Primary Key)**
- **first_name**
- **last_name**
- **dob (Date of Birth)**
- **status (Active/Passive)**

By default, new customers are added with an active status.

## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License.

---

This README file provides a comprehensive overview of the project, including its features, setup instructions, and key technical details. You can further customize it as needed to match your specific project structure and requirements.
