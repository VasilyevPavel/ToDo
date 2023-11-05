import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ToDo } from '../todoList/ToDoList';
import OneToDo from '../oneToDo/OneToDo';

export interface ISection {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface ISectionListProps {
  handleEditClick: (id: string) => void;
  section: ISection;
  toggleRefresh: () => void;
  toDoList: ToDo[];
  currentToDo: ToDo | null;
  setCurrentToDo: (todo: ToDo | null) => void;
  setToDoList: React.Dispatch<React.SetStateAction<ToDo[]>>;
  filteredToDoList: () => ToDo[];
  index: number;
}

export default function Section({
  handleEditClick,
  section,
  toggleRefresh,
  toDoList,
  currentToDo,
  setCurrentToDo,
  setToDoList,
  filteredToDoList,
}: ISectionListProps) {
  const [includedToDo, setIncludedToDo] = useState<ToDo[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    const currentToDo = filteredToDoList().filter((toDo) => {
      return toDo.section == section.id;
    });
    setIncludedToDo(currentToDo);
  }, [toDoList, section]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDeleteClick = (id: string) => {
    const storedSectionList: ISection[] = JSON.parse(
      localStorage.getItem('sections') || '[]'
    );
    const updatedSectionList = storedSectionList.filter(
      (todo) => todo.id !== id
    );
    localStorage.setItem('sections', JSON.stringify(updatedSectionList));
    toggleRefresh();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '2px solid black',
      }}
    >
      <List component="div" disablePadding>
        <ListItemButton onClick={handleClick}>
          <FolderIcon />
          <ListItemText primary={section.text} sx={{ textAlign: 'left' }} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List className="list-container">
            {includedToDo.length === 0 ? (
              <h1>There are no todo's</h1>
            ) : (
              includedToDo.map((todo: ToDo, index) => (
                <OneToDo
                  key={todo.id}
                  labelId={`checkbox-list-label-${todo.id}`}
                  textClass={
                    todo.isCompleted
                      ? 'list-item-text completed'
                      : 'list-item-text'
                  }
                  handleEditClick={handleEditClick}
                  toggleRefresh={toggleRefresh}
                  todo={todo}
                  currentToDo={currentToDo}
                  setCurrentToDo={setCurrentToDo}
                  toDoList={toDoList}
                  setToDoList={setToDoList}
                  index={index}
                />
              ))
            )}
          </List>
        </Collapse>
      </List>
      <IconButton
        data-testid="toggle-btn"
        onClick={() => handleDeleteClick(section.id)}
        aria-label="delete"
        size="small"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
