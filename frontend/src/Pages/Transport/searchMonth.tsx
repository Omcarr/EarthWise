"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../../ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/Popover";
import { frame } from "framer-motion";

const frameworks = [
  { value: "JANUARY", label: "January" },
  { value: "FEBRUARY", label: "February" },
  { value: "MARCH", label: "March" },
  { value: "APRIL", label: "April" },
  { value: "MAY", label: "May" },
  { value: "JUNE", label: "June" },
  { value: "JULY", label: "July" },
  { value: "AUGUST", label: "August" },
  { value: "SEPTEMBER", label: "September" },
  { value: "OCTOBER", label: "October" },
  { value: "NOVEMBER", label: "November" },
  { value: "DECEMBER", label: "December" },
];

export default function SearchMonth() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select month..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="bg-slate-400">
          <CommandInput placeholder="Search month..." className="text-white placeholder:text-gray-400  border-gray-600"/>
          <CommandList className="opaque-list">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                className="text-black cursor-pointer relative py-2 px-2 
                aria-selected:bg-gray-700 hover:bg-gray-700 
                transition-colors duration-150 ease-in-out
                data-[selected=true]:bg-gray-700 
                active:bg-gray-600 
                focus:bg-gray-700 focus:outline-none"
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    console.log(framework.value);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
