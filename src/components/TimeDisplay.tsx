import { formatDistanceStrict } from "date-fns";

interface TimeDisplayProps {
  startTime: Date;
  endTime: Date | null;
}

export const TimeDisplay = ({ startTime, endTime }: TimeDisplayProps) => {
  if (!endTime) return null;
  
  return (
    <span className="text-sm text-gray-600">
      {formatDistanceStrict(startTime, endTime)}
    </span>
  );
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};