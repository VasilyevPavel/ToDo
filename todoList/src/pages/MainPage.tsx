import { useState } from 'react';
import Input from '../components/input/Input';
import './mainPageStyle.css';
import ToDoList from '../components/todoList/ToDoList';

export default function MainPage() {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const handleEditClick = (id: string) => {
    setEditId(id);
  };
  console.log('edit', editId);
  const toggleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="main">
      <h1 className="title">ToDos</h1>
      <div className="wrapper">
        <Input toggleRefresh={toggleRefresh} editId={editId} />
        <ToDoList
          refresh={refresh}
          toggleRefresh={toggleRefresh}
          handleEditClick={handleEditClick}
        />
      </div>
    </div>
  );
}
