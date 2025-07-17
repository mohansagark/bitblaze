import React from 'react';

const ChessGrid = () => {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const numbers = [8, 7, 6, 5, 4, 3, 2, 1];
  const gridLength = letters.length * numbers.length;

  const getCellBgColor = index => {
    const row = Math.floor(index / letters.length);
    const col = index % letters.length;
    const isEven = (row + col) % 2 === 0;
    return isEven ? 'bg-black' : 'bg-white';
  };

  const initialPositions = {
    a1: '♖',
    b1: '♘',
    c1: '♗',
    d1: '♕',
    e1: '♔',
    f1: '♗',
    g1: '♘',
    h1: '♖',
    a2: '♙',
    b2: '♙',
    c2: '♙',
    d2: '♙',
    e2: '♙',
    f2: '♙',
    g2: '♙',
    h2: '♙',
    a7: '♟',
    b7: '♟',
    c7: '♟',
    d7: '♟',
    e7: '♟',
    f7: '♟',
    g7: '♟',
    h7: '♟',
    a8: '♜',
    b8: '♞',
    c8: '♝',
    d8: '♛',
    e8: '♚',
    f8: '♝',
    g8: '♞',
    h8: '♜',
  };

  return (
    <div className='flex w-full justify-center items-center'>
      <div className='grid grid-cols-8 grid-rows-8 gap-0'>
        {Array.from({ length: gridLength }, (_, index) => (
          <div
            key={index}
            className={`size-20 flex items-center justify-center text-primary text-5xl ${getCellBgColor(
              index,
            )}`}
          >
            {
              initialPositions[
                `${letters[index % letters.length]}${numbers[Math.floor(index / letters.length)]}`
              ]
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChessGrid;
