import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/input/Input';

describe('Input component', () => {
  test('запись добавляется при клике на кнопку', () => {
    const toggleRefreshMock = jest.fn() as jest.Mock;
    const editIdMock = '';
    render(<Input toggleRefresh={toggleRefreshMock} editId={editIdMock} />);

    const inputField = screen.getByPlaceholderText(
      'What needs to be done'
    ) as HTMLInputElement;
    const addButton = screen.getByText('Add ToDo');

    fireEvent.change(inputField, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(toggleRefreshMock).toHaveBeenCalled();

    expect(inputField.value).toBe('');

    const todosInLocalStorage = JSON.parse(
      localStorage.getItem('todos') || '[]'
    );
    expect(todosInLocalStorage).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: 'New Task',
          isCompleted: false,
        }),
      ])
    );
  });

  test('запись добавляется при клике на Enter', () => {
    const toggleRefreshMock = jest.fn() as jest.Mock;
    const editIdMock = '';
    render(<Input toggleRefresh={toggleRefreshMock} editId={editIdMock} />);

    const inputField = screen.getByPlaceholderText(
      'What needs to be done'
    ) as HTMLInputElement;

    fireEvent.change(inputField, { target: { value: 'New Task' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });

    expect(toggleRefreshMock).toHaveBeenCalled();

    expect(inputField.value).toBe('');

    const todosInLocalStorage = JSON.parse(
      localStorage.getItem('todos') || '[]'
    );
    expect(todosInLocalStorage).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: 'New Task',
          isCompleted: false,
        }),
      ])
    );
  });
});
