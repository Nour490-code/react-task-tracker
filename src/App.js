import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';
import useFetch from './useFetch';

function App() {
  const { 
    tasks,
    isLoading , 
    error, 
    showAddTask,
    toggleReminder,
    setShowAddTask,
    addTask,
    deleteTask
  } = useFetch()



  return (
    <div className="container">
      <Header onAdd = { () => setShowAddTask(!showAddTask)} showAdd = {showAddTask}/>
      { showAddTask && <AddTask onAdd = {addTask} />}
      {error && <div>{error}</div>}
      {isLoading && (<div className='loading'>Loading... Please wait</div>)}
      {tasks && <Tasks tasks = {tasks}  onDelete = {deleteTask} onToggle = {toggleReminder}/>}
    </div>
  );
}

export default App;
