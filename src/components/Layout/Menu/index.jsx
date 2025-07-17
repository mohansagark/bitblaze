import React from 'react';
import { Drawer } from '@mui/material';
import { useMenu } from '../../../helpers/hooks';
import MenuBlock from './MenuBlock';
import HamburgerIcon from '../../common/HamburgerIcon';

const CustomMenu = () => {
  const { menu, toggleMenu, isMobile } = useMenu();
  return (
    <>
      <HamburgerIcon />
      <Drawer anchor={'left'} open={isMobile && menu} onClose={toggleMenu}>
        <MenuBlock />
      </Drawer>
    </>
  );
};

export default CustomMenu;
