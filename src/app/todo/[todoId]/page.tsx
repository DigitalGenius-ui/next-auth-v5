import { addTodo, getTodo } from "@/actions/Todo/TodoActions";
import CardWrapper from "@/app/(auth)/__Components/CardWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import SubmitButton from "../__Component/SubmitButton";

const TodoPage = async () => {
  const todo = (await getTodo()) || [];

  const handleForm = async (formData: FormData) => {
    "use server";
    const text = formData.get("text")?.toString() || "";
    await addTodo(text);
    console.log(formData);
  };

  return (
    <main className="">
      <CardWrapper formTitle="Add Todo List" isSocial={false}>
        <form action={handleForm} className="flex flex-col gap-5">
          <Input placeholder={todo[0]?.text || "Add todo"} name="text" />
          <SubmitButton />
        </form>
      </CardWrapper>
      <div>
        {todo?.map((item, i) => (
          <div key={i}>{item.text}</div>
        ))}
      </div>
    </main>
  );
};

export default TodoPage;
