"use client";

import { motion } from "framer-motion";
import { TaskContainer } from "@/components/TaskContainer";
import { LogOut, PlusIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SectionWrapper } from "@/components/Section-wrapper";
import AddTaskForm from "@/components/forms/addTask";
import SheetWrapper from "@/components/wrappers/sheetWrapper";
import React from "react";

export default function Dashboard() {
  return (
    <SectionWrapper>
      <div className="flex-grow flex flex-col min-h-screen bg-[#0E0C0A] text-white w-full">
        <div className="container mx-auto flex flex-col min-h-screen w-full">
          <section className="w-full py-2 md:py-24 lg:py-32 xl:py-38 relative select-none flex flex-col gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <DashboardHeader />
              <TaskContainer />
            </motion.div>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
}

const DashboardHeader = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="flex w-[80%] justify-between items-center">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="flex justify-center items-center gap-3">
        <Button
          variant="destructive"
          onClick={() => signOut()}
          className="flex items-center gap-2"
        >
          <LogOut size={24} />
          <span>Log Out</span>
        </Button>
        <Button
          variant="default"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <PlusIcon size={24} />
          <span>Add task</span>
        </Button>
        <SheetWrapper
          title="Add Task"
          description="Add a new task to monitor"
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
        >
          <AddTaskForm />
        </SheetWrapper>
      </div>
    </div>
  );
};
