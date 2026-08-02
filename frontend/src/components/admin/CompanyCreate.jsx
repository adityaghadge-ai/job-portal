import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name");
      return;
    }

    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to register company");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 sm:px-6 my-8 sm:my-16">
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h1 className="font-extrabold text-2xl text-gray-900">Your Company Name</h1>
            <p className="text-sm text-gray-500 mt-1">
              What name would you like to give to your company? You can modify company details anytime later.
            </p>
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-700 block mb-1">Company Name</Label>
            <Input
              type="text"
              className="rounded-xl border-gray-200 focus-visible:ring-[#6A38C2]"
              placeholder="e.g. Google, Microsoft, JobPortal Ltd."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-xl shadow-md shadow-purple-100"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
