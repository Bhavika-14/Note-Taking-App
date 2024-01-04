const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.post(
  '/notes',
  [
    body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
    body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
  ],
  noteController.createNote
);

router.put(
  '/notes/:id',
  [
    body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
  ],
  noteController.updateNote
);

router.get('/notes', noteController.retrieveNotes);
router.get('/notes/:id', noteController.retrieveNoteById);
router.delete('/notes/:id', noteController.deleteNote);

module.exports = router;
