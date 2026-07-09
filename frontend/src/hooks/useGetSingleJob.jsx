import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant.js";
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice.js";
const useGetSingleJob = () => {
    const dispatch=useDispatch();
  useEffect(()=>{
const fetchSingleJob=async()=>{
   try{
const res=await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
if(res.data.success){
   dispatch(setAllJobs(res.data.jobs));
}
   }
   catch(error){
    console.log(error);
   }
}
fetchSingleJob();
  },[])
}

export default useGetSingleJob;
