import { PingTask } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getPings } from "@/app/actions/task";
import { Skeleton } from "./ui/skeleton";
import { TaskCard } from "./cards/Task";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpCircle } from "lucide-react";
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

  if (data?.additional.pings.length === 0) {
    return (
      <Card className="w-[80%] mx-auto">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <ArrowUpCircle className="w-12 h-12 mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
          <p className="text-sm text-muted-foreground">
            Use the button above to add your first task and start being
            productive!
          </p>
        </CardContent>
      </Card>
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
