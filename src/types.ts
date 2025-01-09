export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  deadline?: Date;
  tags: string[];
  timeEntries: TimeEntry[];
}

export interface TimeEntry {
  id: string;
  startTime: Date;
  endTime: Date | null;
}