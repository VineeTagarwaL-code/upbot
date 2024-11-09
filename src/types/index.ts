type PingLog = {
  time: string;
  logResponse: string;
  isSuccess: boolean;
};

type PingTask = {
  url: string;
  isActive: boolean;
  logs: PingLog[];
};

type TAxiosResponse<T = unknown> = {
  message: string;
  additional: T;
};

export type { PingLog, PingTask, TAxiosResponse };
