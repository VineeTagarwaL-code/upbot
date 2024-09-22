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

const Page = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ url: "", interval: "" });
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders after the client has mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration issues by not rendering the page until client has mounted
  if (!isMounted) {
    return null; // or you can return a loading spinner here
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks([...tasks, newTask]);
    setNewTask({ url: "", interval: "" });
    setIsModalOpen(false);
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
                    <DialogTitle>Add New Task</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddTask} className="space-y-4">
                    <div>
                      <Label htmlFor="url">URL</Label>
                      <Input
                        id="url"
                        value={newTask.url}
                        onChange={(e) =>
                          setNewTask({ ...newTask, url: e.target.value })
                        }
                        placeholder="https://example.com"
                        className="bg-gray-800 text-white border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="interval">Interval (in minutes)</Label>
                      <Input
                        id="interval"
                        value={newTask.interval}
                        onChange={(e) =>
                          setNewTask({ ...newTask, interval: e.target.value })
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

            {tasks.length === 0 ? (
              <div className="text-center p-12 bg-stone-900/20 rounded-lg border-2 border-dashed border-gray-700">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-500" />
                <h3 className="mt-2 text-sm font-medium text-white">
                  No tasks scheduled
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Get started by creating a new task.
                </p>
                <div className="mt-6">
                  <Button className="bg-white text-black hover:bg-gray-200">
                    <PlusIcon className="mr-2 h-4 w-4" /> Add New Task
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-900 rounded-lg shadow"
                  >
                    {task.url} - {task.interval} minutes
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
