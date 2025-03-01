import { useEffect, useRef, useState } from "react";

let noteCounter = 0;

export default function CreateNoteModal(props) {
    const [title, setTitle] = useState(props.editingNote ? props.editingNote.title : '');
    const [text, setText] = useState(props.editingNote ? props.editingNote.text : '');


    useEffect(() => {
        if (props.editingNote) {
            setText(props.editingNote.text);
            setTitle(props.editingNote.title); 
        }

    }, [props.editingNote])

    function closeModal() {
        props.setIsModalOn(false);
    }

    function saveNote(note) {
        if (note && note.id) {
            props.setNotes(prevNotes => prevNotes.map(prevNote => prevNote.id === note.id ? {title: title, text: text, id: note.id} : prevNote));
            console.log(note);
        } else {
            noteCounter++;
            const noteId = 'note-' + noteCounter;
            
            props.setNotes(prevNotes => {
                return [...prevNotes, {title: title, text: text, id: noteId}]
            })
        }

        setTitle('');
        setText('');
        props.setIsModalOn(false);
    }

    return (
        <div className="create-note-modal">
            <label htmlFor="note-title">
                <input type="text" name="noteTitle" id="note-title" placeholder="enter note's title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>

            <label htmlFor="note-text">
                <textarea type="text" name="noteText" id="note-text" placeholder="add text here" value={text} rows={10} onChange={(e) => setText(e.target.value)}/>
            </label>

            <div className="buttons">
                <button type="button" onClick={closeModal}>discard</button>
                <button type="button" onClick={() => saveNote(props.editingNote)}>save</button>
            </div>
        </div>
    )
}