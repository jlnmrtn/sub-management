"use client";

import { useChat } from "ai/react";
import { IMessage } from "./LatestMessage";
import { Card, CardHeader } from "./ui/card";
import { useEffect, useRef } from "react";
import { Subscription } from "@/app/Subscriptions/page";
import { Skeleton } from "@/components/ui/skeleton"


export default function Chat({
  message,
  subscription,
}: {
  message: IMessage[];
  subscription: Subscription | undefined;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  let JSONstrmessage: string = JSON.stringify(message);
  const JSONstrsubscription: string = JSON.stringify(subscription);
  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat({
      // initialMessages: [
      //   {
      //     role: "user",
      //     id: "0",
      //     content: `Based on the following context, describe what is going on, ${JSONstrsubscription}`,
      //   },
      // ],
    });

  useEffect(() => {
    setInput(
      `Based on the following context which represents a subscription rule and related notifications. SUBSCRIPTIONS/RULES:${JSONstrsubscription} NOTIFICATIONS:${JSONstrmessage}.  Don't describe the subscription rule itself but take into context for the notifcations. Find out what is going on, anomaly, correlation. But don't describe the rule definition. Please Keep it synthetic in 100 words maximum!. Mention the exact time.`
    );
    buttonRef?.current?.click();
  }, [setInput, JSONstrmessage, JSONstrsubscription]);

  useEffect(() => {
    if (buttonRef.current != null) {
      buttonRef.current.click();
      return;
    }
  }, [input]);

  return (
    <div>
      <div className="flex flex-col mt-0 gap-5">
        {messages.toReversed().map((m) => (
          <div key={m.id}>
            {m.role !== "user" && (m.content.length > 0 ? (
              <Card className="p-5 text-2xl shadow-lg">{m.content}   
              </Card>
            ) : <Skeleton className="w-[100px] h-[20px] rounded-full" /> )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} hidden>
        <input value={input} hidden={true} onChange={handleInputChange} />
        <button type="submit" hidden ref={buttonRef}>
          Send
        </button>
      </form>
    </div>
  );
}
