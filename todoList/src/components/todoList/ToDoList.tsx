import { useEffect, useState } from 'react';
import List from '@mui/material/List';

import Counter from '../counter/Counter';

import { Box } from '@mui/material';
import ControlButton from '../controlButton/ControlButton';

import './toDoListStyle.css';
import Section from '../section/Section';
import OneToDo from '../oneToDo/OneToDo';

export interface ToDo {
  id: string;
  text: string;
  isCompleted: boolean;
  section?: string;
}

export interface ISection {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface IToDoListProps {
  refresh: boolean;
  toggleRefresh: () => void;
  handleEditClick: (id: string) => void;
}

export default function ToDoList({
  refresh,
  toggleRefresh,
  handleEditClick,
}: IToDoListProps) {
  const [toDoList, setToDoList] = useState<ToDo[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [activeButton, setActiveButton] = useState<string>('All');
  const [toDoCount, setToDoCount] = useState<number>(0);
  const [sectionList, setSectionList] = useState<ISection[]>([]);
  const [currentToDo, setCurrentToDo] = useState<ToDo | null>(null);

  useEffect(() => {
    const storedToDoList: ToDo[] = JSON.parse(
      localStorage.getItem('todos') || '[]'
    );
    const storedSectionList: ISection[] = JSON.parse(
      localStorage.getItem('sections') || '[]'
    );
    setToDoList(storedToDoList);
    setSectionList(storedSectionList);

    const activeToDo = storedToDoList.filter(
      (el) => el.isCompleted === false
    ).length;
    setToDoCount(activeToDo);
  }, [refresh]);

  const filteredToDoList = () => {
    switch (filter) {
      case 'Active':
        return toDoList.filter((todo) => !todo.isCompleted);
      case 'Completed':
        return toDoList.filter((todo) => todo.isCompleted);
      default:
        return toDoList;
    }
  };

  const handleClearCompleted = () => {
    const updatedToDoList = toDoList.filter((todo) => !todo.isCompleted);
    setToDoList(updatedToDoList);
    localStorage.setItem('todos', JSON.stringify(updatedToDoList));
  };

  return (
    <>
      <List className="list-container">
        {sectionList.map((section) => (
          <Section
            key={section.id}
            handleEditClick={handleEditClick}
            section={section}
            toDoList={toDoList}
            currentToDo={currentToDo}
            setToDoList={setToDoList}
            setCurrentToDo={setCurrentToDo}
            toggleRefresh={toggleRefresh}
            filteredToDoList={filteredToDoList}
          />
        ))}
      </List>
      <List className="list-container">
        {filteredToDoList().length === 0 ? (
          <h1>There are no todo's</h1>
        ) : (
          filteredToDoList()
            .filter((el) => el.section === '')
            .map((todo: ToDo) => {
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
      <div className="bottom-block">
        <div className="btn-wrapper">
          <Counter length={toDoCount} />
          <Box
            sx={{
              width: '60%',
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            <ControlButton
              title={'All'}
              setFilter={setFilter}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              toggleRefresh={toggleRefresh}
            />
            <ControlButton
              title={'Active'}
              setFilter={setFilter}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              toggleRefresh={toggleRefresh}
            />
            <ControlButton
              title={'Completed'}
              setFilter={setFilter}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              toggleRefresh={toggleRefresh}
            />
          </Box>

          <ControlButton
            title={'Clear completed'}
            handleClearCompleted={handleClearCompleted}
            toggleRefresh={toggleRefresh}
          />
        </div>
      </div>
    </>
  );
}
