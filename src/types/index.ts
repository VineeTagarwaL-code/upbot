type PingLog = {
  time: string;
  logResponse: string;
  isSuccess: boolean;
  timeTake: number;
  respCode: number;
};

type PingTask = {
  ID: number;
  url: string;
  isActive: boolean;
  logs: PingLog[];
};

type TAxiosResponse<T = unknown> = {
  message: string;
  additional: T;
};

export type { PingLog, PingTask, TAxiosResponse };
