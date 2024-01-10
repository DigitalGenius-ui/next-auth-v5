"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return <Button disabled={pending}>Add</Button>;
};

export default SubmitButton;
