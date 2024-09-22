"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PlusIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SectionWrapper } from "@/components/Section-wrapper";
import { getTasks, addTasks } from "@/app/actions/task";
import { Task, TaskLog } from "@/types";
import { TaskContainer } from "@/components/Task";
import { useToast } from "@/hooks/use-toast";

// Skeleton Loader Component
const TaskSkeleton = () => {
  return (
    <div className="animate-pulse bg-[#121213] rounded-lg shadow p-4"></div>
  );
};

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ url: "", interval: "" });
  const [url, setUrl] = useState("");
  const [interval, setIntervalValue] = useState(0);
  const { toast } = useToast();
  async function getUserTasks() {
    try {
      const response = await getTasks();
      if (!response) {
        throw new Error("Failed to fetch tasks");
      }
      setTasks(response.additional.tasks);
      setLoading(false); // Set loading to false once the data is fetched
    } catch (err) {
      console.log(err);
      setLoading(false); // Handle loading state even in case of error
    }
  }

  useEffect(() => {
    setLoading(true);
    getUserTasks();
    const intervalId = setInterval(() => {
      getUserTasks();
    }, 60000); // 60000 ms = 1 minute

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await addTasks(url, interval);
      if (!response) {
        throw new Error("Failed to add task");
      }
      toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
      await getUserTasks();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SectionWrapper>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>

              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-black hover:bg-gray-200">
                    <PlusIcon className="mr-2 h-4 w-4" /> Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 text-white">
                  <DialogHeader>
                    {!(tasks.length > 2) && (
                      <DialogTitle>Add New Task</DialogTitle>
                    )}
                  </DialogHeader>
                  <form onSubmit={handleAddTask} className="space-y-4">
                    <div>
                      <Label htmlFor="url">URL</Label>
                      <Input
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="bg-gray-800 text-white border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="interval">Interval (in minutes)</Label>
                      <Input
                        id="interval"
                        value={interval}
                        onChange={(e) =>
                          setIntervalValue(parseInt(e.target.value))
                        }
                        placeholder="30"
                        type="number"
                        className="bg-gray-800 text-white border-gray-700"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-white text-black hover:bg-gray-200"
                    >
                      Add Task
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              // Show skeletons while loading
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
