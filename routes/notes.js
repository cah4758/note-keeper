const notes = require('express').Router();
const path = require('path');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// API ROUTES
// get "/api/notes/" should read db.json and return saved notes as JSON
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// post "/api/notes/" should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. Add UUID to post
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };

      readAndAppend(newNote, './db/db.json');
      res.json(`Note has been added! Way to keep track of stuff!`);

      res.sendFile(path.join(__dirname, '../public/notes.html'));
    } else {
      res.error('Error in adding note. Figure it out!');
    }
  });

module.exports = notes;