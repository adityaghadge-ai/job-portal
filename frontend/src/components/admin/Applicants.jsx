import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT, AI_API_END_POINT } from '@/utils/constant';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { ArrowLeft, Sparkles, UserCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applicants } = useSelector(store => store.application);

  const [isScanning, setIsScanning] = useState(false);

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

  const handleTriggerAiScan = async () => {
    try {
      setIsScanning(true);
      toast.info("Scanning & ranking applicants with AI engine...");
      const res = await axios.post(`${AI_API_END_POINT}/rank-applicants/${params.id}`, {}, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        // Update applications list with updated aiAnalysis scores
        if (applicants) {
          dispatch(setAllApplicants({
            ...applicants,
            applications: res.data.applications
          }));
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to rank applicants with AI.");
    } finally {
      setIsScanning(false);
    }
  };

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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-gray-100 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-xl sm:text-2xl text-gray-900">Job Applicants</h1>
                <span className="bg-purple-100 text-purple-700 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Powered
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Manage, scan resume suitability, rank matching skills & contact students directly on WhatsApp.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="bg-[#6A38C2]/10 text-[#6A38C2] font-semibold text-sm px-3.5 py-1.5 rounded-full">
                {applicants?.applications?.length || 0} Total Applicants
              </span>
            </div>
          </div>

          <ApplicantsTable
            isScanning={isScanning}
            onTriggerAiScan={handleTriggerAiScan}
          />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
