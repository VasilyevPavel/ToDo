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
import { Draggable } from 'react-beautiful-dnd';

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
  index: number;
}

export default function OneToDo({
  handleEditClick,
  todo,
  labelId,
  textClass,

  toDoList,

  setToDoList,
  toggleRefresh,
  index,
}: OneToDoProps) {
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
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItem key={todo.id} disablePadding>
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
            <ListItemText
              id={todo.id}
              primary={todo.text}
              className={textClass}
            />
            <IconButton
              data-testid="toggle-btn"
              onClick={() => handleEditClick(todo.id)}
              aria-label="edit"
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
        </div>
      )}
    </Draggable>
  );
}
