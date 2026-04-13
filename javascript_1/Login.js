const express = require('express');
const mysql   = require('mysql2');
const bcrypt  = require('bcrypt');
const cors    = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL!');
  }
});


app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashed],
    (err) => {
      if (err) {
        res.status(400).json({ message: 'User already exists' });
      } else {
        res.json({ message: 'Account created!' });
      }
    }
  );
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (results.length === 0) {
        return res.status(401).json({ message: 'User not found' });
      }

      const match = await bcrypt.compare(password, results[0].password);

      if (match) {
        res.json({ message: 'Login successful', username: results[0].username });
      } else {
        res.status(401).json({ message: 'Wrong password' });
      }
    }
  );
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


function handleLogin() {
  const email    = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message === 'Login successful') {
      window.location.href = 'landingpage.html';
    } else {
      alert(data.message);
    }
  })
  .catch(err => {
    alert('Could not connect to server. Make sure it is running.');
  })
}