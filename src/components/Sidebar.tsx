import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface SidebarProps {
  categories?: string[];
  selectedCategories?: string[];
  onCategoryChange?: (category: string) => void;
  selectedPriority?: string;
  onPriorityChange?: (priority: string) => void;
  dateRange?: { from: Date; to: Date };
  onDateRangeChange?: (range: { from: Date; to: Date }) => void;
}

const Sidebar = ({
  categories = ["Work", "Personal", "Shopping", "Health", "Education"],
  selectedCategories = [],
  onCategoryChange = () => {},
  selectedPriority = "",
  onPriorityChange = () => {},
  dateRange = { from: new Date(), to: new Date() },
  onDateRangeChange = () => {},
}: SidebarProps) => {
  return (
    <Card className="h-full w-[280px] p-4 bg-white border-r">
      <div className="space-y-6">
        {/* Categories Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    selectedCategories.includes(category)
                      ? "default"
                      : "outline"
                  }
                  className="mr-2 cursor-pointer"
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Priority Filter */}
        <div>
          <Label className="text-lg font-semibold">Priority</Label>
          <Select value={selectedPriority} onValueChange={onPriorityChange}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Picker */}
        <div>
          <Label className="text-lg font-semibold">Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal mt-2"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={{
                  from: dateRange?.from,
                  to: dateRange?.to,
                }}
                onSelect={(range: any) => onDateRangeChange(range)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
