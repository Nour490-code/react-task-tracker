import { useState } from 'react';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks,setTasks] = useState([
    {
      id: 1 ,
      text: "Gym",
      day:'5th May',
      reminder: false,
    },
    {
      id: 2 ,
      text: "HW",
      day:'7th May',
      reminder: false,
    },
    {
      id: 3 ,
      text: "Date",
      day:'5th August',
      reminder: true,
    }
  ])

  const addTask = (task) => {
   const id = Math.floor(Math.random() * 10000) + 1
   const newTask = {id, ...task}
   setTasks([...tasks,newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }


  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => 
        task.id === id ? {...task, reminder: 
        !task.reminder} : task
      )
    )
  }
  return (
    <div className="container">
      <Header onAdd = { () => setShowAddTask(!showAddTask)} showAdd = {showAddTask}/>
      { showAddTask && <AddTask onAdd = {addTask} />}
      {tasks.length > 0 ? (<Tasks tasks = {tasks}  onDelete = {deleteTask} onToggle = {toggleReminder}/>) 
      : ('Congrats there are no tasks !!')}
    </div>
  );
}

export default App;
