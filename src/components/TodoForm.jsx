import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoForm() {

  const { tasks, setTask } = useContext(TodosContext)

  function addTodo(e) {
    e.preventDefault();

    if (e.target.inputTask.value.trim().length > 0 ) {
      const newTask = {
        id: Math.floor(Math.random()*1000),
        task_name: e.target.inputTask.value,
        isCompleted: false,
        isEditing: false
      }

      setTask([ ...tasks, newTask ])
      e.target.inputTask.value = ""
    }
  }

  return (
    <form onSubmit={ addTodo }>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        name="inputTask"
      />
    </form>
  )
}

export default TodoForm
