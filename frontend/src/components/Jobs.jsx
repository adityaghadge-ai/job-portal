import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Filter, X } from 'lucide-react';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-8">
        
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden mb-4 flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-sm font-semibold text-gray-700">
            Found {filterJobs.length} Jobs
          </span>
          <Button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-[#6A38C2]/30 text-[#6A38C2] hover:bg-[#6A38C2]/10"
          >
            {showMobileFilter ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
            {showMobileFilter ? "Close Filters" : "Filter Jobs"}
          </Button>
        </div>

        {/* Mobile Filter Collapsible Area */}
        <AnimatePresence>
          {showMobileFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mb-6 overflow-hidden"
            >
              <FilterCard />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-64 lg:w-72 shrink-0">
            <div className="sticky top-24">
              <FilterCard />
            </div>
          </div>

          {/* Jobs Listing Grid */}
          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <span className="text-lg font-medium text-gray-600">No Jobs Found</span>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search keywords</p>
            </div>
          ) : (
            <div className="flex-1 pb-10">
              <div className="hidden md:block mb-4 text-sm text-gray-500 font-medium">
                Showing {filterJobs.length} available openings
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Jobs;
