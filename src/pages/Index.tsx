import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Task } from "@/types";
import { TaskCard } from "@/components/TaskCard";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { toast } from "sonner";

const Index = () => {
  const { t } = useTranslation();
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
    toast.success(t('taskAdded'));
  };

  const handleEditTask = (
    taskId: string,
    title: string,
    description: string,
    priority: 'low' | 'medium' | 'high',
    deadline: Date | undefined,
    tags: string[]
  ) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          title,
          description,
          priority,
          deadline,
          tags,
        };
      }
      return task;
    }));
    toast.success(t('taskUpdated'));
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
    toast.success(t('trackingStarted'));
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
    toast.success(t('trackingStopped'));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <LanguageSwitcher />
        <h1 className="text-3xl font-bold mb-8 text-center">{t('taskOrganizer')}</h1>
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
              onEditTask={handleEditTask}
            />
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              {t('noTasks')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;