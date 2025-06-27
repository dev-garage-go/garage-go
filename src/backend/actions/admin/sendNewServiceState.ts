'use server'

import { HttpStatus, ServerActionResponse } from "@/backend/types";
import { DataServiceStateChanged } from "@/features/admin";

export const sendNewServiceState = async (data: DataServiceStateChanged): Promise<ServerActionResponse<null>> => {
  try {
    const path = process.env.SERVICE_STATE_AGENT_PATH
    const token = process.env.SERVICE_STATE_AGENT_TOKEN

    if (!path) throw new Error("enviroment variable SERVICE_STATE_AGENT_PATH not found");
    // if (!token) throw new Error("enviroment variable SERVICE_STATE_AGENT_TOKEN not found");

    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Webhook error: ${response.status} - ${text}`);
    }

    return {
      success: true,
      data: null,
      httpStatus: HttpStatus.OK
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: `unexpected error sending service state data to agent webhook: ${error}`,
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }
  }
}