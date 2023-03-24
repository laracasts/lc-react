import './reset.css'
import './App.css'
import { useMemo, useRef, useState } from 'react'
import TodoForm from './components/TodoForm'
import NoTodo from './components/NoTodo'
import TodoList from './components/TodoList'

function App() {
  const [name, setName] = useState("")
  const nameInputEl = useRef(null)
  const [tasks, setTask] = useState([
    {
      id: Math.floor(Math.random()*1000),
      task_name: 'Laundry',
      isCompleted: false,
      isEditing: false,
    },
    {
      id: Math.floor(Math.random()*1000),
      task_name: 'Dishes',
      isCompleted: true,
      isEditing: false,
    },
    {
      id: Math.floor(Math.random()*1000),
      task_name: 'Sweep',
      isCompleted: false,
      isEditing: false,
    },
    {
      id: Math.floor(Math.random()*1000),
      task_name: 'Electricity',
      isCompleted: false,
      isEditing: false,
    },
  ])
  const [filter, setFilter] = useState("")

  function calculateRemainingTask() {
    const a = tasks.filter(task => !task.isCompleted)
    return {remaining: a.length, all: tasks.length}
  }

  const taskCount = useMemo(calculateRemainingTask, [tasks])

  const filteredTask = tasks.filter(task => !task.isCompleted !== filter)

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="name-container">
          <h2>What is your Name?</h2>
          <form action="">
            <input
              type="text"
              className='todo-input'
              placeholder='what is your name'
              ref={ nameInputEl }
              value={ name }
              onChange={ e => setName(e.target.value) }
            />
          </form>
          { name && <p className="name-label">Hello, { name } </p> }
        </div>
        <h2>Todo App</h2>
        <TodoForm
          tasks={ tasks } setTask={ setTask }
        />

        { tasks.length > 0 ? (
          <>
            <TodoList
              tasks={ filteredTask } setTask={ setTask }
              filter={ filter } setFilter={ setFilter }
              taskCount={ taskCount }
            />
          </>
        ) : (
          <NoTodo />
        )}
      </div>
    </div>
  )
}

export default App
