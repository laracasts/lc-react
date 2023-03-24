import './reset.css'
import './App.css'
import { useMemo, useRef, useState } from 'react'
import { CSSTransition, SwitchTransition } from "react-transition-group";
import TodoForm from './components/TodoForm'
import NoTodo from './components/NoTodo'
import TodoList from './components/TodoList'
import Features from './components/Features'
import useLocalStorage from './hooks/useLocalStorage'
import { TodosContext } from './context/TodosContext'

function App() {
  const NameLS = 'LCReactTodoName'
  const TaskListLS = 'LCReactTodoTaskList'
  const [name, setName] = useLocalStorage(NameLS, '')
  const nameInputEl = useRef(null)
  const [tasks, setTask] = useLocalStorage(TaskListLS, [])
  const [filter, setFilter] = useState("")

  function calculateRemainingTask() {
    const a = tasks.filter(task => !task.isCompleted)
    return {remaining: a.length, all: tasks.length}
  }

  const taskCount = useMemo(calculateRemainingTask, [tasks])

  const filteredTask = tasks.filter(task => !task.isCompleted !== filter)

  return (
    <TodosContext.Provider value={{ tasks, filteredTask, setTask, filter, setFilter, taskCount }}>
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
            <CSSTransition
              in={ name.length > 0}
              timeout={ 300 }
              classNames='slide-vertical'
              unmountOnExit
            >
              <p className="name-label">Hello, { name } </p>
            </CSSTransition>
          </div>
          <h2>Todo App</h2>
          <TodoForm />

          <SwitchTransition
            mode="out-in"
          >
            <CSSTransition
              key={ filteredTask.length > 0 }
              timeout={ 300 }
              classNames='slide-vertical'
              unmountOnExit
            >
              { filteredTask.length > 0 ? (
                <>
                  <TodoList
                    filteredTask={ filteredTask }
                  />
                </>
              ) : (
                <NoTodo />
              )}
            </CSSTransition>
          </SwitchTransition>
          <Features
            filter={ filter } setFilter={ setFilter }
            taskCount={ taskCount }
          />
        </div>
      </div>
    </TodosContext.Provider>
  )

}

export default App
