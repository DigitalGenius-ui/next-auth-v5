"use client";

import * as z from "zod";
import { registerSchemas } from "@/schemas/formSchemas";

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
import { register } from "@/actions/Users/register";
import { useState, useTransition } from "react";
import Message from "./Message";

type serverMessageType = {
  error: string | undefined;
  success: string | undefined;
};

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [serverMessage, setServerMessage] = useState<serverMessageType>({
    error: "",
    success: "",
  });

  const form = useForm<z.infer<typeof registerSchemas>>({
    resolver: zodResolver(registerSchemas),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const formHandler = async (values: z.infer<typeof registerSchemas>) => {
    setServerMessage({
      error: "",
      success: "",
    });
    startTransition(() => {
      register(values).then((data) => {
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
      footText="Already have an account?"
      footLink="/login"
      formTitle="Sign Up">
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(formHandler)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name" className="py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Message type="error" message={serverMessage.error} />
          <Message type="success" message={serverMessage.success} />
          <Button disabled={isPending} type="submit" className="w-full py-5">
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
