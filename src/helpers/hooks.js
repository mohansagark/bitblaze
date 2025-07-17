import { useDispatch, useSelector } from 'react-redux';
import { useContext, useRef } from 'react';
import { setMenubar, startConfetti, stopConfetti } from '../redux/slices/generalSlice';
import { sidebarWidth as sbWidth, headerHeight, footerHeight } from './config';
import { ThemeContext } from '../themes';

export const useTheme = () => useContext(ThemeContext);

export const useConfetti = () => {
  const dispatch = useDispatch();

  const showConfetti = () => {
    dispatch(startConfetti());
  };
  const hideConfetti = () => {
    dispatch(stopConfetti());
  };

  return {
    showConfetti,
    hideConfetti,
  };
};

export const useMenu = () => {
  const dispatch = useDispatch();
  const { menubar: menu, isMobile } = useSelector(state => state.general);

  const sidebarWidth = !isMobile && menu ? sbWidth : 0;

  const toggleMenu = () => {
    dispatch(setMenubar(!menu)); // Dispatching the action to toggle the menu
  };

  return {
    menu,
    toggleMenu,
    isMobile,
    sidebarWidth,
    headerHeight,
    footerHeight,
  };
};

export const useAudio = () => {
  const audioRefs = useRef({});

  const playSound = (id = 'audio') => {
    try {
      const audioRef = audioRefs.current[id];
      if (audioRef) {
        // Reset audio to beginning if already playing
        audioRef.currentTime = 0;
        const playPromise = audioRef.play();

        // Handle promise-based play() method
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            if (process.env.NODE_ENV === 'development') {
              // eslint-disable-next-line no-console
              console.warn(`Audio play failed for ${id}:`, error);
            }
          });
        }
      } else if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(`Audio with id "${id}" not found. Did you register it?`);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(`Error playing audio ${id}:`, error);
      }
    }
  };

  const registerAudio = (id = 'audio', variant = 'button') => {
    try {
      if (audioRefs.current[id]) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn(`Audio with id "${id}" already registered`);
        }
        return;
      }

      const audioRef = document.createElement('audio');
      audioRef.src = `/audio/${variant}.mp3`;
      audioRef.preload = 'auto';

      // Handle audio loading errors
      audioRef.addEventListener('error', e => {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(`Failed to load audio file: /audio/${variant}.mp3`, e);
        }
      });

      audioRefs.current[id] = audioRef;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(`Error registering audio ${id}:`, error);
      }
    }
  };

  const stopSound = (id = 'audio') => {
    try {
      const audioRef = audioRefs.current[id];
      if (audioRef) {
        audioRef.pause();
        audioRef.currentTime = 0;
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(`Error stopping audio ${id}:`, error);
      }
    }
  };

  const setVolume = (id = 'audio', volume = 1) => {
    try {
      const audioRef = audioRefs.current[id];
      if (audioRef) {
        audioRef.volume = Math.max(0, Math.min(1, volume));
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(`Error setting volume for audio ${id}:`, error);
      }
    }
  };

  return { playSound, registerAudio, stopSound, setVolume };
};
