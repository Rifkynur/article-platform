// components/Editor.tsx
"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import TextAlign from "@tiptap/extension-text-align";
import clsx from "clsx";
import { Undo, Redo, Bold, Italic, AlignCenter, AlignLeft, AlignRight, AlignJustify } from "lucide-react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[250px]",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  useEffect(() => {
    if (editor) {
      onChange(editor.getHTML());
    }
  }, [editor, onChange]);

  if (!editor) return null;

  return (
    <div className="border rounded-md p-2 space-y-2">
      <div className="flex gap-2 mb-2 flex-wrap">
        <div>
          <Button type="button" variant="outline" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
            <Undo />
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
            Redo
            <Redo />
          </Button>
        </div>
        <div>
          <Toggle variant={"outline"} onClick={() => editor.chain().focus().toggleBold().run()} className={clsx("px-2 py-1 rounded", editor.isActive("bold") ? "bg-slate-900 text-white" : "bg-white text-slate-900")}>
            <Bold />
          </Toggle>
          <Toggle variant="outline" onClick={() => editor.chain().focus().toggleItalic().run()} className={clsx("px-2 py-1 rounded", editor.isActive("bold") ? "bg-slate-900 text-white" : "bg-white text-slate-900")}>
            <Italic />
          </Toggle>
        </div>
        <div>
          <Toggle
            variant="outline"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={clsx("px-2 py-1 rounded", editor.isActive("textAlign", { textAlign: "left" }) ? "bg-slate-900 text-white" : "bg-white text-slate-900")}
          >
            <AlignLeft />
          </Toggle>
          <Toggle
            variant="outline"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={clsx("px-2 py-1 rounded", editor.isActive("textAlign", { textAlign: "center" }) ? "bg-slate-900 text-white" : "bg-white text-slate-900")}
          >
            <AlignCenter />
          </Toggle>
          <Toggle
            variant="outline"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={clsx("px-2 py-1 rounded", editor.isActive("textAlign", { textAlign: "justify" }) ? "bg-slate-900 text-white" : "bg-white text-slate-900")}
          >
            <AlignJustify />
          </Toggle>
          <Toggle
            variant="outline"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={clsx("px-2 py-1 rounded", editor.isActive("textAlign", { textAlign: "right" }) ? "bg-slate-900 text-white" : "bg-white text-slate-900")}
          >
            <AlignRight />
          </Toggle>
        </div>
      </div>

      <EditorContent editor={editor} className="min-h-[300px] border rounded-md p-2" />
    </div>
  );
}
