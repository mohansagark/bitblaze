import React from 'react';
import { FaCode } from 'react-icons/fa6';
import { GiSpades, GiHearts, GiDiamonds, GiClubs } from 'react-icons/gi';

const Card = ({ show = false, card = { symbol: 1, number: 1 } }) => {
  const numbers = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: 'J',
    12: 'Q',
    13: 'K',
  };
  const symbols = {
    1: <GiSpades />,
    2: <GiHearts />,
    3: <GiDiamonds />,
    4: <GiClubs />,
  };
  return (
    <div
      className={`flex items-center justify-center cursor-pointer w-full h-full border rounded-lg ${
        show ? 'border-primary bg-background ' : 'border-background bg-primary '
      }`}
    >
      {show ? (
        <div className='flex items-center justify-center relative w-full h-full'>
          <div className='text-primary absolute top-1 left-1'>{numbers[card.number]}</div>
          <div className='text-primary'>{symbols[card.symbol]}</div>
          <div className='text-primary absolute bottom-1 right-1'>{numbers[card.number]}</div>
        </div>
      ) : (
        <FaCode size={36} className='text-background flex' />
      )}
    </div>
  );
};

export default Card;
