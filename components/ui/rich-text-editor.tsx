"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/select";
import { Toggle } from "@/components/common/ui/toggle";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

const MAX_CHARACTERS = 400;

export default function RichTextEditor() {
  const [characterCount, setCharacterCount] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Add a short bio...</p>",
    onUpdate: ({ editor }) => {
      setCharacterCount(editor.storage.characterCount?.characters() || 0);
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const textTypes = [
    { value: "paragraph", label: "Regular" },
    { value: "heading-1", label: "Title 1" },
    { value: "heading-2", label: "Title 2" },
    { value: "heading-3", label: "Title 3" },
  ];

  const setTextType = (value: string) => {
    switch (value) {
      case "heading-1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "heading-2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "heading-3":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      default:
        editor.chain().focus().setParagraph().run();
    }
  };

  const getCurrentTextType = () => {
    if (editor.isActive("heading", { level: 1 })) return "heading-1";
    if (editor.isActive("heading", { level: 2 })) return "heading-2";
    if (editor.isActive("heading", { level: 3 })) return "heading-3";
    return "paragraph";
  };

  return (
    <div className="w-full  space-y-4">
      <div className="flex items-center space-x-2 bg-background border rounded-md p-1 w-fit">
        <Select onValueChange={setTextType} value={getCurrentTextType()}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Text type" />
          </SelectTrigger>
          <SelectContent>
            {textTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Toggle
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("bulletList")}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Toggle bullet list"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("orderedList")}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Toggle ordered list"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
      </div>
      <div className="relative">
        <EditorContent editor={editor} />
        <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">
          {characterCount}/{MAX_CHARACTERS} characters
        </div>
      </div>
      <style jsx global>{`
        .ProseMirror {
          min-height: 200px;
        }
        .ProseMirror p {
          margin: 0 0 0.5em 0;
        }
        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        .ProseMirror h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 1em 0;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding: 0 1rem;
          margin: 0.5em 0;
        }
        .ProseMirror ul li,
        .ProseMirror ol li {
          margin-bottom: 0.3em;
        }
        .ProseMirror ul {
          list-style-type: disc;
        }
        .ProseMirror ol {
          list-style-type: decimal;
        }
      `}</style>
    </div>
  );
}
