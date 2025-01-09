import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { PlayCircle, StopCircle, Edit2 } from "lucide-react";
import { AddTaskDialog } from "./AddTaskDialog";
import { Task } from "@/types";
import { formatTime } from "./TimeDisplay";

interface TaskControlsProps {
  task: Task;
  isTracking: boolean;
  currentTimeEntry: { startTime: Date } | undefined;
  onStartTracking: (taskId: string) => void;
  onStopTracking: (taskId: string) => void;
  onEditTask: (taskId: string, title: string, description: string, priority: 'low' | 'medium' | 'high', deadline: Date | undefined, tags: string[]) => void;
}

export const TaskControls = ({ 
  task, 
  isTracking, 
  currentTimeEntry, 
  onStartTracking, 
  onStopTracking, 
  onEditTask 
}: TaskControlsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center">
      <div className="text-sm text-gray-500">
        {currentTimeEntry && (
          <span>{t('startedAt')} {formatTime(currentTimeEntry.startTime)}</span>
        )}
      </div>
      <div className="flex gap-2">
        <AddTaskDialog
          mode="edit"
          task={task}
          onEditTask={onEditTask}
          onAddTask={() => {}}
          trigger={
            <Button variant="outline" size="sm">
              <Edit2 className="w-4 h-4 mr-2" />
              {t('edit')}
            </Button>
          }
        />
        <Button
          variant={isTracking ? "destructive" : "default"}
          size="sm"
          onClick={() => {
            if (isTracking) {
              onStopTracking(task.id);
            } else {
              onStartTracking(task.id);
            }
          }}
        >
          {isTracking ? (
            <>
              <StopCircle className="w-4 h-4 mr-2" />
              {t('stop')}
            </>
          ) : (
            <>
              <PlayCircle className="w-4 h-4 mr-2" />
              {t('start')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};