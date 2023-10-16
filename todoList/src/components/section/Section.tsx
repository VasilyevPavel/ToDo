import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export interface ISection {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface ISectionListProps {
  section: ISection;
  toggleRefresh: () => void;
}
export default function Section({ section, toggleRefresh }: ISectionListProps) {
  const [sectionList, setSectionList] = useState<ISection[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    console.log('123');
    setOpen(!open);
  };

  const handleDeleteClick = (id: string) => {
    const storedSectionList: ISection[] = JSON.parse(
      localStorage.getItem('sections') || '[]'
    );
    const updatedSectionList = storedSectionList.filter(
      (todo) => todo.id !== id
    );
    // setToDoList(updatedToDoList);
    // play();
    localStorage.setItem('sections', JSON.stringify(updatedSectionList));
    toggleRefresh();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <List component="div" disablePadding>
        <ListItemButton onClick={handleClick}>
          <FolderIcon />
          <ListItemText primary={section.text} sx={{ textAlign: 'left' }} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItemButton>
          <Typography sx={{ textAlign: 'left' }}>{section.text}</Typography>
        </ListItemButton>
      </Collapse> */}

        {/* {sectionList.map((section) => (
        <ListItem key={section.id} disablePadding>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={section.text} />
        </ListItem>
      ))} */}
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
