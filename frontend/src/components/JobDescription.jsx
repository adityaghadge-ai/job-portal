import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar';
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT, AI_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowLeft, Calendar, MapPin, Briefcase, DollarSign, Users, Sparkles } from 'lucide-react';
import AIResumeScannerModal from './AIResumeScannerModal';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...(singleJob?.applications || []), { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to apply");
        }
    }

    const handleScanSuitability = async () => {
        if (!user) {
            toast.error("Please login to scan your resume suitability.");
            return;
        }
        try {
            setIsScanning(true);
            setIsAiModalOpen(true);
            const res = await axios.get(`${AI_API_END_POINT}/scan-suitability/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setAiAnalysis(res.data.analysis);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to scan resume suitability.");
        } finally {
            setIsScanning(false);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications?.some(application => application.applicant === user?._id) || false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-10'>
                <Button 
                    onClick={() => navigate(-1)} 
                    variant="ghost" 
                    className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2 p-0 h-auto"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to jobs
                </Button>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 sm:p-8">
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100'>
                        <div>
                            <h1 className='font-bold text-xl sm:text-2xl md:text-3xl text-gray-900'>{singleJob?.title}</h1>
                            <div className='flex items-center gap-2 flex-wrap mt-3'>
                                <Badge className='bg-blue-50 text-blue-700 font-semibold border-none px-3 py-1' variant="ghost">
                                    {singleJob?.position || 0} Positions
                                </Badge>
                                <Badge className='bg-red-50 text-[#F83002] font-semibold border-none px-3 py-1' variant="ghost">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className='bg-purple-50 text-[#7209b7] font-semibold border-none px-3 py-1' variant="ghost">
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                            <Button
                                onClick={handleScanSuitability}
                                variant="outline"
                                className="rounded-xl px-5 py-2.5 text-sm sm:text-base font-semibold border-purple-200 text-[#7209b7] bg-purple-50/50 hover:bg-purple-100 flex items-center gap-2 transition-all"
                            >
                                <Sparkles className="w-4 h-4 text-[#7209b7]" /> Check Suitability with AI
                            </Button>
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`rounded-xl px-6 py-2.5 text-sm sm:text-base font-semibold shadow-sm transition-all ${
                                    isApplied 
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-none' 
                                        : 'bg-[#7209b7] hover:bg-[#5f32ad] text-white shadow-purple-200'
                                }`}
                            >
                                {isApplied ? 'Already Applied' : 'Apply Now'}
                            </Button>
                        </div>
                    </div>

                    <h2 className='font-bold text-lg text-gray-900 py-4 border-b border-gray-100'>Job Highlights & Details</h2>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6 p-4 bg-gray-50/70 rounded-xl border border-gray-100'>
                        <div className="flex items-center gap-3">
                            <Briefcase className="w-5 h-5 text-[#6A38C2]" />
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Role</p>
                                <p className="text-sm font-semibold text-gray-900">{singleJob?.title}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-[#6A38C2]" />
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Location</p>
                                <p className="text-sm font-semibold text-gray-900">{singleJob?.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-[#6A38C2]" />
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Salary Package</p>
                                <p className="text-sm font-semibold text-gray-900">{singleJob?.salary} LPA</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Briefcase className="w-5 h-5 text-[#6A38C2]" />
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Experience Required</p>
                                <p className="text-sm font-semibold text-gray-900">{singleJob?.experience} yrs</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-[#6A38C2]" />
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Total Applicants</p>
                                <p className="text-sm font-semibold text-gray-900">{singleJob?.applications?.length || 0}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-[#6A38C2]" />
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Posted Date</p>
                                <p className="text-sm font-semibold text-gray-900">{singleJob?.createdAt?.split("T")[0] || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-base text-gray-900">Full Description</h3>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                            {singleJob?.description}
                        </p>
                    </div>
                </div>
            </div>

            <AIResumeScannerModal
                isOpen={isAiModalOpen}
                onClose={() => setIsAiModalOpen(false)}
                analysis={aiAnalysis}
                jobTitle={singleJob?.title}
                isLoading={isScanning}
                onReScan={handleScanSuitability}
            />
        </div>
    )
}

export default JobDescription;