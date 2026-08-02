import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update company");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 my-6 sm:my-10">
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 sm:p-8 border border-gray-100 shadow-xl rounded-2xl space-y-6"
        >
          <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
            <Button
              type="button"
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              size="sm"
              className="rounded-xl flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <h1 className="font-extrabold text-xl sm:text-2xl text-gray-900">Company Setup</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-gray-700">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
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
                placeholder="Company description..."
                className="mt-1 rounded-xl focus-visible:ring-[#6A38C2]"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">Website URL</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="https://company.com"
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
                placeholder="City, Country"
                className="mt-1 rounded-xl focus-visible:ring-[#6A38C2]"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="text-sm font-semibold text-gray-700 block mb-1">Company Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="cursor-pointer text-xs rounded-xl border-gray-200"
              />
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full rounded-xl bg-[#6A38C2] text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating company details...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full rounded-xl bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-semibold shadow-md shadow-purple-100 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Update Details</span>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
