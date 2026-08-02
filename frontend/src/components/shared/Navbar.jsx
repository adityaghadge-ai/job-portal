import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { setUser } from "@/redux/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User2, Menu, X, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-[#090d16]/90 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8b5cf6] to-[#ec4899] flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Job<span className="text-[#a78bfa]">Portal</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6 text-slate-300 text-sm">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className={`hover:text-[#a78bfa] transition-colors py-1 ${
                      isActive("/admin/companies") ? "text-[#a78bfa] font-semibold border-b-2 border-[#8b5cf6]" : ""
                    }`}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className={`hover:text-[#a78bfa] transition-colors py-1 ${
                      isActive("/admin/jobs") ? "text-[#a78bfa] font-semibold border-b-2 border-[#8b5cf6]" : ""
                    }`}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className={`hover:text-[#a78bfa] transition-colors py-1 ${
                      isActive("/") ? "text-[#a78bfa] font-semibold border-b-2 border-[#8b5cf6]" : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className={`hover:text-[#a78bfa] transition-colors py-1 ${
                      isActive("/jobs") ? "text-[#a78bfa] font-semibold border-b-2 border-[#8b5cf6]" : ""
                    }`}
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className={`hover:text-[#a78bfa] transition-colors py-1 ${
                      isActive("/browse") ? "text-[#a78bfa] font-semibold border-b-2 border-[#8b5cf6]" : ""
                    }`}
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:text-white rounded-xl px-5 text-sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-xl px-5 shadow-lg shadow-purple-500/25 transition-all text-sm font-semibold">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-[#8b5cf6]/40 hover:ring-[#8b5cf6] transition-all">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 shadow-2xl bg-[#0f172a] border-slate-800 text-slate-100 rounded-2xl">
                <div>
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                    <Avatar className="cursor-pointer border border-[#8b5cf6]/30">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">{user?.fullname}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{user?.profile?.bio || "Job seeker"}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 pt-3 text-slate-300">
                    {user && user.role === "student" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <User2 className="w-4 h-4 text-[#a78bfa]" />
                        <span>View Profile</span>
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl text-red-400 hover:bg-red-950/40 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-8 w-8 ring-1 ring-[#8b5cf6]">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-3 shadow-2xl bg-[#0f172a] border-slate-800 text-slate-100 rounded-2xl mr-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-white">{user?.fullname}</h4>
                    <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 pt-2">
                  {user.role === "student" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl hover:bg-slate-800 text-slate-200"
                    >
                      <User2 className="w-4 h-4 text-[#a78bfa]" />
                      <span>View Profile</span>
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl text-red-400 hover:bg-red-950/40 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#090d16] px-4 pt-3 pb-6 space-y-3">
          <ul className="flex flex-col gap-2 font-medium text-slate-300">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl ${
                      isActive("/admin/companies") ? "bg-purple-950/50 text-[#a78bfa] font-semibold" : "hover:bg-slate-900"
                    }`}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl ${
                      isActive("/admin/jobs") ? "bg-purple-950/50 text-[#a78bfa] font-semibold" : "hover:bg-slate-900"
                    }`}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl ${
                      isActive("/") ? "bg-purple-950/50 text-[#a78bfa] font-semibold" : "hover:bg-slate-900"
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl ${
                      isActive("/jobs") ? "bg-purple-950/50 text-[#a78bfa] font-semibold" : "hover:bg-slate-900"
                    }`}
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl ${
                      isActive("/browse") ? "bg-purple-950/50 text-[#a78bfa] font-semibold" : "hover:bg-slate-900"
                    }`}
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user && (
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center bg-slate-900 border-slate-800 text-slate-200">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center bg-[#8b5cf6] hover:bg-[#7c3aed] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
