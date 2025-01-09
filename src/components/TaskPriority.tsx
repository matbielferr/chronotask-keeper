import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

interface TaskPriorityProps {
  priority: 'low' | 'medium' | 'high';
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

export const TaskPriority = ({ priority }: TaskPriorityProps) => {
  const { t } = useTranslation();
  
  return (
    <Badge className={getPriorityColor(priority)}>
      {t(priority)}
    </Badge>
  );
};