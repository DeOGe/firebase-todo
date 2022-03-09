import React from 'react'
import Task from './Task';
export default function TaskList({tasks, deleteTask}) {
  return (
    <div className='text-center py-4'>
      <div className='content-center mx-auto w-3/4'>
        {
          tasks.map((task) => {
            return <Task key={task.id} task={task} deleteTask={deleteTask}/>
          })
        }
      </div>
    </div>
  )
}
