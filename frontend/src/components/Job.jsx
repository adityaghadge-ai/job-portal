import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return "Recently";
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        const days = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
        return days === 0 ? "Today" : `${days} days ago`;
    }

    const toggleBookmark = (e) => {
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
        toast.success(isBookmarked ? "Job removed from saved list" : "Job saved for later!");
    };

    return (
        <div className='p-6 rounded-3xl shadow-xl bg-[#0f172a]/90 backdrop-blur-xl border border-slate-800 hover:border-[#8b5cf6]/50 transition-all duration-300 flex flex-col justify-between h-full group text-slate-100 hover:shadow-2xl hover:shadow-purple-950/20'>
            <div>
                <div className='flex items-center justify-between gap-2'>
                    <p className='text-xs font-medium text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800'>
                        {daysAgoFunction(job?.createdAt)}
                    </p>
                    <Button
                        onClick={toggleBookmark}
                        variant="ghost"
                        className={`rounded-full h-9 w-9 p-0 hover:bg-purple-950/50 ${isBookmarked ? "text-[#c084fc] fill-[#c084fc]" : "text-slate-500"}`}
                        size="icon"
                    >
                        <Bookmark className="h-5 w-5" />
                    </Button>
                </div>

                <div className='flex items-center gap-3 my-4'>
                    <Avatar className="h-12 w-12 border border-slate-800 bg-slate-900 p-0.5 rounded-2xl shadow-xs">
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                    </Avatar>
                    <div>
                        <h1 className='font-bold text-base text-white group-hover:text-[#a78bfa] transition-colors'>{job?.company?.name || "Company"}</h1>
                        <p className='text-xs text-slate-400 flex items-center gap-1 mt-0.5'>
                            <MapPin className="w-3.5 h-3.5 text-[#a78bfa]" />
                            {job?.location || "India"}
                        </p>
                    </div>
                </div>

                <div className="my-3">
                    <h1 className='font-extrabold text-lg text-white line-clamp-1'>{job?.title}</h1>
                    <p className='text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed'>{job?.description}</p>
                </div>
            </div>

            <div className="mt-4">
                <div className='flex items-center gap-2 flex-wrap mb-4'>
                    <Badge className='bg-blue-950/60 text-blue-400 border border-blue-800/40 px-2.5 py-1 text-xs rounded-xl font-semibold'>
                        {job?.position} Positions
                    </Badge>
                    <Badge className='bg-red-950/60 text-pink-400 border border-red-800/40 px-2.5 py-1 text-xs rounded-xl font-semibold'>
                        {job?.jobType}
                    </Badge>
                    <Badge className='bg-purple-950/60 text-[#c084fc] border border-purple-800/40 px-2.5 py-1 text-xs rounded-xl font-semibold'>
                        {job?.salary} LPA
                    </Badge>
                </div>

                <div className='flex items-center gap-3 pt-3 border-t border-slate-800'>
                    <Button
                        onClick={() => navigate(`/description/${job?._id}`)}
                        variant="outline"
                        className="w-1/2 rounded-xl text-xs bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-white"
                    >
                        Details
                    </Button>
                    <Button
                        onClick={toggleBookmark}
                        className={`w-1/2 rounded-xl text-xs transition-all ${isBookmarked ? "bg-slate-800 text-slate-200" : "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-lg shadow-purple-500/25"}`}
                    >
                        {isBookmarked ? "Saved" : "Save For Later"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Job;