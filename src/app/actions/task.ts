"use server";
import { withServerActionAsyncCatcher } from "@/lib/async-wrapper";
import { SuccessResponse } from "@/lib/success";
import { getUser } from "./user";
import axios from "axios";
import { TAxiosResponse, PingTask } from "@/types";

type GetPingResponse = {
  pings: PingTask;
};
const getPings = withServerActionAsyncCatcher(async () => {
  const user = await getUser();
  if (!user) {
    return null;
  }
  const response = await axios.get(`${process.env.BACKEND_URL}/ping/getall`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const data: TAxiosResponse<GetPingResponse> = response.data;
  if (!response.data.additional) {
    console.log("Failed to fetch tasks : ", "No data received");
    return null;
  }
  const actionResponse = new SuccessResponse(
    "Pings fetched successfully",
    200,
    data.additional
  );
  return actionResponse.serialize();
});

async function deleteTasks(url: string) {
  try {
  } catch (err) {
    console.log(err);
  }
}

async function addTasks(url: string) {
  try {
    const user = await getUser();
    if (!user) {
      return null;
    }
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/ping/create`,
      {
        url,
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
export { getPings, addTasks, deleteTasks };
