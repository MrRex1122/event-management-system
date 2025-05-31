const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./events.db');

// Создание таблицы, если не существует
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT
)`);

// Регистрация
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  db.run(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password],
    function (err) {
      if (err) return res.status(400).json({ error: 'User already exists' });
      res.json({ id: this.lastID, email });
    }
  );
});

// Вход
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      // Простой токен (для демо)
      const token = Buffer.from(`${user.id}:${user.email}`).toString('base64');
      res.json({ token });
    }
  );
});
app.listen(5000, () => console.log('Server started on port 5000'));

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email, password); // добавьте эту строку
  db.get(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) {
        console.log('Login failed for:', email); // добавьте эту строку
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = Buffer.from(`${user.id}:${user.email}`).toString('base64');
      res.json({ token });
    }
  );
});