
// Import required modules
const express = require('express');
const mysql = require('mysql');

// Create Express application
const app = express();
const port = 3000;

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'library_db'
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the Library Management System!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${5500}`);
});
