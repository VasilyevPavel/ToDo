import { render, screen, fireEvent } from '@testing-library/react';
import ToDoList from '../components/todoList/ToDoList';

describe('ToDoList component', () => {
  const mockLocalStorage = [
    { id: '1', text: 'Task 1', isCompleted: false },
    { id: '2', text: 'Task 2', isCompleted: false },
    { id: '3', text: 'Task 3', isCompleted: false },
  ];

  const clearMockLocalStorage: any[] = [];

  const setLocalStorageData = (data: any) => {
    localStorage.setItem('todos', JSON.stringify(data));
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('рендерит пустой список', () => {
    setLocalStorageData(clearMockLocalStorage);

    render(<ToDoList refresh={false} />);

    const headerElement = screen.getByText(/There are no todo's/i);
    expect(headerElement).toBeTruthy();
  });

  test('рендерит список задач', () => {
    setLocalStorageData(mockLocalStorage);

    render(<ToDoList refresh={false} />);

    const task1 = screen.getByText('Task 1');
    const task2 = screen.getByText('Task 2');
    const task3 = screen.getByText('Task 3');

    expect(task1).toBeTruthy();
    expect(task2).toBeTruthy();
    expect(task3).toBeTruthy();
  });

  test('меняет статус задач', () => {
    setLocalStorageData(mockLocalStorage);

    render(<ToDoList refresh={false} />);

    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    checkboxes.forEach((checkbox) => {
      expect(checkbox.checked).toBe(false);
    });

    fireEvent.click(checkboxes[0]);

    expect(checkboxes[0].checked).toBe(true);

    fireEvent.click(checkboxes[0]);

    expect(checkboxes[0].checked).toBe(false);
  });

  test('показывает только невыполненные задачи при нажатии на "Active"', () => {
    setLocalStorageData(mockLocalStorage);

    render(<ToDoList refresh={false} />);

    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    checkboxes.forEach((checkbox) => {
      expect(checkbox.checked).toBe(false);
    });

    fireEvent.click(checkboxes[0]);

    expect(checkboxes[0].checked).toBe(true);

    const activeButton = screen.getByText('Active');
    fireEvent.click(activeButton);

    const task1 = screen.queryByText('Task 1');
    const task2 = screen.queryByText('Task 2');
    const task3 = screen.queryByText('Task 3');

    expect(task1).toBeFalsy();
    expect(task2).toBeTruthy();
    expect(task3).toBeTruthy();
  });

  test('показывает только выполненные задачи при нажатии на "Completed"', () => {
    setLocalStorageData(mockLocalStorage);

    render(<ToDoList refresh={false} />);

    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    checkboxes.forEach((checkbox) => {
      expect(checkbox.checked).toBe(false);
    });

    fireEvent.click(checkboxes[0]);

    expect(checkboxes[0].checked).toBe(true);

    const activeButton = screen.getByText('Completed');
    fireEvent.click(activeButton);

    const task1 = screen.queryByText('Task 1');
    const task2 = screen.queryByText('Task 2');
    const task3 = screen.queryByText('Task 3');

    expect(task1).toBeTruthy();
    expect(task2).toBeFalsy();
    expect(task3).toBeFalsy();
  });

  test('удаляет все выполненные задачи при нажатии на "Clear completed"', () => {
    setLocalStorageData([
      ...mockLocalStorage,
      { id: '4', text: 'Task 4', isCompleted: true },
      { id: '5', text: 'Task 5', isCompleted: true },
    ]);

    render(<ToDoList refresh={false} />);

    const clearCompletedButton = screen.getByText('Clear completed');
    fireEvent.click(clearCompletedButton);

    const task4 = screen.queryByText('Task 4');
    const task5 = screen.queryByText('Task 5');

    expect(task4).toBeFalsy();
    expect(task5).toBeFalsy();
  });
});
