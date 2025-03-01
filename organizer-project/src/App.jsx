import Header from "./components/Header.jsx";
import TasksHeader from "./components/TasksHeader.jsx";
import Todo from "./components/Todo.jsx";
import NotesSection from "./components/NotesSection.jsx";
import { useState } from "react";
import './styles/main.css';
import Tools from "./components/Tools.jsx";

function App() {
const [tasks, setTasks] = useState([]);

  return (
    <>
      <main>
        <div className="main-container">
          <div className="col">
            <Header/>
           
            <section className="tasks-section">
              <TasksHeader tasks={tasks} />
              <Todo tasks={tasks} setTasks={setTasks} />
            </section>
  
          </div>
        
        <NotesSection />

        </div>

        <Tools />

      </main> 

      <footer>
        credits & stuff
      </footer>
    </>
  )
}

export default App
