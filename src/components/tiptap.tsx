"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ToolBar } from "./tool-bar";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";

export const TipTap = ({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        listItem: {
          HTMLAttributes: {
            class: "list-disc ml-4",
          },
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "text-2xl font-bold",
          levels: 2,
        },
      }),
      Image,
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "rounded-md border border-input min-h-[150px]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

TipTap.displayName = "TipTap";
