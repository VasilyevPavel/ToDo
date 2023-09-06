import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';

interface IControlButtonProps {
  title: string;
  setFilter?: ((filter: string) => void) | undefined;
  handleClearCompleted?: (() => void) | undefined;
  activeButton?: string;
  setActiveButton?: Dispatch<SetStateAction<string>> | undefined;
}

export default function ControlButton({
  title,
  setFilter,
  handleClearCompleted,
  activeButton,
  setActiveButton,
}: IControlButtonProps) {
  const handleButtonClick = () => {
    switch (title) {
      case 'All':
        setFilter?.('All');
        break;
      case 'Active':
        setFilter?.('Active');
        break;
      case 'Completed':
        setFilter?.('Completed');
        break;
      case 'Clear completed':
        handleClearCompleted?.();
        break;
      default:
        break;
    }

    if (setActiveButton) {
      setActiveButton(title);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleButtonClick}
      color={activeButton === title ? 'success' : 'primary'}
    >
      {title}
    </Button>
  );
}
