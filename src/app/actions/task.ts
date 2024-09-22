"use server";
import { getUser } from "./user";
import axios from "axios";
async function getTasks() {
  try {
    const user = await getUser();
    if (!user) {
      return null;
    }
    const response = await axios.get(`${process.env.BACKEND_URL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (!response.data) {
      console.log("Failed to fetch tasks : ", "No data received");
      return null;
    }
    return response.data;
  } catch (err: any) {
    if (err.response) {
      console.log("Failed to fetch tasks : ", err.response.data.message);
    } else {
      console.log("Failed to fetch tasks : ", err.message);
    }
  }
}

async function deleteTasks(url: string) {
  try {
  } catch (err) {
    console.log(err);
  }
}

async function addTasks(url: string, interval: number) {
  try {
    const user = await getUser();
    if (!user) {
      return null;
    }
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/task`,
      {
        url,
        interval,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (!response.data) {
      console.log("Failed to add tasks : ", "No data received");
      return null;
    }

    return response.data;
  } catch (err: any) {
    if (err.response) {
      console.log("Failed to add tasks : ", err.response.data.message);
    } else {
      console.log("Failed to add tasks : ", err.message);
    }
  }
}
export { getTasks, addTasks, deleteTasks };
