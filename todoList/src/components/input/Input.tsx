import { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import './inputStyle.css';

interface IInputProps {
  toggleRefresh: () => void;
}
interface IInput {
  inputText: string;
}

export default function Input({ toggleRefresh }: IInputProps) {
  const [formData, setFormData] = useState<IInput>({
    inputText: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAddTodo = () => {
    if (formData.inputText.trim() === '') return;
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');

    const id = new Date().getTime();

    todos.push({ id, text: formData.inputText, isCompleted: false });

    localStorage.setItem('todos', JSON.stringify(todos));

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
        justifyContent: 'center',
        paddingBottom: '20px',
      }}
    >
      <Box
        sx={{
          width: '80%',

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
          Add ToDo
        </Button>
      </Box>
    </Box>
  );
}