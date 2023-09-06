interface ICounterProps {
  length: number;
}

export default function Counter({ length }: ICounterProps) {
  return length === 0 ? (
    <div className="counter">All done</div>
  ) : (
    <div>{`${length} items left`}</div>
  );
}
