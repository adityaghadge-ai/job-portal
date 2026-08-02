import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import React from "react";
import { MapPin } from "lucide-react";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="p-6 rounded-3xl shadow-xl bg-[#0f172a]/90 backdrop-blur-xl border border-slate-800 cursor-pointer hover:-translate-y-1.5 transition-all duration-300 group hover:border-[#8b5cf6]/50 hover:shadow-2xl hover:shadow-purple-900/20 flex flex-col justify-between h-full text-slate-100"
    >
      <div>
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 border border-slate-800 bg-slate-900">
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
          </Avatar>
          <div>
            <h1 className="font-bold text-base text-white group-hover:text-[#a78bfa] transition-colors">
              {job?.company?.name || "Company"}
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#a78bfa]" />
              {job?.location || "India"}
            </p>
          </div>
        </div>

        <div className="my-4">
          <h1 className="font-extrabold text-lg text-white line-clamp-1">{job?.title}</h1>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {job?.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap mt-4 pt-3 border-t border-slate-800/80">
        <Badge className="bg-blue-950/60 text-blue-400 border border-blue-800/40 px-2.5 py-1 text-xs rounded-xl font-semibold">
          {job?.position} positions
        </Badge>
        <Badge className="bg-red-950/60 text-pink-400 border border-red-800/40 px-2.5 py-1 text-xs rounded-xl font-semibold">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-950/60 text-[#c084fc] border border-purple-800/40 px-2.5 py-1 text-xs rounded-xl font-semibold">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
