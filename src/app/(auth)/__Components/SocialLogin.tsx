"use client";

import { Button } from "@/components/ui/button";
import { default_redirect } from "@/middlewareRoutes";
import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io5";

const SocialLogin = () => {
  const socialLogin = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: default_redirect,
    });
  };
  return (
    <div className="pt-3 flex items-center flex-col md:flex-row gap-2">
      <Button
        onClick={() => socialLogin("github")}
        className="w-full text-xl"
        size="lg"
        variant="outline">
        <IoLogoGithub />
      </Button>
      <Button
        onClick={() => socialLogin("google")}
        className="w-full text-xl"
        size="lg"
        variant="outline">
        <FcGoogle />
      </Button>
    </div>
  );
};

export default SocialLogin;
