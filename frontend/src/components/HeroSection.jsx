import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchJobHandler();
    }
  };

  return (
    <div className="text-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-[#090d16] text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6 max-w-4xl mx-auto"
      >
        <span className="mx-auto px-4 py-1.5 rounded-full bg-purple-950/80 text-[#c084fc] border border-purple-800/50 font-semibold text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-lg shadow-purple-900/20">
          <Sparkles className="w-4 h-4 text-[#c084fc]" />
          <span>No. 1 Job Hunt Platform</span>
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Search, Apply & <br className="hidden sm:inline" /> Get Your{" "}
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
            Dream Job
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
          Discover thousands of career opportunities from top tech leaders. Start your journey today!
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex w-full sm:w-[90%] md:w-[80%] lg:w-[60%] shadow-2xl shadow-purple-950/40 border border-slate-800 pl-4 rounded-full items-center gap-2 mx-auto bg-[#0f172a]/90 backdrop-blur-xl hover:border-[#8b5cf6]/60 transition-all focus-within:ring-2 focus-within:ring-[#8b5cf6]/40"
        >
          <input
            type="text"
            placeholder="Find your dream job by title, skill, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="outline-none border-none w-full text-sm sm:text-base text-slate-100 placeholder-slate-400 bg-transparent"
          />
          <Button
            onClick={searchJobHandler}
            className="h-11 sm:h-12 rounded-r-full bg-[#8b5cf6] hover:bg-[#7c3aed] px-5 sm:px-6 flex items-center justify-center shrink-0 transition-all shadow-lg shadow-purple-500/30 active:scale-95 text-white"
          >
            <Search className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
