"use client";

import { Button } from "@/components/ui/button";
import notifications from "../data.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState, useEffect } from "react";
import { pubsub } from "../utils/pubsub";
import Chat from "./Chat";

type INotification = {
  id: string;
  message: string;
  subscriptionId: string;
  data: IMessage[];
  notifiedAt: string;
};

export type IMessage = {
  id: string;
};

export default function LatestMessage() {
  const [toggleChat, setToggleChat] = useState(false);
  const [message, setMessage] = useState<IMessage[]>([]);

  useEffect(() => {
    const sub_topic = pubsub
      .subscribe({ topics: ["garnet/subscriptions/+"] })
      .subscribe({
        next: (data) => {
          const notification = data as INotification;
          console.log(notification);
          notification.data.map((d) =>
            setMessage((prevState) => [...prevState, d])
          );
        },
        error: (error) => console.error(error),
        complete: () => console.log("Done"),
      });
    return () => {
      sub_topic.unsubscribe();
      console.log("Unsubscribed to topic");
    };
  }, []);

  return (
    <>
      {message.length > 0 && (
        <Button onClick={() => setToggleChat(!toggleChat)}>Toggle Chat</Button>
      )}
      {toggleChat && <Chat message={message} />}
      {message.map((m, i) => {
        return (
          <Card className="bg-zinc-100 dark:bg-black" key={i}>
            <CardHeader>
              <CardTitle>{m.id}</CardTitle>
              <CardDescription>Message Content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{JSON.stringify(m)}</p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
