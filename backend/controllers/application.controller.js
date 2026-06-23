import { application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob=async(req,res)=>{
    try {
      const userId=req.id;
      const jobId=req.params.id;
      if(!jobId){
        return res.status(400).json({
            message:"Job id is required",
            success:false
        })
      }
      // check if user has already aplied for job 

      const existingApplication=await application.findOne({job:jobId, applicant:userId});
      if(existingApplication){
        res.status(400).json({
            message:"You have already applied for this job",
            success:false
        })
      }

      // check if the job exist
       const job=await Job.findById(jobId);
      if(!job){
        return res.status(404).json({
            message:"Job not found",
            success:false
        })

      }

      // create new application 

      const newApplication =await Application.create({
        job:jobId,
        applicant:userId
      });
      job.applications.push(newApplication._id);
      await job.save();

      return res.status(201).json({
        message:"Job Applied Successfully",
        success:true
      })

    } catch (error) {
         console.log(error);
    }
};
