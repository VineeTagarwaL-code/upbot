"use client";

import { useState } from "react";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PingTask } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { GetLastPingTime, formatTime } from "@/lib/utils";

const mockChartData = [
  { name: "10:00", responseTime: 200 },
  { name: "10:05", responseTime: 180 },
  { name: "10:10", responseTime: 220 },
  { name: "10:15", responseTime: 190 },
  { name: "10:20", responseTime: 200 },
  { name: "10:25", responseTime: 180 },
  { name: "10:30", responseTime: 220 },
  { name: "10:35", responseTime: 190 },
];

export function TaskCard({ Task }: { Task: PingTask }) {
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const toggleTaskDetails = (task: PingTask) => {
    setSelectedTask(selectedTask && selectedTask.id === task.id ? null : task);
  };

  return (
    <div className="container mx-auto">
      <div className="space-y-4">
        <Card key={Task.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold">{Task.url}</h3>
                <p className="text-md text-gray-500">
                  Last ping: {GetLastPingTime(Task)}
                </p>
              </div>
              <div className="flex space-x-2 items-center">
                <div
                  className={`h-3 w-3 rounded-full mr-3 ${
                    Task.isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <Button
                  variant="default"
                  onClick={() => toggleTaskDetails(Task)}
                >
                  {selectedTask && selectedTask.id === Task.id ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </Button>
                <Button variant="default" className="hover:bg-red-400">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <AnimatePresence>
              {selectedTask && selectedTask.id === Task.id && (
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
                      <p className="text-sm text-foreground/40">
                        No logs available
                      </p>
                    ) : (
                      <ul className="space-y-2 bg-black/40 w-full flex flex-col gap-0 px-2 py-3 rounded-xl">
                        {Task.logs.map((log, index) => (
                          <li
                            key={index}
                            className="text-sm text-foreground/40"
                          >
                            <span className="font-medium">
                              {formatTime(log.time)}{" "}
                            </span>
                            -- {log.logResponse}
                          </li>
                        ))}
                      </ul>
                    )}
                    <h4 className="font-semibold mt-4 mb-4 text-2xl">
                      Response Time Graph
                    </h4>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          className="text-black"
                          type="monotone"
                          dataKey="responseTime"
                          stroke="#8884d8"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
