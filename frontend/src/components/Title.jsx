import React from 'react';

function Title({ text1, text2 }) {
  return (
    <div className='inline-flex gap-2 items-center mb-3  items-center justify-center'>
      <p className='text-gray-500 gap-x-2 flex'>
        {text1}
        <span className='text-gray-800 font-medium'>{text2}</span>
      </p>
      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-800'></p>
    </div>
  );
}

export default Title;