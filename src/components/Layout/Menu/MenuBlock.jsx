import { Box } from '@mui/material';
import { MdOutlineClose } from 'react-icons/md';
import { useMenu } from '../../../helpers/hooks';
import SideDrawer from '../Sidebar';
import { mobileSidebarWidth } from '../../../helpers/config';

const MenuBlock = () => {
  const { toggleMenu } = useMenu();
  return (
    <Box role='presentation' sx={{ width: mobileSidebarWidth }} className='h-full bg-surface'>
      <div className='absolute right-5 top-5'>
        <MdOutlineClose size={24} className='text-primary' onClick={toggleMenu} />
      </div>
      <SideDrawer />
    </Box>
  );
};

export default MenuBlock;
