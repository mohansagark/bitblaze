import { MdClose } from 'react-icons/md';
import { userProfileData } from '../../../helpers/config';
import avatar from '../../../assets/images/avatar.jpeg';

const UserProfile = ({ closeUserProfile }) => {
  return (
    <div className='nav-item right-1 top-16 bg-surface opacity-95 p-8 rounded-lg w-96'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <p className='font-semibold text-lg text-surface-text'>About Author</p>
        <MdClose
          onClick={closeUserProfile}
          size={24}
          className='text-surface-text cursor-pointer'
        />
      </div>

      {/* Author Info */}
      <div className='flex gap-5 items-center mt-6 border-color border-b-1 pb-6'>
        <img className='rounded-full h-24 w-24' src={avatar} alt='user-profile' />
        <div>
          <p className='font-semibold text-xl text-surface-text'>Mohan Sagar Killamsetty</p>
          <p className='text-sm text-neutral-400'>Administrator</p>
          <p className='text-neutral-400 text-sm font-semibold'>contact@devmohan.in</p>
        </div>
      </div>

      {/* Profile Items */}
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            onClick={() => item.link && window.open(item.link, '_blank')}
            onKeyDown={e => {
              if ((e.key === 'Enter' || e.key === ' ') && item.link) {
                e.preventDefault();
                window.open(item.link, '_blank');
              }
            }}
            role='button'
            tabIndex={0}
            aria-label={`Open ${item.title} link`}
            className={`flex gap-5 p-4 cursor-pointer hover:bg-light-gray dark:hover:bg-[#42464D] ${
              index !== userProfileData.length - 1 ? 'border-b-1 border-color' : ''
            }`}
          >
            <button
              type='button'
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className='text-xl rounded-lg p-3 pointer-events-none'
            >
              {item.icon}
            </button>

            <div>
              <p className='font-semibold text-surface-text'>{item.title}</p>
              <p className='text-neutral-400 text-sm'>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
