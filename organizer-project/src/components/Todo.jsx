import { useState, useRef } from "react"
import TodoItem from "./TodoItem.jsx";
import addIcon from '/images/add-icon.svg';

let taskCounter = 0;

export default function Todo({tasks, setTasks}) {
    const [filter, setFilter] = useState('all');

    function handleFilter(e) {
        if (e.target.id === 'filter-all') {
            setFilter('all');
        } else if (e.target.id === 'filter-completed') {
            setFilter('completed');
        } else if (e.target.id === 'filter-active') {
            setFilter('active')
        }
    }

    const inputRef = useRef(null);

    function addTask(e) {
        e.preventDefault();
        const taskText = inputRef.current.value;
        taskCounter++;
        
        const newTask = {text: taskText, id: `task-${taskCounter}`, isCompleted: false};

        setTasks(prevTasks => [...prevTasks, newTask]);
        inputRef.current.value = '';
    }

    function toggleCompleted(taskId) {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    }

    const all = tasks.length;
    const todoItems = tasks.map(task => {
        return (
            <TodoItem key={task.id} id={task.id} text={task.text} isCompleted={task.isCompleted} toggleCompleted={toggleCompleted} setTasks={setTasks}/>
        )
    })

    const completed = tasks.filter(task => task.isCompleted).length;
    const completedTasks = tasks.filter(task => task.isCompleted).map(completedTask => {
        return (
            <TodoItem key={completedTask.id} id={completedTask.id} text={completedTask.text} isCompleted={completedTask.isCompleted} toggleCompleted={toggleCompleted} setTasks={setTasks}/>
        )        
    })
    
    const active = tasks.filter(task => !task.isCompleted).length;
    const activeTasks = tasks.filter(task => !task.isCompleted).map(activeTask => {
        return (
            <TodoItem key={activeTask.id} id={activeTask.id} text={activeTask.text} isCompleted={activeTask.isCompleted} toggleCompleted={toggleCompleted} setTasks={setTasks}/>
        )
    })

    return (
        <div>
            <form className="todo-form" onSubmit={addTask}>
                <label htmlFor="todo-input">
                    <input type="text" name="todoInput" id="todo-input" placeholder="enter task" ref={inputRef}/>
                </label>
                <button type="submit">
                    <img src={addIcon} alt="" />
                </button>
            </form>

            <div className={tasks.length === 0 ? "tasks-container empty" : "tasks-container"}>
                {tasks.length === 0 && <p>your tasks will appear here</p>}
                {filter === 'all' && todoItems}
                {filter === 'completed' && completedTasks}
                {filter === 'active' && activeTasks}
            </div>

            <div className="filters">
                <button type="button" id="filter-all" onClick={handleFilter} className={filter === 'all' ? 'selected' : 'undefined'}>all <span>{all}</span></button>
                <button type="button" id="filter-completed" onClick={handleFilter} className={filter === 'completed' ? 'selected' : 'undefined'}>completed <span>{completed}</span></button>
                <button type="button" id="filter-active" onClick={handleFilter} className={filter === 'active' ? 'selected' : 'undefined'}>active <span>{active}</span></button>
            </div>

            <button className="delete-completed" type="button" onClick={() => setTasks(prevTasks => prevTasks.filter(task => !task.isCompleted))}>delete completed</button>
        </div>
    )

}