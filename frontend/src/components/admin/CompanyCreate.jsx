import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'

const CompanyCreate = () => {
  return (
    <div>
      <Navbar/>
      <div className="max-w-4xl mx-auto">
<h1 className="font-bold text-2xl">
    Your Company Name
</h1>
<p className="text-gray-500">What Name would u like to give to your company ? You can change it later..</p>
<Label>Company Name</Label>
      </div>
    </div>
  )
}

export default CompanyCreate
