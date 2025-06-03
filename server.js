const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./events.db');


// Создание таблицы пользователей, если не существует
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT,
  name TEXT,
  organization TEXT
)`);


db.run(`CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  date TEXT,
  description TEXT,
  imageUrl TEXT,
  tickets INTEGER DEFAULT 0,
  totalTickets INTEGER DEFAULT 0,
  price REAL DEFAULT 0,
  createdAt TEXT
)`);

// Вход в систему
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email, password);
  db.get(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) {
        // Найти пользователя по email и вывести его пароль
        db.get('SELECT password FROM users WHERE email = ?', [email], (err2, row) => {
          if (row) {
            console.log(`Correct password for ${email}: ${row.password}`);
          } else {
            console.log(`No user found with email: ${email}`);
          }
          console.log('Login failed for:', email);
          return res.status(401).json({ error: 'Invalid credentials' });
        });
      } else {
        const token = Buffer.from(`${user.id}:${user.email}`).toString('base64');
        res.json({ token });
      }
    }
  );
});




app.post('/api/events/:id/buy', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  db.get('SELECT tickets FROM events WHERE id = ?', [id], (err, event) => {
    if (err || !event) return res.status(404).json({ error: 'Event not found' });
    if (event.tickets < quantity) return res.status(400).json({ error: 'Not enough tickets' });
    db.run('UPDATE events SET tickets = tickets - ? WHERE id = ?', [quantity, id], function (err2) {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ success: true });
    });
  });
});

app.post('/api/events', (req, res) => {
  const { title, date, description, imageUrl, tickets, totalTickets, price } = req.body;
  const createdAt = new Date().toISOString();
  db.run(
    'INSERT INTO events (title, date, description, imageUrl, tickets, totalTickets, price, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [title, date, description, imageUrl, tickets, totalTickets, price, createdAt],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, title, date, description, imageUrl, tickets, totalTickets, price, createdAt });
    }
  );
});

// Добавьте этот обработчик для получения всех событий:
app.get('/api/events', (req, res) => {
  db.all('SELECT * FROM events', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/register', (req, res) => {
  const { email, password, name, organization } = req.body;
  db.run(
    'INSERT INTO users (email, password, name, organization) VALUES (?, ?, ?, ?)',
    [email, password, name, organization],
    function (err) {
      if (err) return res.status(400).json({ error: 'User already exists' });
      res.json({ id: this.lastID, email, name, organization });
    }
  );
});

app.get('/api/me', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = Buffer.from(auth, 'base64').toString();
    const [id, email] = decoded.split(':');
    db.get('SELECT email, name, organization FROM users WHERE id = ?', [id], (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    });
  } catch {
    res.status(400).json({ error: 'Invalid token' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

