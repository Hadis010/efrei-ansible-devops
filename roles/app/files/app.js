const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'todos_user',
  password: process.env.DB_PASSWORD || 'todos_pass',
  database: process.env.DB_NAME || 'todos_db'
});

db.connect(err => {
  if (err) { console.error('DB connection failed:', err); return; }
  console.log('Connected to MySQL');
  db.query('CREATE TABLE IF NOT EXISTS todos (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, done BOOLEAN DEFAULT false)');
});

app.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/todos', (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO todos (title) VALUES (?)', [title], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, title, done: false });
  });
});

app.put('/todos/:id', (req, res) => {
  const { done } = req.body;
  db.query('UPDATE todos SET done = ? WHERE id = ?', [done, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Updated' });
  });
});

app.delete('/todos/:id', (req, res) => {
  db.query('DELETE FROM todos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted' });
  });
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log('Todos API running on port ' + PORT));
