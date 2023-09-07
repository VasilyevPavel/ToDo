import { useState } from 'react';
import Input from '../components/input/Input';
import './mainPageStyle.css';
import ToDoList from '../components/todoList/ToDoList';

export default function MainPage() {
  const [refresh, setRefresh] = useState<boolean>(false);

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="main">
      <h1 className="title">ToDos</h1>
      <div className="wrapper">
        <Input toggleRefresh={toggleRefresh} />
        <ToDoList refresh={refresh} />
      </div>
    </div>
  );
}
