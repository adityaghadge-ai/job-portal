import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'

const Companies = () => {
  return (
    <div>
      <Navbar/>
   <div className=" max-w-6xl mx-auto my-10">
    <div className="flex items-center justify-between">
   <Input
    className="w-fit border border-gray-300 focus-visible:ring-0 focus-visible:border-black"
    placeholder="Filter By Name"
  />

  <Button className="bg-black text-white hover:bg-gray-800">
    New Company
  </Button>
    </div>


   <CompaniesTable/>
 
</div>
    </div>
  )
}

export default Companies
