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

const notes = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf-8');
app.get('/api/notes', (req,res) => res.end(notes));

// this worked, did I have to do this?
app.get('/assets/css/styles.css', (req, res) => res.sendFile(path.join(__dirname, 'public/assets/css/styles.css')));
app.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, 'public/assets/js/index.js')));


app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
 
    // write array back to json file
    fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
        if (err) throw err;
        const noteArray = JSON.parse(data);

        noteArray.push(newNote);
        fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(noteArray));
    });

    // res with newNote
    res.send(newNote);
})




// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
