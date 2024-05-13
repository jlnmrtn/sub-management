"use client";

import { useChat } from "ai/react";
import { IMessage } from "./LatestMessage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { useEffect, useRef } from "react";
import { Subscription } from "@/app/Subscriptions/page";

export default function Chat({ message, subscription }: { message: IMessage[], subscription: Subscription | undefined }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let JSONstrmessage: string
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
    JSONstrmessage = JSONstrmessage + JSON.stringify(message);
    setInput(`Based on the following context which represents a subscription rule and related notifications. Don't describe the subscription rule itsel but take into context for the notifcations. describe what is going on, anomaly, correlation...  SUBSCRIPTIONS/RULES:${JSONstrsubscription} NOTIFICATIONS:${JSONstrmessage}`);
    buttonRef?.current?.click();
  },[setInput,  message]);


  useEffect(() => {
    if (buttonRef.current != null) {
        buttonRef.current.click();    
      return;
    }
   
  }, [input]);

  return (
    <div className="mx-auto w-full flex flex-col items-center ">
      <div className="flex flex-col gap-5" >
        {messages.map((m) => (
          <div key={m.id}>
            {m.role !== "user" && (
              <Card className="p-5 text-2xl">{m.content}</Card>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} hidden className="flex gap-10 mt-10">
        <input value={input}  hidden={true} onChange={handleInputChange} />
        <button type="submit" hidden ref={buttonRef}>
          Send
        </button>
      </form>
    </div>
  );
}
