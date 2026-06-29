import React from 'react'
import { RadioGroup } from './ui/radio-group'
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
  return (
    <div>
  
  <h1>Filter Jobs</h1>
  <hr className="mt-3"/>
  <RadioGroup>
    {
        filterData.map((data,index)=(
            <div></div>
        ))
    }
  </RadioGroup>
  
    </div>
  )
}

export default FilterCard
