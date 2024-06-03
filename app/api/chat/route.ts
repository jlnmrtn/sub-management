import {
  BedrockRuntimeClient,
  InvokeModelWithResponseStreamCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { AWSBedrockAnthropicMessagesStream, StreamingTextResponse } from "ai";
import { experimental_buildAnthropicMessages, experimental_buildAnthropicPrompt } from "ai/prompts";
import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";
import { cookies } from "next/headers";
import { fetchAuthSession } from "aws-amplify/auth/server";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => fetchAuthSession(contextSpec),
  });

  const { messages } = await req.json();

  const bedrockClient = new BedrockRuntimeClient({
    region: "us-east-1",
    credentials: user.credentials,
  });

  // Ask Claude for a streaming chat completion given the prompt
  const bedrockResponse = await bedrockClient.send(
    new InvokeModelWithResponseStreamCommand({
    modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        messages: experimental_buildAnthropicMessages(messages),
        max_tokens: 1000,
      }),
    })
  );

  // Convert the response into a friendly text-stream
  const stream = AWSBedrockAnthropicMessagesStream(bedrockResponse);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
