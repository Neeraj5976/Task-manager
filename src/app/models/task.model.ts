export interface Task {
    id: number;
    title: string;
    dueDate: Date;
    assignedTo: string;
    priority: string;
    description?: string;
    status: string;
    completion: number;
  }
  