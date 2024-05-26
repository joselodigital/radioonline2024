const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());
app.use(cors());

db.serialize(() => {
    db.run("CREATE TABLE comments (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, comment TEXT)");
});

app.post('/comments', (req, res) => {
    const { name, comment } = req.body;
    db.run("INSERT INTO comments (name, comment) VALUES (?, ?)", [name, comment], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, name, comment });
    });
});

app.get('/comments', (req, res) => {
    db.all("SELECT * FROM comments", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
