export default function TasksHeader({tasks}) {
    const completedTasks = tasks.filter(task => task.isCompleted);
    const completedTasksPercentage = tasks.length > 0 ?
                                    (completedTasks.length / tasks.length) * 100 :
                                    0; 

    return (
        <div className="tasks-header">
            <h1>tasks</h1>
            <span>{completedTasksPercentage.toFixed(0)}%</span> 
        </div>
    )
}