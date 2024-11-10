"use client";

import { useState } from "react";
import {
  Trash2,
  ChevronDown,
  ChevronUp,
  Menu,
  Eye,
  Trash2Icon,
  EyeOffIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { PingTask } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { GetLastPingTime, cn, formatTime } from "@/lib/utils";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoopIcon } from "@radix-ui/react-icons";
import { deleteTask, reactivateTask } from "@/app/actions/task";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export function TaskCard({ Task }: { Task: PingTask }) {
  const [selectedTask, setSelectedTask] = useState<PingTask | null>(null);
  const [isReactivating, setIsReactivating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const toggleTaskDetails = (task: PingTask) => {
    setSelectedTask(selectedTask && selectedTask.ID === task.ID ? null : task);
  };
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDeleteTask = async (Task: PingTask) => {
    try {
      setIsDeleting(true);
      const response = await deleteTask({ taskId: Task.ID });

      if (response) {
        toast({
          title: "Task deleted successfully",
          description: "Task will no longer ping",
        });
        await queryClient.invalidateQueries({ queryKey: ["pingTask"] });
      }
    } catch (err) {
      toast({
        title: "Failed to delete task",
        description: "Please try again later",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  const handleReactivateTask = async (Task: PingTask) => {
    try {
      setIsReactivating(true);
      const response = await reactivateTask({ taskId: Task.ID });

      if (response) {
        toast({
          title: "Task reactivated successfully",
          description: "Task will now start pinging",
        });
        await queryClient.invalidateQueries({ queryKey: ["pingTask"] });
      }
    } catch (err) {
      toast({
        title: "Failed to reactivate task",
        description: "Please try again later",
      });
    } finally {
      setIsReactivating(false);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="space-y-4">
        <Card key={Task.ID}>
          <CardContent className="p-4">
            <TaskHeader
              Task={Task}
              selectedTask={selectedTask}
              ReactivateTask={handleReactivateTask}
              isReactivating={isReactivating}
              toggleTaskDetails={toggleTaskDetails}
              DeleteTask={handleDeleteTask}
              isDeleting={isDeleting}
            />
            <TaskLogs Task={Task} selectedTask={selectedTask} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const TaskHeader = ({
  Task,
  selectedTask,
  ReactivateTask,
  isReactivating,
  toggleTaskDetails,
  DeleteTask,
  isDeleting,
}: {
  Task: PingTask;
  selectedTask: PingTask | null;
  ReactivateTask: (task: PingTask) => void;
  isReactivating: boolean;
  toggleTaskDetails: (task: PingTask) => void;
  DeleteTask: (task: PingTask) => void;
  isDeleting: boolean;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col items-start">
        <h3 className="text-lg font-semibold text-blue-200 text-left ">
          <Link href={Task.url}>
            {new URL(Task.url).hostname + new URL(Task.url).pathname}
          </Link>
        </h3>
        <p className="text-md text-gray-500">
          Last ping: {GetLastPingTime(Task)}
        </p>
      </div>
      <div className="">
        <div className="hidden md:flex space-x-2 items-center">
          <div
            className={`h-3 w-3 rounded-full mr-3 ${
              Task.isActive ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>

          {!Task.isActive && (
            <Button
              variant="default"
              className="hover:bg-green-800"
              onClick={() => ReactivateTask(Task)}
            >
              {isReactivating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <LoopIcon className="h-4 w-4" />
                  Reactivate
                </>
              )}
            </Button>
          )}

          <Button variant="default" onClick={() => toggleTaskDetails(Task)}>
            {selectedTask && selectedTask.ID === Task.ID ? (
              <ChevronUp />
            ) : (
              <ChevronDown />
            )}
          </Button>
          <Button
            variant="default"
            className="hover:bg-red-400"
            onClick={() => DeleteTask(Task)}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
        <MobileMenu
          Task={Task}
          selectedTask={selectedTask}
          ReactivateTask={ReactivateTask}
          toggleTaskDetails={toggleTaskDetails}
          DeleteTask={DeleteTask}
        />
      </div>
    </div>
  );
};

const TaskLogs = ({
  Task,
  selectedTask,
}: {
  Task: PingTask;
  selectedTask: PingTask | null;
}) => {
  return (
    <AnimatePresence>
      {selectedTask && selectedTask.ID === Task.ID && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mt-4"
        >
          <div className="flex flex-col items-start justify-start">
            <h4 className="font-semibold mb-2">Logs</h4>
            {Task.logs.length === 0 ? (
              <p className="text-sm text-foreground/40">No logs available</p>
            ) : (
              <ul className="space-y-2 bg-black/40 w-full flex flex-col justify-center items-start gap-0 px-2 py-3 rounded-xl">
                {Task.logs.map((log, index) => (
                  <li
                    key={index}
                    className={cn(
                      "text-sm text-foreground/40 text-left",
                      log.isSuccess ? "text-green-500" : "text-red-300"
                    )}
                  >
                    <span className="font-medium">{formatTime(log.time)} </span>
                    -- {log.logResponse} -- {log.respCode}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MobileMenu = ({
  Task,
  selectedTask,
  ReactivateTask,
  toggleTaskDetails,
  DeleteTask,
}: {
  Task: PingTask;
  selectedTask: PingTask | null;
  ReactivateTask: (task: PingTask) => void;
  toggleTaskDetails: (task: PingTask) => void;
  DeleteTask: (task: PingTask) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-transparent md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => ReactivateTask(Task)}>
          {!Task.isActive ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <LoopIcon className="mr-2 h-4 w-4" />
              Reactivate
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toggleTaskDetails(Task)}>
          {selectedTask && selectedTask.ID === Task.ID ? (
            <>
              <EyeOffIcon className="mr-2 h-4 w-4" />
              Close Logs
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              View Logs
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => DeleteTask(Task)}>
          <Trash2Icon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
