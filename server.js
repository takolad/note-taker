// Dependencies
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// Gets all the notes
app.get('/api/notes', (req,res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, './db/db.json'));
        res.end(data);
    } catch (err) {
        throw err;
    }
});

// asset routes
app.get('/assets/css/styles.css', (req, res) => res.sendFile(path.join(__dirname, 'public/assets/css/styles.css')));
app.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, 'public/assets/js/index.js')));

// POST new note
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
 
    // write array back to json file
    fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
        if (err) throw err;

        const noteArray = JSON.parse(data);
        noteArray.push(newNote);
        
        fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(noteArray, null, '\t'));
    });

    // res with newNote
    res.send(newNote);
})

// delete note with matching id
app.delete('/api/notes/:id', (req, res) => {
    const chosen = req.params.id;

    fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
        if (err) throw err;

        const noteArray = JSON.parse(data);
        const newArray = noteArray.filter(note => note.id !== chosen);

        fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(newArray, null, '\t'));
        res.send("DELETE Request Called");
    });
})

// any route not matching one of the previously mentioned will go to index page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
