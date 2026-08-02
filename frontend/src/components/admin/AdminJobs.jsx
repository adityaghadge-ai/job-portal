import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Plus, Search } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-6 sm:my-10">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-md mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                className="pl-9 rounded-xl border border-gray-200 focus-visible:ring-[#6A38C2]"
                placeholder="Filter by role, company name..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-xl flex items-center justify-center gap-2 shadow-md shadow-purple-100"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Job</span>
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-4 sm:p-6">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs;
