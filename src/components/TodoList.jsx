import React, { useEffect, useState } from 'react'
import NoTodo from './NoTodo'

function TodoList({ tasks, setTask, filter, setFilter }) {
  const [allIsCompleted, setAllIsCompleted] = useState(false)

  useEffect( () => {
    setAllIsCompleted(Object.values(tasks).every( task => task.isCompleted === true))
  }, [tasks])

  function deleteTask(id) {
    console.log(`delete task: ${id}`)
    setTask(tasks.filter(task => task.id !== id));
  }

  function deleteAllCompleted() {
    console.log("delete all competed task")
    setTask(tasks.filter(task => !task.isCompleted === true))
  }

  function setAllIsComplete(status) {
    console.log(`toggle ${status} to all task IsComplete`)
    setTask(tasks.map(task => { return { ...task, isCompleted: status } }))
  }

  function setIsComplete(id) {
    console.log(`toggle ${id} IsComplete`)
    setTask(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  }

  function setIsEditing(id) {
    console.log(`toggle edit status on ${id}`)
    setTask(tasks.map(task => task.id === id ? { ...task, isEditing: !task.isEditing } : { ...task, isEditing: false }));
  }

  function updateToDo(e, id) {
    setTask(tasks.map(task => {
      if (task.id === id && e.target.value.trim().length !== 0) {
        console.log(`Update ${id}`)
        task.task_name = e.target.value
      }
      task.isEditing = false

      return task
    } ))
  }

  return (
    <section>
      <ul className="todo-list">
        { tasks.map((task, index) => (
          <li key={ task.id } className="todo-item-container">
            <div className="todo-item">
              <input type="checkbox"
                onClick={ () => setIsComplete(task.id) }
                checked={ task.isCompleted ? true : false }
                onChange={ () => {} }
              />
              { !task.isEditing ? (
              <span
                onDoubleClick={ () => setIsEditing(task.id) }
                className={ `todo-item-label ${ task.isCompleted ? 'line-through' : '' }` }
              >
                { task.task_name }
              </span>
              ) : (
                <input
                  type="text"
                  defaultValue={ task.task_name }
                  className='todo-item-input'
                  onBlur={ e => updateToDo(e, task.id)}
                  onKeyDown={ e => {
                    if (e.key === 'Enter') {
                      updateToDo(e, task.id)
                    } else if (e.key === 'Escape') {
                      updateToDo(e, "")
                    }
                  }}
                  onChange={ () => {} }
                  autoFocus
                />
              )}
            </div>
            <button onClick={ () => deleteTask(task.id) } className="x-button">
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={ 2 }
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      { tasks.length > 0 ? (
        <div className="check-all-container">
          <div className='button-group'>
            { !allIsCompleted ? (
              <div className="button" onClick={ () => setAllIsComplete(true) }>Check All</div>
            ) : (
              <div className="button" onClick={ () => setAllIsComplete(false) }>Uncheck All</div>
            )}
          </div>

          <span>{ tasks.length } items remaining</span>
        </div>
      ) : (
        <NoTodo  />
      )}

      <div className="other-buttons-container">
        <div>
          <button
            className={`button filter-button ${ filter === "" ? "filter-button-active" : ""}`}
            onClick={ () => setFilter("")}
          >
            All
          </button>
          <button
            className={`button filter-button ${ filter === false ? "filter-button-active" : ""}`}
            onClick={ () => setFilter(false)}
          >
            Active
          </button>
          <button
            className={`button filter-button ${ filter === true ? "filter-button-active" : ""}`}
            onClick={ () => setFilter(true)}
          >
            Completed
          </button>
        </div>
        <div>
          <button className="button" onClick={ () => deleteAllCompleted() }>Clear completed</button>
        </div>
      </div>
    </section>
  )
}

export default TodoList