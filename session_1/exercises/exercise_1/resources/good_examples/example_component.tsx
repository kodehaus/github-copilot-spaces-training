import React, { useState } from 'react';
import { Task, TaskPriority } from '@/types/task';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { formatDate } from '@/utils/dateUtils';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  isLoading?: boolean;
}

/**
 * TaskCard component displays a single task with actions
 * 
 * @component
 * @example
 * <TaskCard 
 *   task={taskData}
 *   onComplete={handleComplete}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 * />
 */
export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onComplete,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleComplete = () => {
    if (task.status === 'done') return;
    onComplete(task.id);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete task "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  const getPriorityColor = (priority: TaskPriority): string => {
    const colors: Record<TaskPriority, string> = {
      low: 'green',
      medium: 'yellow',
      high: 'red'
    };
    return colors[priority];
  };

  const isDueSoon = (): boolean => {
    if (!task.dueDate) return false;
    const daysDiff = Math.floor(
      (new Date(task.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return daysDiff <= 3 && daysDiff >= 0;
  };

  const isOverdue = (): boolean => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date() && task.status !== 'done';
  };

  return (
    <div 
      className={`${styles.card} ${isLoading ? styles.loading : ''}`}
      data-testid="task-card"
    >
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{task.title}</h3>
          <Badge 
            color={getPriorityColor(task.priority)}
            size="small"
          >
            {task.priority}
          </Badge>
        </div>
        
        {task.dueDate && (
          <div className={styles.dueDate}>
            <span className={styles.label}>Due:</span>
            <span 
              className={`${styles.date} ${
                isOverdue() ? styles.overdue : 
                isDueSoon() ? styles.dueSoon : ''
              }`}
            >
              {formatDate(task.dueDate)}
              {isOverdue() && ' (Overdue)'}
              {isDueSoon() && !isOverdue() && ' (Due Soon)'}
            </span>
          </div>
        )}
      </div>

      {isExpanded && task.description && (
        <div className={styles.description}>
          <p>{task.description}</p>
        </div>
      )}

      {task.description && (
        <button 
          className={styles.expandButton}
          onClick={toggleExpanded}
          aria-label={isExpanded ? 'Collapse description' : 'Expand description'}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}

      <div className={styles.footer}>
        <div className={styles.metadata}>
          {task.assignedUser && (
            <span className={styles.assignee}>
              👤 {task.assignedUser.name}
            </span>
          )}
          <Badge variant="outline" size="small">
            {task.status}
          </Badge>
        </div>

        <div className={styles.actions}>
          {task.status !== 'done' && (
            <Button
              variant="primary"
              size="small"
              onClick={handleComplete}
              disabled={isLoading}
              aria-label="Mark task as complete"
            >
              ✓ Complete
            </Button>
          )}
          
          <Button
            variant="secondary"
            size="small"
            onClick={handleEdit}
            disabled={isLoading}
            aria-label="Edit task"
          >
            ✎ Edit
          </Button>
          
          <Button
            variant="danger"
            size="small"
            onClick={handleDelete}
            disabled={isLoading}
            aria-label="Delete task"
          >
            🗑 Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

// Type guard for additional safety
export const isValidTask = (task: unknown): task is Task => {
  return (
    typeof task === 'object' &&
    task !== null &&
    'id' in task &&
    'title' in task &&
    'status' in task &&
    'priority' in task
  );
};
