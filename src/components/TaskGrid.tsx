import React from "react";
import TaskCard from "./TaskCard";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface Task {
  id: string;
  title: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

interface TaskGridProps {
  tasks?: Task[];
  onCreateTask?: () => void;
  onTaskComplete?: (taskId: string, completed: boolean) => void;
}

const TaskGrid = ({
  tasks = [
    {
      id: "1",
      title: "Complete project proposal",
      dueDate: new Date(),
      priority: "high",
      completed: false,
    },
    {
      id: "2",
      title: "Review documentation",
      dueDate: new Date(Date.now() + 86400000),
      priority: "medium",
      completed: false,
    },
    {
      id: "3",
      title: "Update dependencies",
      dueDate: new Date(Date.now() + 172800000),
      priority: "low",
      completed: true,
    },
  ],
  onCreateTask = () => {},
  onTaskComplete = () => {},
}: TaskGridProps) => {
  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Tasks</h2>
        <Button onClick={onCreateTask} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <ScrollArea className="h-[calc(100%-4rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              dueDate={task.dueDate}
              priority={task.priority}
              completed={task.completed}
              onComplete={(completed) => onTaskComplete(task.id, completed)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TaskGrid;
