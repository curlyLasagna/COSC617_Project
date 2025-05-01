"use client";
import { Dialog } from "@radix-ui/react-dialog";
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

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		}

		if (isOpen) {
			scrollbarWidth.current =
				window.innerWidth - document.documentElement.clientWidth;
			document.body.style.overflow = "hidden";
			document.body.style.paddingRight = `${scrollbarWidth.current}px`;
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "";
			document.body.style.paddingRight = "";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return createPortal(
		<Dialog open={isOpen} onOpenChange={onClose}>
			<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
				<div ref={modalRef} className="bg-background p-8 rounded-lg">
					<PostTypeButtons
						onSelect={(type) => {
							onSelect(type);
							onClose();
						}}
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
