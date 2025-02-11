import React from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { format } from "date-fns";

interface TaskCardProps {
  title?: string;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  completed?: boolean;
  onComplete?: (completed: boolean) => void;
}

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

const TaskCard = ({
  title = "Sample Task",
  dueDate = new Date(),
  priority = "medium",
  completed = false,
  onComplete = () => {},
}: TaskCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="w-96 h-40 p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={completed}
              onCheckedChange={(checked) => onComplete(checked as boolean)}
              className="mt-1"
            />
            <div>
              <h3
                className={`text-lg font-medium ${completed ? "line-through text-gray-400" : ""}`}
              >
                {title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Due: {format(dueDate, "MMM d, yyyy")}
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={`${priorityColors[priority]} capitalize`}
          >
            {priority}
          </Badge>
        </div>
        <div className="mt-4 flex gap-2">
          {/* Placeholder for additional task metadata or quick actions */}
          <div className="text-sm text-gray-500">
            Created {format(new Date(), "MMM d")}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
