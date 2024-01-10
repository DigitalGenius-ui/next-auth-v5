"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SocialLogin from "./SocialLogin";

type CartWrapperProps = {
  formTitle: string;
  footLink?: string;
  footText?: string;
  children: React.ReactNode;
  isSocial?: boolean;
};

const CardWrapper = ({
  formTitle,
  footLink,
  footText,
  children,
  isSocial,
}: CartWrapperProps) => {
  return (
    <div className="h-screen grid place-items-center">
      <Card className="w-[90%] mx-auto sm:w-[30rem]">
        <CardHeader className="text-center font-bold text-lg">
          {formTitle}
        </CardHeader>
        <CardContent>
          {children}
          {isSocial && <SocialLogin />}
        </CardContent>
        {footLink && (
          <CardFooter className="grid place-items-center w-full">
            <Link href={footLink}>
              <Button variant="link">{footText}</Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default CardWrapper;
