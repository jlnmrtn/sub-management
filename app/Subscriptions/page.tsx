import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Settings2, Trash2 } from "lucide-react";
import React from "react";
import { revalidatePath } from "next/cache";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { DeleteFormButton } from "@/components/FormButton";
import CreateSubForm from "@/components/CreateSubForm";
import Link from "next/link";
export const dynamic = "force-dynamic";

export interface Subscription {
  id: string;
  type: string;
  description: string;
  status: string;
  jsonldContext: string;
  entities?: string;
  q?: string;
  watchedattributes?: string;
  notification: string;
  timesFailed: number;
  timesSent: number;
}

async function fetchSub() {
  const response = await fetch(
    `${process.env.CONTEXT_BROKER_URL}/ngsi-ld/v1/subscriptions`
  );
  const subscriptions = await response.json();
  return subscriptions.filter(
    (s: Subscription) =>
      s.id != "urn:ngsi-ld:Subscription:GarnetDataLakeSub-DoNotDelete"
  );
}

async function Subscriptions() {
  async function delSub(formData: FormData) {
    "use server";

    const id = formData.get("id");

    await fetch(
      `${process.env.CONTEXT_BROKER_URL}/ngsi-ld/v1/subscriptions/${id}`,
      {
        method: "DELETE",
      }
    );
    revalidatePath("/Subscriptions");
  }

  const subscriptions = await fetchSub();
  return (
    <div className="min-h-screen items-center container mx-auto">
      <div className="flex justify-between ">
        <h1 className="text-2xl mb-10 w-full text-center font-semibold ">
          Subscriptions List:
        </h1>
        <CreateSubForm />
      </div>

      <div className="flex flex-col items-start gap-8 w-full ">
        {subscriptions.map((subscription: Subscription) => {
          return (
            <Card
              className="bg-violet-100 dark:bg-black w-full py-4 shadow-lg"
              key={subscription.id}
            >
              <div className="flex justify-start items-center">
                <CardHeader className="flex flex-col justify-start text-sm  w-52">
                  <CardTitle className="text-base">
                    {subscription.id.split(":")[3]}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {subscription.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-hidden border-x-2 flex-1 flex">
                  <div className="border border-x-2 flex-1 flex flex-col justify-between">
                    {subscription.description && (
                      <p>Description: {subscription.description}</p>
                    )}

                    <p>Times Failed: {subscription.timesFailed}</p>
                    <p>Times Sent: {subscription.timesSent}</p>
                    <p>Status: {subscription.status}</p>
                  </div>
                  <div className="border  flex-1 flex flex-col justify-between gap-3">
                    <p className="flex items-center justify-start gap-12 ">
                      <div > Entities: </div>
                      <pre className="border bg-zinc-100 dark:bg-black p-1 text-xs flex-1">
                        {JSON.stringify(subscription.entities, null, 2)}
                      </pre>
                    </p>
                    {subscription.q && (
                      <p className="flex items-center justify-start gap-16" >
                        <div > Query:</div>
                        <pre className="border bg-zinc-100 dark:bg-black p-1 text-xs flex-1">
                          {JSON.stringify(subscription.q, null, 2)}
                        </pre>
                      </p>
                    )}
                    {subscription.watchedattributes && (
                      <p>
                        WatchedAttributes:{" "}
                        {JSON.stringify(subscription.watchedattributes)}
                      </p>
                    )}
                    <p className="flex items-center justify-start gap-5">
                      <div>Notification: </div>
                      <pre className="text-xs p-1 border bg-zinc-100 dark:bg-black flex-1">
                        {JSON.stringify(subscription.notification, null, 2)}
                      </pre>
                    </p>
                  </div>
                </CardContent>
                <div className="flex gap-3 mx-5">
                  <Button variant={"secondary"} asChild>
                    <Link href={`/notifications/${subscription.id}`}>
                      <Search />
                    </Link>
                  </Button>
                  <Button>
                    <Settings2 />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your subscription
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <form action={delSub}>
                          <input
                            type="hidden"
                            name="id"
                            value={subscription.id}
                          />
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction type="submit">
                            <DeleteFormButton title="Delete" />
                          </AlertDialogAction>
                        </form>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Subscriptions;
