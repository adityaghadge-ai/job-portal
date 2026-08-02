import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { USER_API_END_POINT } from "@/utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, LogIn } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select a role");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
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
          className="w-full max-w-md bg-[#0f172a]/90 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6"
        >
          <div className="text-center mb-6">
            <h1 className="font-extrabold text-2xl sm:text-3xl text-white">Welcome Back</h1>
            <p className="text-sm text-slate-400 mt-1">Sign in to manage your account and applications</p>
          </div>

          <div className="space-y-4">
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
              <Label className="text-xs font-semibold text-slate-300">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter your password"
                required
                className="mt-1 rounded-xl bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-[#8b5cf6]"
              />
            </div>

            <div className="pt-2">
              <Label className="text-xs font-semibold text-slate-300 block mb-2">Login As</Label>
              <RadioGroup className="flex items-center gap-6">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="radio"
                    id="r1"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer h-4 w-4 text-[#8b5cf6]"
                  />
                  <Label htmlFor="r1" className="cursor-pointer font-medium text-slate-300 text-sm">Student</Label>
                </div>

                <div className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="radio"
                    id="r2"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer h-4 w-4 text-[#8b5cf6]"
                  />
                  <Label htmlFor="r2" className="cursor-pointer font-medium text-slate-300 text-sm">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full rounded-xl bg-[#8b5cf6] text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </Button>
          )}

          <div className="text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#a78bfa] font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
