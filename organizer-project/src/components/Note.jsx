import deleteIcon from '/images/delete-icon.svg';
import editIcon from '/images/edit-icon.svg';

export default function Note(props) {
    function deleteNote(id) {
        props.setNotes(prevNotes => {
           return prevNotes.filter(note => note.id !== id);
        })
    }
    
    function editNote(note) {
        props.setIsModalOn(true);
        props.setEditingNote(note);
    }
    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p style={{ whiteSpace: 'pre-wrap' }}>{props.text}</p>

            <footer>
                <button type="button" onClick={() => editNote(props.note)}>
                    <img src={editIcon} alt="" />
                </button>
                <button type="button" onClick={() => deleteNote(props.id)}>
                    <img src={deleteIcon} alt="" />
                </button>
            </footer>
        </div>
    )
}