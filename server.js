const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./events.db');

// Create purchases table if it does not exist
db.run(`CREATE TABLE IF NOT EXISTS purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  eventId INTEGER,
  userEmail TEXT,
  quantity INTEGER,
  price REAL,
  date TEXT
)`);

// Create users table if it does not exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT,
  name TEXT,
  organization TEXT,
  createdAt TEXT
)`);

// Create events table if it does not exist
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

// User login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email, password);
  db.get(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) {
        // If user not found, log the correct password if exists
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
        // Generate a simple token
        const token = Buffer.from(`${user.id}:${user.email}`).toString('base64');
        res.json({ token });
      }
    }
  );
});

// Analytics endpoint
app.get('/api/analytics', async (req, res) => {
  // 1. Total revenue
  db.get('SELECT SUM(quantity * price) as totalRevenue FROM purchases', (err, revenueRow) => {
    // 2. Total tickets sold
    db.get('SELECT SUM(quantity) as ticketsSold FROM purchases', (err2, ticketsRow) => {
      // 3. Average check
      db.get('SELECT AVG(price) as averageCheck FROM purchases', (err3, avgRow) => {
        // 4. Top-5 events by sales
        db.all(`
          SELECT events.id, events.title, SUM(purchases.quantity) as sold
          FROM purchases
          JOIN events ON events.id = purchases.eventId
          GROUP BY events.id
          ORDER BY sold DESC
          LIMIT 5
        `, (err4, topEvents) => {
          // 5. Sales dynamics by date
          db.all(`
            SELECT date(date) as date, SUM(quantity) as sold
            FROM purchases
            GROUP BY date(date)
            ORDER BY date(date)
          `, (err5, salesByDate) => {
            // 6. Number of events by month
            db.all(`
              SELECT strftime('%Y-%m', createdAt) as month, COUNT(*) as count
              FROM events
              GROUP BY month
              ORDER BY month
            `, (err6, eventsByMonth) => {
              // 7. Active users in last 30 days (purchases + registrations)
              db.get(`
                SELECT COUNT(DISTINCT userEmail) as activeUsers
                FROM purchases
                WHERE date >= date('now', '-30 days')
              `, (err7, activeUsersRow) => {
                // 8. Remaining tickets for each event
                db.all(`
                  SELECT id, title, tickets as left
                  FROM events
                `, (err8, eventsLeft) => {
                  // 9. Event fill percentage
                  db.all(`
                    SELECT id, title,
                      ROUND(
                        CASE WHEN totalTickets > 0
                          THEN 100.0 * (totalTickets - tickets) / totalTickets
                          ELSE 0 END, 1
                      ) as percent
                    FROM events
                  `, (err9, eventsFill) => {
                    res.json({
                      totalRevenue: revenueRow?.totalRevenue || 0,
                      ticketsSold: ticketsRow?.ticketsSold || 0,
                      averageCheck: avgRow?.averageCheck ? Number(avgRow.averageCheck).toFixed(2) : 0,
                      topEvents: topEvents || [],
                      salesByDate: salesByDate || [],
                      eventsByMonth: eventsByMonth || [],
                      activeUsers: activeUsersRow?.activeUsers || 0,
                      eventsFill: eventsFill || [],
                      eventsLeft: eventsLeft || []
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

// Buy tickets endpoint
app.post('/api/events/:id/buy', (req, res) => {
  const { id } = req.params;
  const { quantity, userEmail, price } = req.body;
  db.get('SELECT tickets FROM events WHERE id = ?', [id], (err, event) => {
    if (err || !event) return res.status(404).json({ error: 'Event not found' });
    if (event.tickets < quantity) return res.status(400).json({ error: 'Not enough tickets' });
    db.run('UPDATE events SET tickets = tickets - ? WHERE id = ?', [quantity, id], function (err2) {
      if (err2) return res.status(500).json({ error: err2.message });
      db.run(
        'INSERT INTO purchases (eventId, userEmail, quantity, price, date) VALUES (?, ?, ?, ?, ?)',
        [id, userEmail, quantity, price, new Date().toISOString()]
      );
      res.json({ success: true });
    });
  });
});

// Create event endpoint
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

// Get all events endpoint
app.get('/api/events', (req, res) => {
  db.all('SELECT * FROM events', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// User registration endpoint
app.post('/api/register', (req, res) => {
  const { email, password, name, organization } = req.body;
  const createdAt = new Date().toISOString();
  db.run(
    'INSERT INTO users (email, password, name, organization, createdAt) VALUES (?, ?, ?, ?, ?)',
    [email, password, name, organization, createdAt],
    function (err) {
      if (err) return res.status(400).json({ error: 'User already exists' });
      res.json({ id: this.lastID, email, name, organization });
    }
  );
});

// Get current user info endpoint
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