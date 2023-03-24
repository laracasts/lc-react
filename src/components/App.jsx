import '../reset.css';
import '../App.css';
import { useState } from 'react';
import TodoForm from './TodoForm';
import NoTodo from './NoTodo';
import TodoList from './TodoList';

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

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        {/* Adding Form */}
        <TodoForm tasks={ tasks } setTask={ setTask }/>

        { tasks.length > 0 ? (
          <>
            <TodoList tasks={ tasks } setTask={ setTask }/>
          </>
        ) : (
          <NoTodo />
        )}
      </div>
    </div>
  );
}

export default App;
