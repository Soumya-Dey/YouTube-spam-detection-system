import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Error = ({ error, setSearchParams }) => {
  return (
    <div className='error-div'>
      {error}{' '}
      <button onClick={() => setSearchParams({})}>
        <XMarkIcon className='h-6 w-6' />
      </button>
    </div>
  );
};

export default Error;
