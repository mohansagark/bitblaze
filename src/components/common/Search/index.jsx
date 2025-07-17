import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { MdClear } from 'react-icons/md';

const SearchBar = ({ onSearch = () => null }) => {
  const [query, setQuery] = useState('');

  const search = q => {
    setQuery(q);
    onSearch(q);
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div className='flex justify-center rounded-lg overflow-hidden'>
      <button type='submit' className='bg-background hover:bg-background text-primary pl-3 py-2'>
        <IoIosSearch size={20} />
      </button>
      <input
        type='text'
        placeholder='Search...'
        className='w-full border text-primary outline-none bg-background border-background pl-1 py-2 align-middle'
        value={query}
        onChange={e => search(e.target.value)}
      />
      {query && (
        <button
          type='submit'
          className='bg-background hover:bg-background text-primary pr-2 py-2'
          onClick={clearSearch}
        >
          <MdClear size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
