import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import Lottie from 'lottie-react';
import animationData from '../../assets/lottie/404-search.json'; // ✅ Update the path if needed

const NotFound = () => {
  return (
    <Container center>
      <div className='w-full max-w-md text-center flex flex-col items-center gap-6 py-12 px-4'>
        <div className='w-100 h-100'>
          <Lottie animationData={animationData} loop autoplay />
        </div>

        <Button
          text='Back to Home'
          onClick={() => (window.location.href = '/')}
          className='rounded-lg'
          bgColor='var(--color-primary)'
          bgHoverColor='var(--color-success)'
          textColor='var(--color-primary-text)'
          id='go-home'
          sound
          variant='secondary'
        />
      </div>
    </Container>
  );
};

export default NotFound;
