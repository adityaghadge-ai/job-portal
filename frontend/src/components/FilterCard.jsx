import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Filter, RotateCcw } from 'lucide-react'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Pune", "Mumbai", "Banglore", "Hyderabad"]
  },
  {
    filterType: "Industry",
    array: ["Frontend developer", "Backend developer", "FullStack developer", "Data Science"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "40k-1Lakh", "1Lakh-5Lakh", "5Lakh+"]
  }
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  }

  const clearFilterHandler = () => {
    setSelectedValue('');
    dispatch(setSearchedQuery(''));
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));  
  }, [selectedValue, dispatch])

  return (
    <div className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#6A38C2]" />
          <h1 className="font-bold text-lg text-gray-900">Filter Jobs</h1>
        </div>
        {selectedValue && (
          <Button 
            onClick={clearFilterHandler} 
            variant="ghost" 
            size="sm"
            className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 p-1.5 h-auto flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Clear
          </Button>
        )}
      </div>

      <hr className="my-4 border-gray-100" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-4">
        {filterData.map((data, index) => (
          <div key={index} className="space-y-2">
            <h2 className="font-semibold text-sm text-gray-800 tracking-wide uppercase text-xs text-gray-500">
              {data.filterType}
            </h2>
            <div className="space-y-1.5 pt-1">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={idx} className="flex items-center space-x-2 py-0.5">
                    <RadioGroupItem value={item} id={itemId} className="text-[#6A38C2] border-gray-300 focus:ring-[#6A38C2]" />
                    <Label htmlFor={itemId} className="text-sm font-normal text-gray-700 hover:text-gray-900 cursor-pointer">
                      {item}
                    </Label>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard;
