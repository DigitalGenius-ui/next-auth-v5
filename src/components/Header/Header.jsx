"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-[80%] mx-auto py-5 flex items-center justify-between">
      <Link href="/" className="font-extrabold text-2xl">
        LOGO
      </Link>
      <Link href="/login">
        <Button variant="default" size="lg">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default Header;
