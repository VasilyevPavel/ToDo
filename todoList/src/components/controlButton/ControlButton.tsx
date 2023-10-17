import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';
import { useMediaQuery } from '@mui/material';

interface IControlButtonProps {
  title: string;
  setFilter?: ((filter: string) => void) | undefined;
  handleClearCompleted?: (() => void) | undefined;
  activeButton?: string;
  setActiveButton?: Dispatch<SetStateAction<string>> | undefined;
  toggleRefresh: () => void;
}

export default function ControlButton({
  title,
  setFilter,
  handleClearCompleted,
  activeButton,
  setActiveButton,
  toggleRefresh,
}: IControlButtonProps) {
  const isMobile = useMediaQuery('(max-width:768px)');
  const handleButtonClick = () => {
    switch (title) {
      case 'All':
        toggleRefresh();
        setFilter?.('All');
        break;
      case 'Active':
        toggleRefresh();
        setFilter?.('Active');
        break;
      case 'Completed':
        toggleRefresh();
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
      className="btn"
      variant="contained"
      onClick={handleButtonClick}
      color={activeButton === title ? 'success' : 'primary'}
      sx={{
        fontSize: isMobile ? '10px' : '16px',
        padding: isMobile ? '8px 16px' : '10px 20px',
        marginRight: isMobile ? '10px' : '0px',
      }}
    >
      {title}
    </Button>
  );
}
