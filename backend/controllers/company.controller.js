import {Company} from "../models/company.model.js"
export const registerCompan=async(req,res)=>{
    try {
         const {companyName}=req.body;
         if(!companyName){
            return res.status(400).json({
                message:"Company Name is required",
                success:"false"
            })
         } 
         let company =await  Company.findOne({name:companyName}) ; 
         if(company){
            return res.status(400).json({
                message:"You Cannot register same company",
                success:"false"

            })
         };
         company=await Company.create({
            name:companyName,
            userId=req.id
         })

         return res.status(201).json({
            message:"Company registered successfully",
            company,
            success:true
         })
    } catch (error) {
         console.log(error);
    }
}

export const getCompany=async(req,res)=>{
    try {
        const usedId=req.id;   // logged in user id
        const companies= await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
        }
    } catch (error) {
        console.log(error);
    }
}

// get company by id 

