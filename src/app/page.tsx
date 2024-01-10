import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CardWrapper from "./(auth)/__Components/CardWrapper";
import { addTodo, getTodo } from "@/actions/Todo/TodoActions";

export default async function Home() {
  const handleForm = async (formData: FormData) => {
    "use server";
    const text = formData.get("text")?.toString() || "";
    await addTodo(text);
    console.log(formData);
  };

  const todo = await getTodo();

  return <h1>hi</h1>;
}
