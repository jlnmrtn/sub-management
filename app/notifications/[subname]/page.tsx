import LatestMessage from "@/components/LatestMessage";
import { Subscription } from "@/app/Subscriptions/page";

async function getSubDetails(subname: string | undefined) {
  try {
    const response = await fetch(
      `${process.env.CONTEXT_BROKER_URL}/ngsi-ld/v1/subscriptions/${subname}`
    );
    if (response.status > 201) throw new Error("Error fetching subscription");
    const subscriptiondetails: Subscription = await response.json();
    return subscriptiondetails;
  }
  catch (error) {
    console.error(error);
    return { 
      id: "urn:ngsi-ld:Subscription:nosub",
      description: "No Subscription Found",
      notification: "No Subscription Found",
      status: "No Subscription Found",
      type: "No Subscription Found",
      jsonldContext: "No Subscription Found",
      timesFailed: 0,
      timesSent: 0
   };
  }
}


export default async function Notifications({ params }: { params?: { subname: string | undefined } }) {
  const subDetails = await getSubDetails(params?.subname);
  
  return (
    <main className="min-h-screen container mx-auto ">
      <div className="flex flex-col items-center justify-between gap-8">
        <h1 className="text-xl font-semibold border p-10  ">{subDetails.id == "urn:ngsi-ld:Subscription:nosub" ? "ERROR: UNABLE TO GET SUB" : subDetails.id}</h1>
        <LatestMessage subscription={subDetails} />
      </div>
    </main>
  );
}
