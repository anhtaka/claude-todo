import { useTodos } from './hooks/useTodos'
import { TodoInput } from './components/TodoInput'
import { TodoItem } from './components/TodoItem'
import { TodoFooter } from './components/TodoFooter'

export default function App() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
    totalCount,
  } = useTodos()

  return (
    <div className="app">
      <h1 className="title">todos</h1>
      <div className="card">
        <TodoInput
          onAdd={addTodo}
          onToggleAll={toggleAll}
          hasItems={totalCount > 0}
          allCompleted={totalCount > 0 && activeCount === 0}
        />
        {todos.length > 0 && (
          <ul className="todo-list">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>
        )}
        {totalCount > 0 && (
          <TodoFooter
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>
      {totalCount === 0 && (
        <p className="empty-hint">タスクを入力して Enter で追加</p>
      )}
    </div>
  )
}
