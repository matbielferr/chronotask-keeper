import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Task } from "@/types";

interface AddTaskDialogProps {
  onAddTask: (title: string, description: string, priority: 'low' | 'medium' | 'high', deadline: Date | undefined, tags: string[]) => void;
  onEditTask?: (taskId: string, title: string, description: string, priority: 'low' | 'medium' | 'high', deadline: Date | undefined, tags: string[]) => void;
  task?: Task;
  mode?: 'add' | 'edit';
  trigger?: React.ReactNode;
}

export const AddTaskDialog = ({ onAddTask, onEditTask, task, mode = 'add', trigger }: AddTaskDialogProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [deadline, setDeadline] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  useEffect(() => {
    if (task && mode === 'edit') {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDeadline(task.deadline ? new Date(task.deadline).toISOString().slice(0, 16) : "");
      setTags(task.tags.join(", "));
    }
  }, [task, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const parsedDeadline = deadline ? new Date(deadline) : undefined;
    const parsedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    if (mode === 'edit' && task && onEditTask) {
      onEditTask(task.id, title, description, priority, parsedDeadline, parsedTags);
    } else {
      onAddTask(title, description, priority, parsedDeadline, parsedTags);
    }

    setTitle("");
    setDescription("");
    setPriority('medium');
    setDeadline("");
    setTags("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {t('addNewTask')}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? t('editTask') : t('addNewTask')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder={t('taskTitle')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Textarea
              placeholder={t('taskDescription')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('priority')}</Label>
            <RadioGroup
              value={priority}
              onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low">{t('low')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">{t('medium')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high">{t('high')}</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>{t('deadline')}</Label>
            <Input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div>
            <Label>{t('tags')}</Label>
            <Input
              placeholder={t('tagsPlaceholder')}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            {mode === 'edit' ? t('saveChanges') : t('addNewTask')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};