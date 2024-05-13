import LatestMessage from "@/components/LatestMessage";
import { Subscription } from "@/app/Subscriptions/page";

async function getSubDetails(subname: string | undefined) {
    const response = await fetch(
      `${process.env.CONTEXT_BROKER_URL}/ngsi-ld/v1/subscriptions/${subname}`
    );
    const subscriptiondetails: Subscription = await response.json();
    return subscriptiondetails;
  }


export default async function Notifications({ params }: { params?: { subname: string | undefined } }) {
  const subDetails = await getSubDetails(params?.subname);
  
  return (
    <main className="min-h-screen container mx-auto ">
      <div className="flex flex-col items-center justify-between  gap-8  ">
        <LatestMessage subscription={subDetails} />
      </div>
    </main>
  );
}
