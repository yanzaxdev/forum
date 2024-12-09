import "~/styles/globals.css";
import type { ReactNode } from "react";
import { Providers } from "./providers"; // We'll create a separate file for theme and context providers
import NavBar from "~/app/_components/Navbar";

export const metadata = {
  title: "Open Uni Forum",
  description: "A simple forum for Open University courses",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen transition-colors">
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
