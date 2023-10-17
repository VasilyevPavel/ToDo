import React from 'react';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useSound from 'use-sound';
import fart from '../../../public/wet-fart-6139.mp3';
import { ToDo } from '../todoList/ToDoList';

interface OneToDoProps {
  handleEditClick: (id: string) => void;
  todo: ToDo;
  labelId: string;
  textClass: string;
  currentToDo: ToDo | null;
  toDoList: ToDo[];
  setCurrentToDo: (id: ToDo | null) => void;
  setToDoList: React.Dispatch<React.SetStateAction<ToDo[]>>;
  toggleRefresh: () => void;
}

export default function OneToDo({
  handleEditClick,
  todo,
  labelId,
  textClass,
  currentToDo,
  toDoList,
  setCurrentToDo,
  setToDoList,
  toggleRefresh,
}: OneToDoProps) {
  function dragStartHandler(e: React.DragEvent, toDo: ToDo) {
    setCurrentToDo(toDo);
  }

  function dragLeaveHandler(e: React.DragEvent) {}
  function dragEndHandler(e: React.DragEvent) {}
  function dragOverHandler(e: React.DragEvent) {
    e.preventDefault();
  }
  function dropHandler(e: React.DragEvent, targetTodo: { id: string }) {
    e.preventDefault();

    if (currentToDo) {
      const updatedList = [...toDoList];
      const draggedTodo = updatedList.find(
        (todo) => todo.id === currentToDo.id
      );
      const targetIndex = updatedList.findIndex(
        (todo) => todo.id === targetTodo.id
      );

      if (draggedTodo && targetIndex !== -1) {
        updatedList.splice(updatedList.indexOf(draggedTodo), 1);

        updatedList.splice(targetIndex, 0, draggedTodo);

        setToDoList(updatedList);

        localStorage.setItem('todos', JSON.stringify(updatedList));
      }

      setCurrentToDo(null);
    }
  }

  const handleCheckboxChange = (id: string) => {
    const updatedToDoList = [...toDoList];
    const todoIndex = updatedToDoList.findIndex((todo) => todo.id === id);

    if (todoIndex !== -1) {
      updatedToDoList[todoIndex].isCompleted =
        !updatedToDoList[todoIndex].isCompleted;
      setToDoList(updatedToDoList);
      toggleRefresh();
      localStorage.setItem('todos', JSON.stringify(updatedToDoList));
    }
  };
  const [play] = useSound(fart);
  const handleDeleteClick = (id: string) => {
    const updatedToDoList = toDoList.filter((todo) => todo.id !== id);
    setToDoList(updatedToDoList);
    play();
    localStorage.setItem('todos', JSON.stringify(updatedToDoList));
    toggleRefresh();
  };

  return (
    <ListItem
      key={todo.id}
      disablePadding
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, todo)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, todo)}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.isCompleted}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': labelId }}
          onChange={() => handleCheckboxChange(todo.id)}
        />
      </ListItemIcon>
      <ListItemText id={todo.id} primary={todo.text} className={textClass} />
      <IconButton
        data-testid="toggle-btn"
        onClick={() => handleEditClick(todo.id)}
        aria-label="delete"
        size="small"
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        data-testid="toggle-btn"
        onClick={() => handleDeleteClick(todo.id)}
        aria-label="delete"
        size="small"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </ListItem>
  );
}
