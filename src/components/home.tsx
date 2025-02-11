import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TaskGrid from "./TaskGrid";
import CreateTaskModal from "./CreateTaskModal";

interface Task {
  id: string;
  title: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

const Home = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: new Date(),
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleCreateTask = (data: any) => {
    console.log("Creating task:", data);
    setIsCreateModalOpen(false);
  };

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    console.log(`Task ${taskId} ${completed ? "completed" : "uncompleted"}`);
  };

  return (
    <div className="h-screen w-full bg-white">
      <Header upcomingTasks={5} overdueTasks={2} />

      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        <div className="flex-1 overflow-hidden">
          <TaskGrid
            onCreateTask={() => setIsCreateModalOpen(true)}
            onTaskComplete={handleTaskComplete}
          />
        </div>
      </div>

      <CreateTaskModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreateTask}
      />
    </div>
  );
};

export default Home;
