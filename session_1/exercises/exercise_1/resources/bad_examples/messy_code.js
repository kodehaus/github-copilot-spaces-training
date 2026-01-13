// task thing
import React from 'react';

export default function TaskCard(props) {
  // delete task
  const handleDelete = () => {
    // TODO: add confirmation
    props.onDelete(props.task.id);
  };

  // complete task
  const handleComplete = () => {
    // call the function
    props.onComplete(props.task.id);
  };

  // edit task  
  const handleEdit = () => {
    props.onEdit(props.task);
  };

  // show more
  const [isExpanded, setIsExpanded] = React.useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  // check if overdue
  const isOverdue = () => {
    return new Date(props.task.dueDate) < new Date();
  };

  // priority color
  const getPriorityColor = () => {
    if (props.task.priority == 'high') return 'red';
    if (props.task.priority == 'medium') return 'yellow';
    return 'green';
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>{props.task.title}</h3>
        <span style={{ color: getPriorityColor() }}>{props.task.priority}</span>
      </div>
      
      {props.task.dueDate && (
        <div>
          Due: {props.task.dueDate.toString()}
          {isOverdue() && ' (OVERDUE!)'}
        </div>
      )}

      {isExpanded ? (
        <div>
          <p>{props.task.description}</p>
          <button onClick={toggleExpanded}>Show Less</button>
        </div>
      ) : (
        <button onClick={toggleExpanded}>Show More</button>
      )}

      <div style={{ marginTop: '10px' }}>
        {props.task.assignedUser && (
          <span>Assigned to: {props.task.assignedUser.name}</span>
        )}
        <span style={{ marginLeft: '10px' }}>Status: {props.task.status}</span>
      </div>

      <div style={{ marginTop: '10px' }}>
        {props.task.status !== 'done' && (
          <button onClick={handleComplete} style={{ marginRight: '5px' }}>
            Complete
          </button>
        )}
        <button onClick={handleEdit} style={{ marginRight: '5px' }}>Edit</button>
        <button onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
      </div>
    </div>
  );
}

// helper function that's never used
function formatDate(date) {
  // TODO: implement this properly
  return date.toString();
}

// another unused function
function validateTask(task) {
  // validate task
  if (!task.title) return false;
  return true;
}
