import { useEffect, useState } from "react";
import CreateNoteModal from "./CreateNoteModal.jsx";
import Note from "./Note.jsx";
import addIcon from '/images/add-icon.svg';

export default function NotesSection() {
    const [notes, setNotes] = useState([]);
    const [isModalOn, setIsModalOn] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    function handleAddNote(e) {
        e.preventDefault();
        setIsModalOn(true);
        setEditingNote(null);
    }

    const noteItems = notes.map(note => {
        return (
            <Note key={note.id} 
                title={note.title} 
                text={note.text} 
                id={note.id} 
                notes={notes} 
                setNotes={setNotes}
                isModalOn={isModalOn} 
                setIsModalOn={setIsModalOn}
                note={note}
                setEditingNote={setEditingNote} />
        )
    })
    return (
        <section className="notes-section" onSubmit={handleAddNote}>
            <form className="notes-form">
                <h1>Notes</h1>
                <button type="submit">
                    <img src={addIcon} alt="" />
                </button>
            </form>
            {isModalOn && <div className="backdrop"></div>}
            {isModalOn && <CreateNoteModal isModalOn={isModalOn} 
                                        setIsModalOn={setIsModalOn} 
                                        notes={notes} 
                                        setNotes={setNotes}
                                        editingNote={editingNote}
                                        setEditingNote={setEditingNote} />}

            <div className={notes.length === 0 ? "notes-container empty" : "notes-container"}>
                {notes.length === 0 && <p>your notes will appear here</p>}
                {noteItems}
            </div>
        </section>
    )
}