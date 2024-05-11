"use client";

import { useChat } from "ai/react";
import { IMessage } from "./LatestMessage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { useEffect, useRef } from "react";

export default function Chat({ message }: { message: IMessage[] }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let JSONstrmessage = JSON.stringify(message);
  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat({
      initialMessages: [
        {
          role: "user",
          id: "0",
          content: `Based on the following context, describe what is going on, ${JSONstrmessage}`,
        },
      ],
    });

  useEffect(() => {
    JSONstrmessage = JSONstrmessage + JSON.stringify(message);
    setInput(`${JSONstrmessage}`);
    buttonRef?.current?.click();
  },[setInput,  message]);


  useEffect(() => {
    if (input === "test" && buttonRef.current != null) {
        buttonRef.current.click();
        setInput("stop");
      return;
    }
    if (input === "stop") return;
    setInput("test");
   
  }, [setInput, input]);

  return (
    <div className="mx-auto w-full flex flex-col items-center ">
      <div>
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
        {/* <button  hidden type="submit"  >Send</button> */}
      </form>
    </div>
  );
}
