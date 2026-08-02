import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 my-6 sm:my-10">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2 p-0 h-auto"
        >
          <ArrowLeft className="w-4 h-4" /> Back to jobs
        </Button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
            <div>
              <h1 className="font-extrabold text-xl sm:text-2xl text-gray-900">Job Applicants</h1>
              <p className="text-sm text-gray-500 mt-1">Review candidates who applied for this position</p>
            </div>
            <span className="bg-[#6A38C2]/10 text-[#6A38C2] font-semibold text-sm px-3.5 py-1.5 rounded-full">
              {applicants?.applications?.length || 0} Total
            </span>
          </div>

          <ApplicantsTable />
        </div>
      </div>
    </div>
  )
}

export default Applicants;
