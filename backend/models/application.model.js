import mongoose from "mongoose";

const applicationSchema=new mongoose.Schema({
     job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
     required:true,
     },
     applicant:{
       type:mongoose.Schema.Types.ObjectId,
        ref:'User',
     required:true,
     },
     status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending',
     },
     aiAnalysis:{
        matchScore: { type: Number, default: 0 },
        matchingSkills: [{ type: String }],
        missingSkills: [{ type: String }],
        summary: { type: String, default: "" },
        recommendations: [{ type: String }],
        analyzedAt: { type: Date }
     }
},{timestamps:true});

export const Application = mongoose.model("Application",applicationSchema);

