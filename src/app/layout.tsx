import "~/styles/globals.css";
import { Suspense, type ReactNode } from "react";
import { Assistant } from "next/font/google";
import { Metadata } from "next";
import { cn } from "~/lib/utils";
import { Providers } from "./providers";
import NavBar from "~/components/Navbar";
import { Sheet } from "~/components/ui/sheet";
import ForumSheet from "~/components/ForumSheet";
import { serverDetLang } from "~/utils/language";

const assistant = Assistant({
  subsets: ["hebrew"],
  display: "swap",
  variable: "--font-assistant",
});

export const metadata: Metadata = {
  title: {
    default: "Open Uni Forum",
    template: "%s | Open Uni Forum",
  },
  description: "A simple forum for Open University courses",
  keywords: ["university", "forum", "education", "courses"],
  authors: [{ name: "Open Uni Forum Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const { lang, t } = await serverDetLang();

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={cn(assistant.className, "antialiased")}
    >
      <head />
      <body
        className={cn(
          "flex min-h-screen flex-col",
          "bg-background text-foreground",
          "transition-colors duration-300",
        )}
      >
        <Providers>
          <Sheet>
            <Suspense fallback={null}>
              <ForumSheet />
            </Suspense>
            <Suspense fallback={null}>
              <NavBar />
            </Suspense>
          </Sheet>

          <main className="flex flex-1 flex-col">
            <Suspense fallback={null}>{children}</Suspense>
          </main>

          {/* Optionally add footer here */}
        </Providers>
      </body>
    </html>
  );
}
