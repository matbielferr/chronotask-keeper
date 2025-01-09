import { useState } from "react";
import { Task } from "@/types";
import { TaskCard } from "@/components/TaskCard";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { toast } from "sonner";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (
    title: string,
    description: string,
    priority: 'low' | 'medium' | 'high',
    deadline: Date | undefined,
    tags: string[]
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      deadline,
      tags,
      timeEntries: [],
    };
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully");
  };

  const handleStartTracking = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          timeEntries: [
            ...task.timeEntries,
            { id: crypto.randomUUID(), startTime: new Date(), endTime: null }
          ]
        };
      }
      return task;
    }));
    toast.success("Time tracking started");
  };

  const handleStopTracking = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          timeEntries: task.timeEntries.map(entry => {
            if (!entry.endTime) {
              return { ...entry, endTime: new Date() };
            }
            return entry;
          })
        };
      }
      return task;
    }));
    toast.success("Time tracking stopped");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Task Organizer</h1>
        <div className="mb-6">
          <AddTaskDialog onAddTask={handleAddTask} />
        </div>
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStartTracking={handleStartTracking}
              onStopTracking={handleStopTracking}
            />
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No tasks yet. Add your first task to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;