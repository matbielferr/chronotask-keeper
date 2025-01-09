import { useTranslation } from "react-i18next";
import { Task } from "@/types";
import { TimeDisplay, formatTime } from "./TimeDisplay";
import { Button } from "@/components/ui/button";
import { PlayCircle, StopCircle, Timer, Calendar, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  task: Task;
  onStartTracking: (taskId: string) => void;
  onStopTracking: (taskId: string) => void;
}

const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
  switch (priority) {
    case 'low':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const TaskCard = ({ task, onStartTracking, onStopTracking }: TaskCardProps) => {
  const { t } = useTranslation();
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
            <Badge className={getPriorityColor(task.priority)}>
              {t(task.priority)}
            </Badge>
            {task.deadline && (
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(task.deadline).toLocaleDateString()}
              </div>
            )}
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
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {task.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="flex items-center">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {currentTimeEntry && (
              <span>{t('startedAt')} {formatTime(currentTimeEntry.startTime)}</span>
            )}
          </div>
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
      </CardContent>
    </Card>
  );
};