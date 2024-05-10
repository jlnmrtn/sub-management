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
import LatestMessage from "@/components/LatestMessage";

export default function Home() {
  return (
    <main className="min-h-screen container mx-auto  ">
      <div className="flex flex-col items-center justify-between  gap-8  ">
        <LatestMessage />
        {/* {notifications.data.map((notification) => {
        return (
          <Card className="bg-zinc-100 dark:bg-black" key={notification.id}>
            <CardHeader>
              <CardTitle>{notification.id}</CardTitle>
              <CardDescription>Notification Content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{JSON.stringify(notification)}</p>
            </CardContent>
          </Card>
        );
      })} */}
      </div>
    </main>
  );
}
