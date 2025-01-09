import { useState } from "react";
import { Task } from "@/types";
import { TimeDisplay, formatTime } from "./TimeDisplay";
import { Button } from "@/components/ui/button";
import { PlayCircle, StopCircle, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskCardProps {
  task: Task;
  onStartTracking: (taskId: string) => void;
  onStopTracking: (taskId: string) => void;
}

export const TaskCard = ({ task, onStartTracking, onStopTracking }: TaskCardProps) => {
  const currentTimeEntry = task.timeEntries.find(entry => !entry.endTime);
  const isTracking = !!currentTimeEntry;

  const totalTime = task.timeEntries.reduce((total, entry) => {
    if (!entry.endTime) return total;
    return total + (entry.endTime.getTime() - entry.startTime.getTime());
  }, 0);

  return (
    <Card className="w-full mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">{task.title}</CardTitle>
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
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {currentTimeEntry && (
              <span>Started at {formatTime(currentTimeEntry.startTime)}</span>
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
                Stop
              </>
            ) : (
              <>
                <PlayCircle className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};