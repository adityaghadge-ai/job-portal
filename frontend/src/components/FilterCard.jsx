import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
const filterData=[
    {
        filterType:"Location",
        array:["Delhi NCR ","Pune","Mumbai","Banglore","Hyderabad"]
    },
     {
        filterType:"Industry",
        array:["Frontend developer","Backend developer","FullStack developer"]
    },
     {
        filterType:"Salary",
        array:["0-40k","40k-1Lakh","1Lakh-5Lakh"]
    }
]
const FilterCard = () => {
    const [selectedValue,setSelectedValue]=useState('');
    const dispatch=useDispatch();
    const changeHandler=(value)=>{
setSelectedValue(value);
    }

    useEffect(()=>{
      dispatch(setSearchedQuery(selectedValue));  
    },[selectedValue])
  return (
    <div className="w-full bg-white p-3 rounded-md">
  
  <h1 className="font-bold text-lg">Filter Jobs</h1>
  <hr className="mt-3"/>
  <RadioGroup value={selectedValue} onValueChange={changeHandler}>
    {
        filterData.map((data,index)=>(
            <div className="font-bold text-lg">
                <h1>{data.filterType}</h1>
                {
                    data.array.map((item,idx)=>{
                        const itemId=`id${index}-${idx}`;
                        return (
                            <div className="flex item-center space-x-2 my-2">
                                <RadioGroupItem value={item} id={itemId} />
                                <Label htmlFor={itemId}>{item}</Label>
                                </div>
                        )
                    })
                }
            </div>
        ))
    }
  </RadioGroup>

    </div>
  )
}

export default FilterCard
