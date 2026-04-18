import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import type { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const commitEdit = () => {
    onEdit(todo.id, editText)
    setEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') {
      setEditText(todo.text)
      setEditing(false)
    }
  }

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}${editing ? ' editing' : ''}`}>
      {editing ? (
        <input
          ref={inputRef}
          className="edit-input"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitEdit}
        />
      ) : (
        <>
          <button
            className={`check-btn${todo.completed ? ' checked' : ''}`}
            onClick={() => onToggle(todo.id)}
            aria-label={todo.completed ? '未完了にする' : '完了にする'}
          >
            {todo.completed && (
              <svg viewBox="0 0 12 9" width="12" height="9">
                <polyline points="1,5 4,8 11,1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <span
            className="todo-text"
            onDoubleClick={() => {
              setEditText(todo.text)
              setEditing(true)
            }}
          >
            {todo.text}
          </span>
          <button
            className="delete-btn"
            onClick={() => onDelete(todo.id)}
            aria-label="削除"
          >
            ×
          </button>
        </>
      )}
    </li>
  )
}
