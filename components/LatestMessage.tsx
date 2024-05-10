"use client";

import { useState, useEffect } from "react";
import { pubsub } from "../utils/pubsub";

type INotification = {
  id: string;
  message: string;
  subscriptionId: string;
  data: IMessage[];
  notifiedAt: string;
};

type IMessage = {
  id: string;
};

export default function LatestMessage() {
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
      {message.map((m, i) => {
        return <p key={i}>{JSON.stringify(m)}</p>;
      })}
    </>
  );
}
