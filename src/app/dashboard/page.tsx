"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CalendarIcon } from "lucide-react";

import { SectionWrapper } from "@/components/Section-wrapper";
import { getPings, addTasks } from "@/app/actions/task";
import { TaskContainer } from "@/components/Task";
import { useToast } from "@/hooks/use-toast";
import AddTaskForm from "@/components/forms/addTask";
import { PingTask } from "@/types";

const TaskSkeleton = () => {
  return (
    <div className="animate-pulse bg-[#121213] rounded-lg shadow p-4"></div>
  );
};

const Page = () => {
  const [tasks, setTasks] = useState<PingTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getUserTasks() {
    try {
      const response = await getPings();
      if (!response) {
        throw new Error("Failed to fetch tasks");
      }
      console.log(response.additional.pings);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserTasks();
  }, []);

  return (
    <SectionWrapper>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <AddTaskForm open={isModalOpen} onOpenChange={setIsModalOpen} />
            </div>
            {loading ? (
              <div className="flex flex-col w-[70%] mx-auto gap-4">
                <TaskSkeleton />
                <TaskSkeleton />
                <TaskSkeleton />
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center p-12 bg-stone-900/20 rounded-lg border-2 border-dashed border-gray-700">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-500" />
                <h3 className="mt-2 text-sm font-medium text-white">
                  No tasks scheduled
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Get started by creating a new task.
                </p>
              </div>
            ) : (
              <div className="flex flex-col w-[70%] mx-auto gap-4">
                {tasks.map((task, index) => (
                  <div key={index} className=" bg-[#121213] rounded-lg shadow">
                    <TaskContainer task={task} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </SectionWrapper>
  );
};

export default Page;
