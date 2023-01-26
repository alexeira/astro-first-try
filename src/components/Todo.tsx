import { useState } from "react"

type TodoForm = HTMLFormElement & {
  todo: HTMLInputElement
}

type Todo = {
  id: number
  text: string
  completed: boolean
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([])

  function handleSubmit(event: React.FormEvent<TodoForm>) {
    event.preventDefault()
    const text = event.currentTarget.todo.value
    setTodos((prevTodos) => [...prevTodos, {
      id: prevTodos.length + 1,
      text,
      completed: false
    }])
    event.currentTarget.reset()
  }

  function handleToggle(id: Todo['id']) {
    setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  function handleDelete(id: Todo['id']) {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }

  const todoList = todos.map((todo) => (
    <li key={todo.id}>
      <span style={{ textDecoration: todo.completed ? "line-through" : "none" }} onClick={() => handleToggle(todo.id)}>{todo.text}</span>
      <button onClick={() => handleDelete(todo.id)}>X</button>
    </li>
  ))

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="todo" type="text" />
        <button type="submit">Add</button>
      </form>
      <ul>{todoList}</ul>
    </>
  )
}
