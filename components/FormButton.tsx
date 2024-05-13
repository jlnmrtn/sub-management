"use client";

import { useFormStatus } from "react-dom";
import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function FormButton({ title }: { title: string }) {
  const { pending } = useFormStatus();

  return (
    <div>
      {pending ? (
        <Button type="submit" disabled>
          <Loader2 className="animate-spin"></Loader2>
        </Button>
      ) : (
        <Button
          type="submit"
          variant={`${title === "Delete" ? "destructive" : "default"}`}
        >
          {" "}
          {title}{" "}
        </Button>
      )}
    </div>
  );
}

export function DeleteFormButton({ title }: { title: string }) {
  const { pending } = useFormStatus();

  return (
    <div>
      {pending ? <Loader2 className="animate-spin"></Loader2> : <p>{title}</p>}
    </div>
  );
}
