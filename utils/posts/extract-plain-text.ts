// Helper function to extract plain text from rich text JSON
export function extractPlainText(richText?: string | null): string | undefined {
  if (!richText) return undefined;

  try {
    const content = JSON.parse(richText);
    if (Array.isArray(content)) {
      return content
        .map((block) => {
          if (block.type === "paragraph" && block.children) {
            return block.children.map((child: any) => child.text).join("");
          }
          return "";
        })
        .filter(Boolean) // Remove empty strings
        .join("\n\n"); // Double newline between paragraphs
    }
    return richText; // Fallback for non-array JSON
  } catch {
    return richText; // Fallback for invalid JSON
  }
}
