import { useTranslation } from "react-i18next";
import { Task } from "@/types";
import { TimeDisplay } from "./TimeDisplay";
import { Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskPriority } from "./TaskPriority";
import { TaskDeadline } from "./TaskDeadline";
import { TaskTags } from "./TaskTags";
import { TaskControls } from "./TaskControls";

interface TaskCardProps {
  task: Task;
  onStartTracking: (taskId: string) => void;
  onStopTracking: (taskId: string) => void;
  onEditTask: (taskId: string, title: string, description: string, priority: 'low' | 'medium' | 'high', deadline: Date | undefined, tags: string[]) => void;
}

export const TaskCard = ({ task, onStartTracking, onStopTracking, onEditTask }: TaskCardProps) => {
  const currentTimeEntry = task.timeEntries.find(entry => !entry.endTime);
  const isTracking = !!currentTimeEntry;

  const totalTime = task.timeEntries.reduce((total, entry) => {
    if (!entry.endTime) return total;
    return total + (entry.endTime.getTime() - entry.startTime.getTime());
  }, 0);

  return (
    <Card className="w-full mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <CardTitle className="text-xl font-semibold">{task.title}</CardTitle>
          <div className="flex items-center gap-2 mt-2">
            <TaskPriority priority={task.priority} />
            {task.deadline && <TaskDeadline deadline={task.deadline} />}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-gray-500" />
          <TimeDisplay 
            startTime={new Date(0)} 
            endTime={new Date(totalTime)} 
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{task.description}</p>
        <TaskTags tags={task.tags} />
        <TaskControls
          task={task}
          isTracking={isTracking}
          currentTimeEntry={currentTimeEntry}
          onStartTracking={onStartTracking}
          onStopTracking={onStopTracking}
          onEditTask={onEditTask}
        />
      </CardContent>
    </Card>
  );
};