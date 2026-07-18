import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant.js";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice.js";
const useGetAllJobs = () => {
    const dispatch=useDispatch();
  const { searchedQuery } = useSelector(store => store.job);
  useEffect(()=>{
const fetchAllJobs=async()=>{
   try{
const res=await axios.get(`https://job-portal-2-1eaf.onrender.com/api/v1/job/get?keyword=${searchedQuery}`,{withCredentials:true});
if(res.data.success){
   dispatch(setAllJobs(res.data.jobs));
}
   }
   catch(error){
    console.log(error);
   }
}
fetchAllJobs();
  },[searchedQuery,dispatch])
}

export default useGetAllJobs
