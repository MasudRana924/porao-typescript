import React, { useState } from 'react';
import DistrictSelect from '../../components/form/DistrictSelect';

import { AppDispatch, RootState } from "../../features/store";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTutionPost } from '../../features/tuition/tuitionsSlice';

const MainHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [teacherName, setTeacherName] = useState('');
  const [area, setArea] = useState('');
  const [versityName, setVersityName] = useState('');
  const [city, setCity] = useState('');
  const handleSearch = () => {
    dispatch(fetchTutionPost({ teacherName, versityName, city,area }));
  };
  return (
    <div className='w-3/4 lg:w-3/4 xl:w-2/4 mx-auto border border-white shadow-md bg-white rounded-md lg:h-60 p-6'>
      <p className='mb-2 font-medium text-xl'>Filter</p>
      <hr />
      <div className=" mt-4 flex gap-2 lg:m-4">
        <input
          type="text"
          placeholder='Teacher Name'
          className='w-full h-12 border rounded-lg pl-4 outline-none'
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
        />
        <button
          className='h-12 bg-blue-500 text-white w-20 lg:w-36 border border-blue-500 rounded-lg'
        >
          Search
        </button>
      </div>

      <div className="lg:flex gap-2 lg:m-4">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded-md p-2 w-full h-12 mt-2 lg:mt-0"
        />
        <input
          type="text"
          placeholder="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="border rounded-md p-2 w-full h-12 mt-2 lg:mt-0 "
        />
        <input
          type="text"
          placeholder="Versity Name"
          value={versityName}
          onChange={(e) => setVersityName(e.target.value)}
          className="border rounded-md p-2 w-full h-12 mt-2 lg:mt-0"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full h-12 mt-2 lg:mt-0"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default MainHome;
