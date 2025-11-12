import Note from '../../model/Note.js';

// Get all notes

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error in getAllNotes controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Get note by ID
export async function getNoteById(req, res) {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error('Error in getNoteById controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
} 
  
  
// Create a note
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error in createNote controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update a note
export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if(!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('Error in updateNote controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete a note
export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error in deleteNote controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
