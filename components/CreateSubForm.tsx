"use client";

import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import FormButton from "./FormButton";
import { createSub } from "@/app/actions/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "./ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

export default function CreateSubForm() {
  const [message, action] = useFormState(createSub, null);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      toast({
        title: "Error",
        description: JSON.stringify(message),
      });
    }
  }, [message, toast]);


  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]" onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        
        <DialogHeader>
          <DialogTitle>Create Subscription</DialogTitle>
          <DialogDescription>
            Create a new subscription. Click save when youre done.
          </DialogDescription>
        </DialogHeader>

        <form action={action}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input name="name" id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="entities" className="text-right">
                Entities
              </Label>
              <Input id="entities" name="entities" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endpoint" className="text-right">
                Notification Endpoint
              </Label>
              <Input
                id="endpoint"
                name="endpoint"
                defaultValue={process.env.NEXT_PUBLIC_PRIVATE_GARNET_ENDPOINT}
                className="col-span-3"
              />
            </div>
          </div>
          <FormButton title="Create" />
        </form>
      </DialogContent>
    </Dialog>
 
  );
}
