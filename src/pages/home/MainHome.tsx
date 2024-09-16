import React from 'react';
import DistrictSelect from '../../components/form/DistrictSelect';


const MainHome = () => {
  return (
    <div className='w-3/4 lg:w-3/4 xl:w-2/4 mx-auto border border-white shadow-md bg-white rounded-md lg:h-60 p-6'>
      <p className='mb-2 font-medium text-xl'>Filter</p>
      <hr />
      <div className="flex gap-2 lg:m-4">
        <input
          type="text"
          placeholder='Teacher Name'
          className='w-full h-12 border rounded-lg pl-4 outline-none'
          
        />
        <button
          className='h-12 bg-blue-500 text-white w-20 lg:w-36 border border-blue-500 rounded-lg'
        >
          Search
        </button>
      </div>
      <div className='lg:flex gap-4 lg:m-4'>
        <DistrictSelect />
        <DistrictSelect />
        <DistrictSelect />
        <button
          className='w-full h-11 border border-blue-500 rounded-lg bg-blue-500 text-white lg:w-2/4 mt-7'
          onClick={() => {
            // Optionally handle a search action here
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default MainHome;
