import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";

const Job = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex item-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex item-center gap-2 my-2 ">
        <Button>
          <Avatar>
            <AvatarImage src="https://thfvnext.bing.com/th/id/OIP.zPZ5iEhi91xrNkVh7cS0WwHaHa?w=205&h=205&c=7&r=0&o=7&cb=thfvnextfalcon3&pid=1.7&rm=3" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
          molestias! Recusandae rem minus soluta dolorem fugiat, veritatis
          laudantium vero eos.
        </p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
                      <Badge className={'text-blue-700 font-bold'} variant="ghost"> Positions</Badge>
                      <Badge className={'text-[#F83002] font-bold'} variant="ghost">Part Time </Badge>
                      <Badge className={'text-[#7209b7] font-bold'} variant="ghost">4 LPA</Badge>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <Button variant="outline">Details</Button>
                    <Button className={'bg-[#7209b7] text-white'}>Save for Later</Button>
                  </div>
    </div>
  );
};

export default Job;
