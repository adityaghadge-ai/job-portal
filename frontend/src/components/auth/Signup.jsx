import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { USER_API_END_POINT } from "@/utils/constant";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, UserPlus } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: null,
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select your account role");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 w-full py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg bg-[#0f172a]/90 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-5"
        >
          <div className="text-center mb-6">
            <h1 className="font-extrabold text-2xl sm:text-3xl text-white">Create An Account</h1>
            <p className="text-sm text-slate-400 mt-1">Join JobPortal to find top jobs or recruit talent</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-slate-300">Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Enter your full name"
                required
                className="mt-1 rounded-xl bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-[#8b5cf6]"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-300">Email Address</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="name@example.com"
                required
                className="mt-1 rounded-xl bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-[#8b5cf6]"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-300">Phone Number</Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="10-digit mobile number"
                required
                className="mt-1 rounded-xl bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-[#8b5cf6]"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-300">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Create a strong password"
                required
                className="mt-1 rounded-xl bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-[#8b5cf6]"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <Label className="text-xs font-semibold text-slate-300 block mb-2">Register As</Label>
                <RadioGroup className="flex items-center gap-5">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Input
                      type="radio"
                      id="sr1"
                      name="role"
                      value="student"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="cursor-pointer h-4 w-4 text-[#8b5cf6]"
                    />
                    <Label htmlFor="sr1" className="cursor-pointer font-medium text-slate-300 text-sm">Student</Label>
                  </div>

                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Input
                      type="radio"
                      id="sr2"
                      name="role"
                      value="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="cursor-pointer h-4 w-4 text-[#8b5cf6]"
                    />
                    <Label htmlFor="sr2" className="cursor-pointer font-medium text-slate-300 text-sm">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-300 block mb-1">Profile Photo (Optional)</Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="cursor-pointer text-xs rounded-xl bg-slate-900 border-slate-800 text-slate-300"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full rounded-xl bg-[#8b5cf6] text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </Button>
          )}

          <div className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-[#a78bfa] font-semibold hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
