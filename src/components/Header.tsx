import React from "react";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HeaderProps {
  upcomingTasks?: number;
  overdueTasks?: number;
}

const Header = ({ upcomingTasks = 3, overdueTasks = 2 }: HeaderProps) => {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between fixed top-0 z-50">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold text-gray-900">Task Manager</h1>
      </div>

      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                {(upcomingTasks > 0 || overdueTasks > 0) && (
                  <span className="absolute -top-1 -right-1">
                    <Badge
                      variant="destructive"
                      className="h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {upcomingTasks + overdueTasks}
                    </Badge>
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                <p>{upcomingTasks} upcoming tasks</p>
                <p>{overdueTasks} overdue tasks</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Help
          </Button>
          <Button variant="ghost" size="sm">
            Settings
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
