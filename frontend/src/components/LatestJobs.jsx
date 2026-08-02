import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 sm:my-20 bg-[#090d16] text-slate-100">
      <div className="text-left mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Latest & Top </span>Job Openings
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-1">Explore high-paying positions curated for tech professionals</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {allJobs.length <= 0 ? (
          <div className="col-span-full text-center py-12 bg-[#0f172a] rounded-3xl border border-dashed border-slate-800">
            <span className="text-slate-400 font-medium">No Jobs Available At The Moment</span>
          </div>
        ) : (
          allJobs.slice(0, 6).map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <LatestJobCards job={job} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default LatestJobs;
