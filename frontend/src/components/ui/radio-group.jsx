import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";

function RadioGroup({ className, ...props }) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "h-5 w-5 rounded-full border-2 border-black flex items-center justify-center focus:outline-none",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator>
        <div className="h-2.5 w-2.5 rounded-full bg-black" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };