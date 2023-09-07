interface ICounterProps {
  length: number;
}

export default function Counter({ length }: ICounterProps) {
  return length === 0 ? (
    <div className="counter">All done</div>
  ) : (
    <div>{`${length} ${length === 1 ? 'item' : 'items'} left`}</div>
  );
}
