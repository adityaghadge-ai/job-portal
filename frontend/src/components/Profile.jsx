import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, FileText, Camera, ShieldCheck, Briefcase } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 pb-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-6 sm:my-10 space-y-6">
        
        {/* Profile Glass Card */}
        <div className="bg-[#0f172a]/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-900/10">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-5">
              <div className="relative group">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-[#8b5cf6] shadow-xl shadow-purple-500/20">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname}
                  />
                </Avatar>
                <button
                  onClick={() => setOpen(true)}
                  className="absolute bottom-0 right-0 p-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
                  title="Change Profile Photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-2xl sm:text-3xl text-white">{user?.fullname}</h1>
                  <Badge className="bg-[#8b5cf6]/20 text-[#a78bfa] border border-[#8b5cf6]/30 capitalize px-2.5 py-0.5 text-xs">
                    {user?.role || "Member"}
                  </Badge>
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  {user?.profile?.bio || "No bio added yet"}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              className="self-end sm:self-start rounded-xl flex items-center gap-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium shadow-lg shadow-purple-500/20"
            >
              <Pen className="w-4 h-4" />
              <span>Edit Profile</span>
            </Button>
          </div>

          {/* Contact Details */}
          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3.5 p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="p-2 rounded-xl bg-purple-500/10 text-[#a78bfa]">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs text-slate-400 font-medium">Email</p>
                <span className="text-sm text-slate-200 font-semibold truncate block">{user?.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="p-2 rounded-xl bg-purple-500/10 text-[#a78bfa]">
                <Contact className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Phone</p>
                <span className="text-sm text-slate-200 font-semibold">{user?.phoneNumber || "Not provided"}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="my-6">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills && user?.profile?.skills.length > 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-purple-950/60 text-[#c084fc] border border-purple-800/40 px-3.5 py-1.5 rounded-xl text-xs font-semibold hover:bg-purple-900/60 transition-colors"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-slate-500 italic">No skills added yet</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="pt-4 border-t border-slate-800">
            <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Uploaded Resume</Label>
            {user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={user?.profile?.resume}
                className="inline-flex items-center gap-2.5 text-sm text-[#a78bfa] font-semibold hover:text-white bg-purple-950/40 px-4 py-2.5 rounded-xl border border-purple-800/40 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>{user?.profile?.resumeOriginalName || "Download Resume"}</span>
              </a>
            ) : (
              <span className="text-sm text-slate-500 italic">No resume uploaded yet</span>
            )}
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-[#8b5cf6]" />
            <h1 className="font-extrabold text-xl sm:text-2xl text-white">Applied Jobs</h1>
          </div>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
