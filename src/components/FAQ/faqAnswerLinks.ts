/** Converts markdown links `[label](url)` in FAQ copy to anchor tags. */
export function withMarkdownLinks(text: string): string {
  return text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
}
