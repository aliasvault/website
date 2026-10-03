"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="dark"
      // The theme script only needs to run from the SSR HTML. On the client, mark it inert so React 19 doesn't warn
      // "Encountered a script tag while rendering React component".
      scriptProps={{ type: typeof window === "undefined" ? "text/javascript" : "text/plain" }}
    >
      {children}
    </ThemeProvider>
  );
}
