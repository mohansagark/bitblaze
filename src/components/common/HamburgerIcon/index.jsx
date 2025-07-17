import { Tooltip } from '@mui/material';
import { useMenu } from '../../../helpers/hooks';

const HamburgerIcon = () => {
  const { menu, toggleMenu } = useMenu();
  return (
    <Tooltip title={menu ? 'Close Sidebar' : 'Open Sidebar'} placement='top'>
      <button
        className='h-5 w-5 bg-background border-none shadow-none hover:shadow-none hover:border-none '
        onClick={toggleMenu}
      >
        <div
          aria-hidden='true'
          className={`absolute h-0.5 w-5 bg-primary transition duration-300 ease-in-out ${
            menu ? 'rotate-45' : '-translate-y-1.5'
          }`}
        />
        <div
          aria-hidden='true'
          className={`absolute h-0.5 w-2.5 bg-primary transition duration-300 ease-in-out ${
            menu ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div
          aria-hidden='true'
          className={`absolute h-0.5 w-5 bg-primary transition duration-300 ease-in-out ${
            menu ? '-rotate-45' : 'translate-y-1.5'
          }`}
        />
      </button>
    </Tooltip>
  );
};
export default HamburgerIcon;
