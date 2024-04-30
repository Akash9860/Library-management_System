const http = require('http');
const mysql = require('mysql');

const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'library_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/books') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      const { title, author, ISBN } = JSON.parse(data);

      const insertQuery = `INSERT INTO books (title, author, ISBN) VALUES (?, ?, ?)`;
      db.query(insertQuery, [title, author, ISBN], (err, result) => {
        if (err) {
          console.error('Error inserting new book:', err);
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Error inserting new book');
          return;
        }
        console.log('New book added to the database');
        res.writeHead(201, {'Content-Type': 'text/plain'});
        res.end('New book added successfully');
      });
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
