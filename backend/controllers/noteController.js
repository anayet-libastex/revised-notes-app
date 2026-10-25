import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ createdBy: req.user._id });
        res.json(notes);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" })
    }
}


// Create Note
export const createNote = async (req, res) => {
    const { title, description } = req.body;
    try {
        if (!title || !description) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const note = await Note.create({
            title,
            description,
            createdBy: req.user._id
        });
        res.status(201).json(note);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" });
    }
}

// Get a note
export const getById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" })
        }
        res.status(200).json(note);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" })
    }
}

// Update a note
export const updateNote = async (req, res) => {
    const { title, description } = req.body;
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" })
        }
        if (note.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" })
        }
        note.title = title || note.title;
        note.description = description || note.description;
        const updatedCode = await note.save();
        res.status(200).json(updatedCode)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: "Server error" })
    }
}

// Delete a note
export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" })
        }
        if (note.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" })
        }
        await note.deleteOne();
        res.status(200).json({message: "Note was deleted successfully"})
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" })
    }
}