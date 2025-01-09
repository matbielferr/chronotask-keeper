import { Calendar } from "lucide-react";

interface TaskDeadlineProps {
  deadline: Date;
}

export const TaskDeadline = ({ deadline }: TaskDeadlineProps) => {
  return (
    <div className="flex items-center text-sm text-gray-500">
      <Calendar className="w-4 h-4 mr-1" />
      {new Date(deadline).toLocaleDateString()}
    </div>
  );
};