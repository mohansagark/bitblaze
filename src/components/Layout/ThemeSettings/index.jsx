import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { FiSettings } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { Tooltip } from '@mui/material';
import { COLORS } from '../../../helpers/config';
import Switch from '../../common/Switch';
import { useTheme } from '../../../helpers/hooks';

const ThemeSettings = () => {
  const { themeSettings, setThemeSettings, color, mode, changeMode, changeColor } = useTheme();

  const toggleDrawer = open => (event, _reason) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setThemeSettings(open);
  };

  const ThemeBlock = () => (
    <Box role='presentation' className='h-full bg-surface'>
      <div className='flex justify-between items-center p-4 ml-4'>
        <p className='font-semibold text-lg text-surface-text'>Settings</p>
        <button
          type='button'
          onClick={() => setThemeSettings(false)}
          style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
          className='text-2xl p-3 hover:drop-shadow-xl hover:bg-neutral700 bg-background text-surface-text'
        >
          <MdOutlineCancel />
        </button>
      </div>
      <div className='flex-col border-t-1 border-color p-4 ml-4'>
        <p className='font-semibold text-xl text-surface-text'>Theme Option</p>
        <Switch checked={mode === 'dark'} setChecked={e => changeMode(e ? 'dark' : 'light')} />
      </div>
      <div className='p-4 border-t-1 border-color ml-4'>
        <p className='font-semibold text-xl text-surface-text'>Theme Colors</p>
        <div className='flex gap-3'>
          {Object.entries(COLORS).map((item, index) => (
            <Tooltip key={index} title={item[0]} placement='top'>
              <div className='relative mt-2 cursor-pointer  gap-5 items-center' key={item[0]}>
                <button
                  type='button'
                  className='h-10 w-10 rounded-full cursor-pointer flex justify-center items-center'
                  style={{ backgroundColor: item[1] }}
                  onClick={() => changeColor(item[0])}
                >
                  <BsCheck
                    className={`text-2xl text-white flex ${item[0] === color ? 'block' : 'hidden'}`}
                  />
                </button>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </Box>
  );

  return (
    <>
      <div className='fixed right-6 bottom-4' style={{ zIndex: '1000' }}>
        <Tooltip title='Settings' placement='top'>
          <Button
            type='button'
            onClick={toggleDrawer(true)}
            style={{ borderRadius: '50%', aspectRatio: 1, minWidth: 48 }}
            className='bg-primary text-2xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray'
          >
            <FiSettings className='text-primary-text' size={24} />
          </Button>
        </Tooltip>
      </div>
      <Drawer anchor={'right'} open={themeSettings} onClose={toggleDrawer(false)}>
        <ThemeBlock />
      </Drawer>
    </>
  );
};

export default ThemeSettings;
