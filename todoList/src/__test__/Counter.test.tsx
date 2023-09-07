import { render, screen } from '@testing-library/react';
import Counter from '../components/counter/Counter';

describe('Counter component', () => {
  test('выводит "All done" если нет задач', () => {
    render(<Counter length={0} />);
    const counterElement = screen.getByText('All done');
    expect(counterElement).toBeTruthy();
  });

  test('выводит корректное значение', () => {
    const length: number = 5;
    render(<Counter length={length} />);
    const counterElement = screen.getByText(`${length} items left`);
    expect(counterElement).toBeTruthy();
  });

  test('корректная запись при одной задаче', () => {
    const length: number = 1;
    render(<Counter length={length} />);
    const counterElement = screen.getByText(`${length} item left`);
    expect(counterElement).toBeTruthy();
  });
});
