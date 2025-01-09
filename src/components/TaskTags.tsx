import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TaskTagsProps {
  tags: string[];
}

export const TaskTags = ({ tags }: TaskTagsProps) => {
  if (tags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="flex items-center">
          <Tag className="w-3 h-3 mr-1" />
          {tag}
        </Badge>
      ))}
    </div>
  );
};