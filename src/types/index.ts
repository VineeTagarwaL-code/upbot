type TaskLog = {
  status: "success" | "failure";
  responseMessage?: string;
  responseTime?: number;
  responseStatus?: number;
  createdAt: Date;
};

type Task = {
  userId: string;
  url: string;
  interval: number;
  isActive: boolean;
  createdAt: Date;
  logs: TaskLog[];
  lastPingedAt?: Date;
};

export type { TaskLog, Task };
