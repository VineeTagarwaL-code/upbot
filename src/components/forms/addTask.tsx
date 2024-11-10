"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, Bell, MessageSquare, AlertCircle, Loader2 } from "lucide-react";
import { toast, useToast } from "@/hooks/use-toast";
import { addTasks } from "@/app/actions/task";

const formSchema = z.object({
  url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .refine((val) => val.startsWith("https://"), {
      message: "URL must start with https://",
    }),
  notify: z.boolean().optional(),
  discordUrl: z
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .optional()
    .refine(
      (val) => !val || val.startsWith("https://discord.com/api/webhooks/"),
      {
        message:
          "Discord URL must start with https://discord.com/api/webhooks/",
      }
    ),
});

export default function AddTaskForm() {
  const [showDiscordInput, setShowDiscordInput] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      notify: false,
      discordUrl: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const addTaskRes = await addTasks(values);
      if (!addTaskRes.status) {
        throw new Error(addTaskRes.message);
      }

      toast({
        title: "Task added successfully",
        description: "We will start monitoring the url shortly.",
      });
      await queryClient.invalidateQueries({ queryKey: ["pingTask"] });
      form.reset();
    } catch (err: any) {
      toast({
        title: "Task failed to add",
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardDescription className="flex flex-col gap-2">
          <AlertCircle className="text-red-300" />
          <span className="text-red-200">
            By default, we will send an email notification if this server
            returns any status code other than 200.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="https://example.com"
                        {...field}
                        className="pl-8"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter the URL of the server you want to monitor.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notify"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Discord Notifications
                    </FormLabel>
                    <FormDescription>
                      Receive notifications via Discord when server status
                      changes.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        setShowDiscordInput(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {showDiscordInput && (
              <FormField
                control={form.control}
                name="discordUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discord Webhook URL</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MessageSquare className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="https://discord.com/api/webhooks/..."
                          {...field}
                          className="pl-8"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Enter your Discord webhook URL to receive notifications.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button onClick={form.handleSubmit(handleSubmit)} className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : "Add Task"}
        </Button>
      </CardFooter>
    </Card>
  );
}
