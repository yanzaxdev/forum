import "~/styles/globals.css";
import { Suspense, type ReactNode } from "react";
import { Providers } from "./providers"; // We'll create a separate file for theme and context providers
import NavBar from "~/components/Navbar";

import { popScript } from "../tsScripts/generalScript";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { serverDetLang } from "~/utils/language";
import ForumSheet from "~/components/ForumSheet";
import { Assistant } from "next/font/google";

export const metadata = {
  title: "Open Uni Forum",
  description: "A simple forum for Open University courses",
};

const assistant = Assistant({
  subsets: ["hebrew"],
  weight: ["200", "300", "400", "500", "600", "700", "800"], // include the weights you need
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isHeb, lang, t, langParam } = await serverDetLang();

  return (
    <html lang="en" suppressHydrationWarning className={assistant.className}>
      <body className="bg-background text-foreground flex min-h-screen flex-col transition-colors">
        <Providers>
          <Sheet>
            <ForumSheet />
            <NavBar />
          </Sheet>
          {/* Main content wrapper */}
          <div className="flex flex-1 flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
