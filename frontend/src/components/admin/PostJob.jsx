import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2, PlusCircle, ArrowLeft } from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      toast.error("Please select a company before posting");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-6 sm:my-10">
        <Button
          onClick={() => navigate("/admin/jobs")}
          variant="ghost"
          className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2 p-0 h-auto"
        >
          <ArrowLeft className="w-4 h-4" /> Back to jobs
        </Button>

        <form
          onSubmit={submitHandler}
          className="bg-white p-6 sm:p-8 border border-gray-100 shadow-xl rounded-2xl"
        >
          <div className="text-center mb-6">
            <h1 className="font-extrabold text-2xl text-gray-900">Post A New Job</h1>
            <p className="text-sm text-gray-500 mt-1">Fill out job specifications to recruit top talent</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-gray-700">Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="e.g. Senior Frontend Developer"
                required
                className="mt-1 rounded-xl focus-visible:ring-[#6A38C2]"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Brief role description..."
                required
                className="mt-1 rounded-xl focus-visible:ring-[#6A38C2]"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="React, Node.js, Tailwind..."
                required
                className="mt-1 rounded-xl focus-visible:ring-[#6A38C2]"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">Salary (LPA)</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="e.g. 12"
                required
                className="mt-1 rounded-xl focus-visible:ring-[#6A38C2]"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="e.g. Remote, Bangalore"
                required
                className="mt-1 rounded-xl focus-visible:ring-[#6A38C2]"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="e.g. Full-time, Part-time"
                required
                className="mt-1 rounded-xl focus-visible:ring-[#6A38C2]"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">Experience Level (Years)</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="e.g. 2"
                required
                className="mt-1 rounded-xl focus-visible:ring-[#6A38C2]"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="e.g. 5"
                required
                className="mt-1 rounded-xl focus-visible:ring-[#6A38C2]"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="text-sm font-semibold text-gray-700 block mb-1">Select Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full rounded-xl border-gray-200">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100 shadow-lg">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-600 font-semibold mt-1">
                  * Please register at least one company before posting a job.
                </p>
              )}
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full my-6 rounded-xl bg-[#6A38C2] text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting Job...
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={companies.length === 0}
              className="w-full my-6 rounded-xl bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-semibold shadow-md shadow-purple-100 flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Job</span>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
