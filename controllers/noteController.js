const { validationResult } = require("express-validator");
const Note = require("../models/noteModel");

exports.createNote = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.retrieveNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.retrieveNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).exec();
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    console.error("Error retrieving note by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
