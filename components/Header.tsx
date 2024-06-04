"use client";

import { AlignJustify } from "lucide-react";
import { ModeToggle } from "./ToggleDark";
import Link from "next/link";
import garnetIcon from "../public/garnet.svg";
import Image from "next/image";
import { signOut } from "aws-amplify/auth";
import { Button } from "./ui/button";

function Header() {
  async function handleSignOut() {
    await signOut();
  }
  return (
    <header>
      <div className="border p-10 bg-gray-200 dark:bg-black shadow-xl">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center justify-center gap-6">
            <Image src={garnetIcon} alt="Garnet Icon" width="60" />
            <h1 className="font-semibold text-3xl">Notifications Console</h1>
          </div>
          <div className="flex justify-center items-center gap-8">
            <Button >
              <Link href="/History">History</Link>
            </Button>
            <Button variant={"secondary"}>
            <Link
            
              href="/Subscriptions"
            >
              Subscriptions
            </Link>
            </Button>
          </div>
          <div className="flex justify-center items-center gap-8">
            <AlignJustify />
            <ModeToggle />
            <Button onClick={handleSignOut}>Signout</Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
