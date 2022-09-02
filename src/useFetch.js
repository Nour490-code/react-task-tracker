import { useState,useEffect } from "react";


const useFetch = () => {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks,setTasks] = useState('');
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState(false);

    //fetching data from json server
    useEffect(() => {
        fetch("http://localhost:8000/tasks")
          .then(res => {
            if(!res.ok){
              throw Error("Tasks cannot be fetched, please try again")
            }
            return res.json();
          })
          .then(data => {
            setTasks(data)
            setIsloading(false)
          })
          .catch(err => {
            setError(err.message)
            setIsloading(null);
          });
    },[])

    //adding tasks to the json server
    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = {id, ...task}
        setTasks([...tasks,newTask])
        fetch('http://localhost:8000/tasks',{
         method:"POST",
         headers:{"Content-Type":"application/json"},
         body: JSON.stringify(newTask)
        })
       }
        
       //deleting tasks
       const deleteTask = async(id) => {
         await fetch('http://localhost:8000/tasks/'+ id,{
           method:"DELETE"
         })
         setTasks(tasks.filter((task) => task.id !== id))
       }
     
       
       const toggleReminder = async(id) => {
         const toggleToReminder = await fetch('http://localhost:8000/tasks/'+ id).then((r) => {
           const data = r.json()
           return data
         });
         const updateTask = {...toggleToReminder, reminder: !toggleToReminder.reminder};
         
         const res = await fetch('http://localhost:8000/tasks/'+ id,{
           method:"PUT",
           headers:{"Content-Type":"application/json",},
           body: JSON.stringify(updateTask)
         })
         const resultData = await res.json()
     
         setTasks(
           tasks.map((task) => 
             task.id === id ? {...task, reminder: 
             resultData.reminder} : task
           )
         )
       }
     
     
     
    return {
        tasks,
        isLoading , 
        error, 
        showAddTask,
        toggleReminder,
        setError,
        setTasks,
        setIsloading,
        setShowAddTask,
        addTask,
        deleteTask
    }
}


export default useFetch;