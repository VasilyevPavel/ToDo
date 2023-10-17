import { DragEvent, useEffect, useState } from 'react';
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
  const [sectionList, setSectionList] = useState<ISection[]>([]);
  const [includedToDo, setIncludedToDo] = useState<ToDo[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const currentToDo = filteredToDoList().filter((toDo) => {
      return toDo.section === section.id;
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

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (currentToDo) {
      const updatedToDoList = [...toDoList];
      const updatedSectionList = [...sectionList];

      const currentTaskIndex = updatedToDoList.findIndex(
        (todo) => todo.id === currentToDo.id
      );

      if (currentTaskIndex !== -1) {
        updatedToDoList[currentTaskIndex].section = section.id;

        setToDoList(updatedToDoList);
        setSectionList(updatedSectionList);

        localStorage.setItem('todos', JSON.stringify(updatedToDoList));

        setCurrentToDo(null);
      }
    }
  };

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between' }}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
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
              includedToDo.map((todo: ToDo) => {
                const labelId = `checkbox-list-label-${todo.id}`;
                const textClass = todo.isCompleted
                  ? 'list-item-text completed'
                  : 'list-item-text';

                return (
                  <OneToDo
                    key={todo.id}
                    labelId={labelId}
                    textClass={textClass}
                    handleEditClick={handleEditClick}
                    toggleRefresh={toggleRefresh}
                    todo={todo}
                    currentToDo={currentToDo}
                    setCurrentToDo={setCurrentToDo}
                    toDoList={toDoList}
                    setToDoList={setToDoList}
                  />
                );
              })
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
