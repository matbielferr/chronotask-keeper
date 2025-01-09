export interface Task {
  id: string;
  title: string;
  description: string;
  timeEntries: TimeEntry[];
}

export interface TimeEntry {
  id: string;
  startTime: Date;
  endTime: Date | null;
}