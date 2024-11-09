"use client";

import { useState } from "react";
import { PingTask, PingLog } from "@/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CalendarIcon, Globe, Trash, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { deleteTasks } from "@/app/actions/task";
import { cn } from "@/lib/utils";
// Expandable TaskContainer component
const TaskContainer = ({ task }: { task: PingTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTaskDelete = async (url: string) => {
    try {
      await deleteTasks(url);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="rounded-lg  p-4" onClick={toggleExpand}>
      <div className="cursor-pointer flex items-center justify-between">
        <h3 className="text-lg font-semibold text-muted-foreground">
          <Link
            href={task.url}
            target="_blank"
            className="flex flex-row justify-start items-center gap-4"
          >
            <Globe className="text-gray-600" />
            {task.url.replace("https://", "").replace("http://", "")}
          </Link>
        </h3>
        <div className="flex justify-center items-center gap-4">
          <div>
            {task.isActive ? (
              <div className="px-3 py-2 rounded-lg bg-green-800/50">
                <p>Active</p>
              </div>
            ) : (
              <div className="px-3 py-2 rounded-lg bg-red-800/50">
                <p>Inactive</p>
              </div>
            )}
          </div>
          <div onClick={() => handleTaskDelete(task.url)}>
            <TrashIcon className="hover:text-red-500 transition-all text-muted-foreground" />
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={isExpanded ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden mt-4"
      >
        {isExpanded && (
          <div className="space-y-4">
            {task.logs.length > 0 ? (
              <div className="bg-black/20 px-4 py-5 rounded-lg">
                {task.logs.map((log: PingLog, index) => {
                  return (
                    <div
                      className="mb-2 flex justify-start items-center gap-4"
                      key={index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No logs available</p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export { TaskContainer };
