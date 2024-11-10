import { PingTask } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getPings } from "@/app/actions/task";
import { Skeleton } from "./ui/skeleton";
import { TaskCard } from "./cards/Task";
export const TaskContainer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pingTask"],
    queryFn: async () => getPings(),
    refetchInterval: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="space-y-4 w-[80%]">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              className="h-12  bg-muted-foreground rounded-xl"
              key={index}
            />
          ))}
      </div>
    );
  }

  if (error) {
    return <p>Failed to fetch tasks</p>;
  }
  return (
    <div className="w-[80%] flex justify-center items-start flex-col gap-3">
      {data?.additional.pings.map((task: PingTask) => {
        return <TaskCard key={task.ID} Task={task} />;
      })}
    </div>
  );
};
