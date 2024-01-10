"use client";

import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CheckCircledIcon } from "@radix-ui/react-icons";

type ErrorMessageProps = {
  message?: string;
  type?: "success" | "error";
};

const Message = ({ message, type }: ErrorMessageProps) => {
  if (!message || !type) return;
  return (
    <>
      {type === "error" ? (
        <div className="flex items-center gap-2 p-3 text-destructive bg-destructive/20 rounded-md">
          <ExclamationTriangleIcon />
          <p className="text-xs">{message}</p>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-3 text-emerald-500 bg-emerald-100 rounded-md">
          <CheckCircledIcon />
          <p className="text-xs">{message}</p>
        </div>
      )}
    </>
  );
};

export default Message;
