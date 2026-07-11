import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const CompanyCreate = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What Name would u like to give to your company ? You can change it
            later..
          </p>
          <Label>Company Name</Label>
        </div>

        <Input
          type="text"
          my-2
          className="my-2"
          placeholder="Jobhunt , Microsoft etc."
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            varient="outline"
            onClick={() => navigate("/admin/companies")}
          >
            {" "}
            Cancel
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800">
            {" "}
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
