import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://thfvnext.bing.com/th/id/OIP.zPZ5iEhi91xrNkVh7cS0WwHaHa?w=205&h=205&c=7&r=0&o=7&cb=thfvnextfalcon3&pid=1.7&rm=3"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus in fuga veritatis!
              </p>
            </div>
          </div>

          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>

<div className="my-5">
  <div className="flex items-center gap-3 my-2 ">
   <Mail/>
  <span>sanika@gmail.com</span>
  </div>
  <div className="flex items-center gap-3 my-2">
<Contact/>
  <span>
    8010284110
  </span>
  </div>
 
  
</div>
  <div>
    <h1>Skills </h1>
    {
      [1,2,3,4].map((item,index)=><Badge key={index}>{item}</Badge>

      )
    }
  </div>
      </div>
    </div>
  );
};

export default Profile;
