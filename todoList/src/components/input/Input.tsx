import { ChangeEvent, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import './inputStyle.css';
import { ToDo } from '../todoList/ToDoList';

interface IInputProps {
  toggleRefresh: () => void;
  editId: string;
  setEditId: (id: string) => void;
}

interface IInput {
  inputText: string;
}

export default function Input({
  toggleRefresh,
  editId,
  setEditId,
}: IInputProps) {
  const [formData, setFormData] = useState<IInput>({
    inputText: '',
  });

  useEffect(() => {
    if (editId) {
      const todos: ToDo[] = JSON.parse(localStorage.getItem('todos') || '[]');
      const editedTodo = todos.find((todo) => todo.id === editId);

      if (editedTodo) {
        setFormData({ inputText: editedTodo.text });
      }
    }
  }, [editId]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAddTodo = () => {
    if (formData.inputText.trim() === '') return;
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');

    if (editId) {
      const todoIndex = todos.findIndex(
        (todo: { id: string }) => todo.id === editId
      );

      if (todoIndex !== -1) {
        todos[todoIndex].text = formData.inputText;
      }
    } else {
      const id = new Date().getTime();
      todos.push({
        id,
        text: formData.inputText,
        isCompleted: false,
        section: '',
      });
    }

    localStorage.setItem('todos', JSON.stringify(todos));

    setFormData({ inputText: '' });
    setEditId('');
    toggleRefresh();
  };

  const handleAddSection = () => {
    if (formData.inputText.trim() === '') return;
    const sections = JSON.parse(localStorage.getItem('sections') || '[]');
    const id = new Date().getTime();
    sections.push({ id, text: formData.inputText });
    localStorage.setItem('sections', JSON.stringify(sections));

    setFormData({ inputText: '' });
    toggleRefresh();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Box
      sx={{
        width: '104%',
        borderBottom: '2px solid grey',
        display: 'flex',
        justifyContent: 'space-around',
        paddingBottom: '20px',
      }}
    >
      <Box
        sx={{
          width: '95%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          label="ToDo"
          name="inputText"
          type="text"
          placeholder="What needs to be done"
          value={formData.inputText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          sx={{
            marginRight: isMobile ? '0px' : '20px',
            marginBottom: isMobile ? '20px' : '0px',
          }}
          required
        />

        <Button
          onClick={handleAddTodo}
          className="input-btn"
          variant="contained"
          color="success"
        >
          {editId ? 'Save' : 'Add ToDo'}
        </Button>
        <Button
          onClick={handleAddSection}
          className="input-btn"
          variant="contained"
          color="success"
        >
          Add folder
        </Button>
      </Box>
    </Box>
  );
}
