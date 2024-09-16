import * as React from 'react';

const DistrictSelect= () => {
  return (
    <div className='w-full'>
      <label className="block mb-2 text-sm font-medium text-gray-900 mt-4 lg:mt-0">District</label>
      <select

        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
      >
        <option value="">Choose an option</option>
        <option value="Option1">Option 1</option>
        <option value="Option2">Option 2</option>
        <option value="Option3">Option 3</option>
      </select>
    </div>
  );
};

export default DistrictSelect;
