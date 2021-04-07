// Dependencies
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Unsure if this is necessary //
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

// Basic routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('/api/notes', (req,res) => res.json(path.join(__dirname, 'db/db.json')));

// this worked, did I have to do this?
app.get('/assets/css/styles.css', (req, res) => res.sendFile(path.join(__dirname, 'public/assets/css/styles.css')));
app.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, 'public/assets/js/index.js')));


app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    newNote.id = uuidv4();
    console.log(newNote);

    // read json file and set to array
    fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf-8', (err, data) => {
        const noteArray = JSON.parse(data);
    })
    // push new entry into array
    noteArray.push(newNote);

    // write array back to json file
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(noteArray));
    // res with newNote
    res.json(newNote);
})




// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
