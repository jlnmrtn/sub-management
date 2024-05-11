import {
  BedrockRuntimeClient,
  InvokeModelWithResponseStreamCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { AWSBedrockAnthropicStream, StreamingTextResponse } from "ai";
import { experimental_buildAnthropicPrompt } from "ai/prompts";
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

  const { messages, end } = await req.json();

  console.log(experimental_buildAnthropicPrompt(messages))

  const bedrockClient = new BedrockRuntimeClient({
    region: "us-east-1",
    credentials: user.credentials,
  });

  // Ask Claude for a streaming chat completion given the prompt
  const bedrockResponse = await bedrockClient.send(
    new InvokeModelWithResponseStreamCommand({
    modelId: 'anthropic.claude-v2',
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: experimental_buildAnthropicPrompt(messages),
        max_tokens_to_sample: 300,
      }),
    })
  );


  // Convert the response into a friendly text-stream
  const stream = AWSBedrockAnthropicStream(bedrockResponse);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
