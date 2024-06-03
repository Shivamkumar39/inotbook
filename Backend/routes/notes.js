const express = require("express");
const server = express.Router();
const fetchuser = require('../middleware/fetechuser');
const Notes = require('../Schema/note');
const { body, validationResult } = require("express-validator");


// Route to fetch all notes for a user
server.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // Find notes for the user
        const notes = await Notes.find({ user: req.user.id });
        // Send notes back to the client
        res.json(notes);
    } catch (err) {
        // Log the error message and send a server error response
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route to adding new notes by a user
server.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description & must me longer then 10').isLength({ min: 10 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()

        console.log(savedNote);
        res.json(savedNote)

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});



//for updateing notes 
server.post('/updatenotes/:id', fetchuser, async (req, res) => {


    try {
        const { title, description, tag } = req.body
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const newNote = {}
        if (title) { newNote.title = title };
        if (description) {

            newNote.description = description
        }
        if (tag) { newNote.tag = tag }


        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note not found');
        }

        // Check if the user is authorized to update the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not allowed" });
        }
        // Update the note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        res.json(note)
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }

});


//for deleting existing notes login require

server.delete('/deletenotes/:id', fetchuser, async (req, res) => {


    try {
        const { title, description, tag } = req.body
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }



        //find note to be deleted notes
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Note not found');
        }

        // Check if the user is authorized to update the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not allowed" });
        }
        // Update the note
        note = await Notes.findByIdAndDelete(req.params.id);

        res.json({ "success": " notes is deleted" })

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = server;
