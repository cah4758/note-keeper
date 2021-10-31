const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// API ROUTES
// get "/api/notes" should read db.json and return saved notes as JSON
notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// post "/api/notes" should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (add UUID to post)
module.exports = notes;