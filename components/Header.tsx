'use client'

import { AlignJustify } from "lucide-react";
import { ModeToggle } from "./ToggleDark";
import Link from "next/link";
import garnetIcon from "../public/garnet.svg";
import Image from "next/image";
import { signOut } from 'aws-amplify/auth';
import { Button } from "./ui/button";


function Header() {
  async function handleSignOut() {
    await signOut()
  }
  return (
    <header>
      <div className="border p-10 bg-gray-100 dark:bg-black">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center justify-center gap-6">
            <Image src={garnetIcon} alt="Garnet Icon" width="60"  />
            <h1 className="font-semibold text-3xl">Garnet Management</h1>
          </div>
          <div className="flex justify-center items-center gap-8">
            <Link
              className="underline border p-5 rounded-xl bg-slate-100 dark:bg-black"
              href="/"
            >
              Real Time Notifications
            </Link>
            <Link
              className="underline border p-5 rounded-xl bg-slate-100  dark:bg-black"
              href="/history"
            >
              History
            </Link>
            <Link
              className="underline border p-5 rounded-xl bg-slate-100  dark:bg-black"
              href="/Subscriptions"
            >
              Subscriptions
            </Link>
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
