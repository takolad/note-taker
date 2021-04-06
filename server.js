// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Routes

// Basic routes
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req,res) => res.json(path.join(__dirname, './db/db.json')));

app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    newNote.routeName = newNote.title.replace(/\s+/g, '').toLowerCase();
    console.log(newNote);

    // write newNote to db.json
    fs.appendFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(newNote));
    // res with newNote
    res.json(newNote);
})




// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
