import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const companyArray=[]

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form action="" className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Title </Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Description </Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Requirements  </Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
           <div>
            <Label>Salary  </Label>
            <Input
              type="text"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
           <div>
            <Label> Location </Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
           <div>
            <Label>Job Type  </Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
           <div>
            <Label> Experience Level</Label>
            <Input
              type="text"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

           <div>
            <Label>No. of positions   </Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
        </div>

        <Button className="bg-black text-white hover:bg-gray-700 w-full mt-4">Post new Job</Button>
        {
companyArray.length===0 && <p className="text-xs text-red-600 font-bold text-center my-3">*Please Register a company , before posting a job</p>
        }
        </form>
      </div>
    </div>
  );
};

export default PostJob;
