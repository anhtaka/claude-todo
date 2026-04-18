import type { FilterType } from '../types'

interface Props {
  activeCount: number
  completedCount: number
  filter: FilterType
  onFilterChange: (f: FilterType) => void
  onClearCompleted: () => void
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'すべて', value: 'all' },
  { label: '未完了', value: 'active' },
  { label: '完了', value: 'completed' },
]

export function TodoFooter({ activeCount, completedCount, filter, onFilterChange, onClearCompleted }: Props) {
  return (
    <footer className="footer">
      <span className="count">
        <strong>{activeCount}</strong> 件残り
      </span>
      <div className="filters">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`filter-btn${filter === f.value ? ' selected' : ''}`}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button className="clear-btn" onClick={onClearCompleted}>
          完了を削除
        </button>
      )}
    </footer>
  )
}
