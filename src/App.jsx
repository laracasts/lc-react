import './reset.css';
import './App.css';
import { useState } from 'react';
import TodoForm from './components/TodoForm';
import NoTodo from './components/NoTodo';
import TodoList from './components/TodoList';

function App() {
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
  const [filter, setFilter] = useState([true || false])

  const filteredTask = tasks.filter(task => !task.isCompleted !== filter)

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm
          tasks={ tasks } setTask={ setTask }
        />

        { tasks.length > 0 ? (
          <>
            <TodoList
              tasks={ filteredTask } setTask={ setTask }
              filter={ filter } setFilter={ setFilter }
            />
          </>
        ) : (
          <NoTodo />
        )}
      </div>
    </div>
  );
}

export default App;
