export interface Timesheet {
              // Unique identifier for the log entry
    task: number;         // The task number this log entry belongs to
    date: Date;             // The date the log entry was created
    timeSpent: number;    // Hours logged (in decimal format, e.g., 1.5 for 1 hour 30 minutes)
    notes: string;          // Additional notes for the log entry
  }
  