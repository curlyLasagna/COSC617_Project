"use client";
import { Button } from "@/components/ui/button";
import { ImageIcon, LinkIcon, VideoIcon } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Descendant, createEditor, string } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

type CustomElement = { type: "paragraph"; children: Descendant[] };
const initialValue: CustomElement[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

interface TextEditorProps {
  onCancel: () => void;
  onSubmit: (content: string | File, caption?: string) => void;
  isOpen: boolean;
  mode: "text" | "image" | "video" | "link";
  isSubmitting?: boolean;
}

export function TextEditor({
  onCancel,
  onSubmit,
  isOpen,
  mode,
  isSubmitting = false,
}: TextEditorProps) {
  // Editors for different modes
  const textEditor = useMemo(() => withHistory(withReact(createEditor())), []);
  const captionEditor = useMemo(
    () => withHistory(withReact(createEditor())),
    [],
  );

  const [title, setTitle] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleMediaUpload is being called!", e);
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setMediaPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const renderElement = useCallback(
    ({ attributes, children, element }: any) => {
      switch (element.type) {
        case "heading":
          return <h1 {...attributes}>{children}</h1>;
        default:
          return <p {...attributes}>{children}</p>;
      }
    },
    [],
  );

  const handleSubmit = () => {
    if (mode === "text") {
      const content = JSON.stringify(textEditor.children);
      onSubmit(content, title);
    } else if (mode === "link") {
      const caption = JSON.stringify(captionEditor.children);
      onSubmit(linkUrl, caption);
    } else if (file) {
      const caption = JSON.stringify(captionEditor.children);
      onSubmit(file, caption);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="w-full max-w-2xl mx-4">
        <div className="bg-gray-100 dark:bg-[#1a1a1a] rounded-lg p-6">
          {mode === "text" ? (
            <>
              {/* Text Post Editor */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 text-2xl font-bold border-b focus:outline-none focus:border-blue-500 bg-transparent dark:text-white"
                />
              </div>
              <Slate editor={textEditor} initialValue={initialValue}>
                <div className="border rounded-lg p-4 min-h-[200px] mb-4 bg-white dark:bg-[#1a1a1a]">
                  <Editable
                    renderElement={renderElement}
                    placeholder="Write your post here..."
                    className="focus:outline-none min-h-[150px] dark:text-white"
                  />
                </div>
              </Slate>
            </>
          ) : mode === "link" ? (
            <>
              {/* Link Editor */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <LinkIcon className="w-5 h-5 text-gray-500" />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type or paste a link
                  </label>
                </div>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#1a1a1a] dark:text-white"
                  autoFocus
                />
              </div>

              {/* Caption Editor */}
              <div className="mb-4">
                <Slate editor={captionEditor} initialValue={initialValue}>
                  <div className="border rounded-lg p-4 min-h-[100px] bg-white dark:bg-[#1a1a1a]">
                    <Editable
                      placeholder="Write something about this link..."
                      className="focus:outline-none min-h-[80px] dark:text-white"
                    />
                  </div>
                </Slate>
              </div>
            </>
          ) : (
            <>
              {/* Media Upload Area (Image/Video) */}
              <div className="mb-4 border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
                {mediaPreview ? (
                  mode === "image" ? (
                    <img
                      src={mediaPreview}
                      alt="Preview"
                      className="max-h-96 object-contain mb-4"
                    />
                  ) : (
                    <video
                      src={mediaPreview}
                      controls
                      className="max-h-96 mb-4 w-full"
                    />
                  )
                ) : (
                  <div className="flex flex-col items-center p-8">
                    {mode === "image" ? (
                      <ImageIcon className="w-12 h-12 mb-2 text-gray-400" />
                    ) : (
                      <VideoIcon className="w-12 h-12 mb-2 text-gray-400" />
                    )}
                    <p className="text-gray-500 mb-4">
                      {mode === "image"
                        ? "Drag & drop an image or click to browse"
                        : "Drag & drop a video or click to browse"}
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept={mode === "image" ? "image/*" : "video/*"}
                  onChange={handleMediaUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {mediaPreview ? `Change ${mode}` : `Select ${mode}`}
                </Button>
              </div>

              {/* Caption Editor */}
              <Slate editor={captionEditor} initialValue={initialValue}>
                <div className="border rounded-lg p-4 min-h-[100px] mb-4 bg-white dark:bg-[#1a1a1a]">
                  <Editable
                    placeholder="Write a caption..."
                    className="focus:outline-none min-h-[80px] dark:text-white"
                  />
                </div>
              </Slate>
            </>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                (mode === "text" && !title.trim()) ||
                (mode === "link" && !linkUrl.trim()) ||
                ((mode === "image" || mode === "video") && !mediaPreview) ||
                isSubmitting
              }
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
