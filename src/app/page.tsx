"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { TipTap } from "@/components/tiptap";
import { useEffect, useState } from "react";
import { Article } from "@/components/article";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const storedDescription = JSON.parse(
      localStorage.getItem("article") || '""'
    );
    setDescription(storedDescription);
    form.reset({ description: storedDescription });
  }, []);

  const formSchema = z.object({
    description: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      description: description,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEditing(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("article", JSON.stringify(values.description));
    }
  }

  return (
    <main className="p-24">
      {!isEditing && (
        <div className="flex justify-end mb-24">
          <Button onClick={() => setIsEditing(true)}>
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      )}

      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <TipTap
                      description={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      ) : (
        <Article content={form.getValues("description")} />
      )}
    </main>
  );
}
