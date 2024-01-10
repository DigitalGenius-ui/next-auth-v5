"use server";

import db from "@/db/db";
import { revalidatePath } from "next/cache";

export const getTodo = async () => {
  try {
    const todo = await db.todo.findMany({
      orderBy: {
        createAt: "desc",
      },
    });
    return todo;
  } catch (error) {
    return null;
  }
};

export const addTodo = async (text: string) => {
  try {
    const create = await db.todo.create({
      data: {
        text,
      },
    });
    revalidatePath("/todo");
    return create;
  } catch (error) {
    return null;
  }
};
