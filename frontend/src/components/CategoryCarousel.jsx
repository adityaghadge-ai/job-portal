import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "DevOps Engineer",
  "UI/UX Designer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="px-4 sm:px-6 bg-[#090d16] py-2">
      <Carousel className="w-full max-w-xl mx-auto my-6 sm:my-12 relative">
        <CarouselContent className="-ml-2 md:-ml-4">
          {category.map((cat) => (
            <CarouselItem
              key={cat}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/2 lg:basis-1/3"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full w-full py-2 text-xs sm:text-sm font-medium bg-[#0f172a]/90 text-slate-200 border-slate-800 hover:border-[#8b5cf6] hover:text-[#a78bfa] hover:bg-purple-950/40 transition-all shadow-md truncate"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="hidden sm:block">
          <CarouselPrevious className="-left-10 bg-slate-900 border-slate-800 text-slate-300 hover:bg-[#8b5cf6] hover:text-white transition-colors" />
          <CarouselNext className="-right-10 bg-slate-900 border-slate-800 text-slate-300 hover:bg-[#8b5cf6] hover:text-white transition-colors" />
        </div>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;