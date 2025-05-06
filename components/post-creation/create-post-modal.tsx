"use client";
import { Dialog } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { PostTypeButtons } from "./post-type-buttons";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
}

export function CreatePostModal({
  isOpen,
  onClose,
  onSelect,
}: CreatePostModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollbarWidth = useRef(0);

  const handleSelect = (type: string) => {
    console.log(`Creating ${type} post`);
    onSelect?.(type);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      scrollbarWidth.current =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth.current}px`;
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <Dialog open={isOpen}>
      <div className="fixed inset-0 backdrop-blur-sm z-[9999] flex items-center justify-center">
        <div ref={modalRef} className="p-8 rounded-lg p-6 rounded-lg relative">
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm border"
            aria-label="Close modal"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
          <PostTypeButtons
            onSelect={handleSelect}
            buttonSize="h-24 w-24"
            iconSize="text-4xl"
            className="gap-6"
          />
        </div>
      </div>
    </Dialog>,
    document.body,
  );
}
