import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi', 'Mumbai', 'Hydrabad', 'Kolkata', 'Pune'],
  },
  {
    filterType: 'Industry',
    array: ['Data Scientist', 'Python Developer', 'Backend Developer', 'Frontend Developer', 'FullStack Developer'],
  },
  {
    filterType: 'Salary',
    array: ['25-40K', '41k-1Lac', '1-5Lac'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const ChangeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={ChangeHandler}>
        {filterData.map((item, i) => (
          <div key={item.filterType + i}>
            <h1 className="font-bold text-lg">{item.filterType}</h1>
            {item.array.map((value, j) => (
              <div key={value + j} className="flex text-sm items-center space-x-2 my-2">
                <RadioGroupItem value={value} id={`radio-${i}-${j}`} />
                <Label htmlFor={`radio-${i}-${j}`}>{value}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
