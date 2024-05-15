"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState, useEffect } from "react";
import { pubsub } from "../utils/pubsub";
import Chat from "./Chat";
import { Subscription } from "@/app/Subscriptions/page";

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

export default function LatestMessage({
  subscription,
}: {
  subscription: Subscription | undefined;
}) {
  // const [toggleChat, setToggleChat] = useState(true);
  const [message, setMessage] = useState<IMessage[]>([]);
  let subname: string = "+";

  if (subscription) {
    subname = subscription.id.split(":")[3];
  }

  useEffect(() => {
    const sub_topic = pubsub
      .subscribe({ topics: [`garnet/subscriptions/${subname}`] })
      .subscribe({
        next: (data) => {
          console.log(data)
          const notification = data as INotification;
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
  }, [subname]);

  return (
    <>
      {message.length == 0 && (
        <div className="flex flex-col items-center justify-start flex-1 mt-60">
          <div className="text-xl flex justify-center items-center">
            Good news or bad news but no Notifications yet ;-)
          </div>
        </div>
      )}

      {message.length > 0 && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-5 flex flex-col gap-3">
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
          </div>
          <div className="col-span-7">
            {message.length > 0 && (
              <Chat message={message} subscription={subscription} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
