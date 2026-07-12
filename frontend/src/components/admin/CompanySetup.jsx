import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
const [loading,setLoading]=useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler=(e)=>{
    const file=e.target.files?.[0];
    setInput({...input,file});
  }

  const submitHandler=async(e)=>{
e.preventDefault();
const formData=new FormData();
formData.append("name",input.name);
formData.append("description",input.description);
formData.append("website",input.website);
formData.append("location",input.location);

if(input.file){
    formData.append("file",input.file);
}

  }
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10 ">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8 ">
            <Button
              variant="outline"
              className="flex item-center gap-2 text-gray-500 hover:text-black font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl ">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <Label>Company Name</Label>
              <Input
                className="hover:border-black"
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Description </Label>
              <Input
                className="hover:border-black"
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                className="hover:border-black"
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location </Label>
              <Input
                className="hover:border-black"
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
              <div>
              <Label>Logo </Label>
              <Input
                className="hover:border-black"
                type="file"
                accept="image/*"
                
                onChange={changeFileHandler}
              />
            </div>
          </div>
          <Button type="submit" className="bg-black text-white hover:bg-gray-700 w-full mt-8 ">Update </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
