"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSub(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const entities = formData.get("entities");
  const endpoint = formData.get("endpoint");
  const description = formData.get("description");

  try {
    const response = await fetch(`${process.env.CONTEXT_BROKER_URL}/ngsi-ld/v1/subscriptions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: `urn:ngsi-ld:Subscription:${name}`,
        description,
        type: "Subscription",
        jsonldContext:
          "https://raw.githubusercontent.com/awslabs/garnet-framework/main/context.jsonld",
        notification: {
          endpoint: {
            accept: "application/json",
            uri: endpoint,
          },
        },
        entities: [
          {
            type: entities,
          },
        ],
      }),
    });

    if (response.status > 201) {
        return "an issue occured" ;
    }

    // if (!response.ok) {
    //   throw new Error("Failed to create subscription");
    // }
  } catch (error) {
    console.error(error);
    return  "an issue occured";
  }
  
  revalidatePath("/Subscriptions");
  // redirect("/Subscriptions?closeModal=false");
}
