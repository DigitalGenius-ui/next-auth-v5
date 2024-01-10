"use client";

import * as z from "zod";
import { loginSchemas } from "@/schemas/formSchemas";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Message from "./Message";
import { login } from "@/actions/Users/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

type serverMessageType = {
  error: string | undefined;
  success: string | undefined;
};

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [serverMessage, setServerMessage] = useState<serverMessageType>({
    error: "",
    success: "",
  });
  const searchParams = useSearchParams();
  const providerError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with an other provider."
      : "";

  const form = useForm<z.infer<typeof loginSchemas>>({
    resolver: zodResolver(loginSchemas),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitForm = async (values: z.infer<typeof loginSchemas>) => {
    setServerMessage({
      error: "",
      success: "",
    });

    startTransition(() => {
      login(values).then((data) => {
        setServerMessage((prev) => ({
          ...prev,
          error: data?.error,
          success: data?.success,
        }));
      });
    });
  };

  return (
    <CardWrapper
      footText="Don't have an account?"
      footLink="/register"
      formTitle="Sign In">
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(submitForm)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" className="py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Password"
                    type="password"
                    className="py-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Message
            type="error"
            message={serverMessage.error || providerError}
          />
          <Message type="success" message={serverMessage.success} />
          <Button disabled={isPending} type="submit" className="w-full py-5">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
