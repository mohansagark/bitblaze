import Typography from '@mui/material/Typography';
import { FaCode } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  const gotoHome = () => navigate('/');
  return (
    <div
      className='flex whitespace-nowrap cursor-pointer'
      onClick={gotoHome}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          gotoHome();
        }
      }}
      role='button'
      tabIndex={0}
      aria-label='Go to home page'
    >
      <FaCode size={36} className='text-primary flex mr-2' />
      <Typography
        variant='h6'
        noWrap
        component='a'
        className='text-primary'
        sx={{
          mr: 2,
          display: 'flex',
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          textDecoration: 'none',
        }}
      >
        BITBLAZE
      </Typography>
    </div>
  );
};

export default Logo;
