import db from '../firebase';
import TaskList from './TaskList';
import firebase from 'firebase/compat/app';
import React, { useEffect, useState } from 'react';

export default function TodoBody() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTasks(snapshot.docs.map(doc => ({
        id: doc.id,
        task: doc.data().task
      })))
    })
  }, [])
 
  const addTask = (e) => {
    e.preventDefault();
    db.collection('todos').add({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  const deleteTask = (id) => {
     db.collection('todos').doc(id).delete()
  }

  return (
    <div className='mt-4'>
      <div className="flex justify-center">
        <form method="GET" onSubmit={addTask}>
          <div className="relative text-gray-600 focus-within:text-gray-400">
            <input 
              type="search" 
              name="addTask" 
              className="mx-2 p-2 text-sm text-black bg-white rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
              placeholder="New Task"
              autoComplete="off"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button className='mx-2 p-2 text-sm text-white bg-green-700 rounded-md'>Add</button>
          </div>
        </form>
      </div>
      <TaskList tasks={tasks} deleteTask={deleteTask}/>
    </div>
   

  )
}
