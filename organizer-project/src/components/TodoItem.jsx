import removeIcon from '/images/remove-icon.svg';

export default function TodoItem(props) {
    function handleChange() {
        props.toggleCompleted(props.id);
    }

    function deleteTask() {
        props.setTasks(prevTasks => prevTasks.filter(task => task.id !== props.id))
    }

    return (
        <div className="todo-item">
            <input type="checkbox" name={props.id} id={props.id} checked={props.isCompleted} onChange={handleChange} />
            <label htmlFor={props.id}>{props.text}</label>
            <button type="button" onClick={deleteTask}>
                <img src={removeIcon} alt="" />
            </button>
        </div>
    )
}