import "~/styles/globals.css";
import { Suspense, type ReactNode } from "react";
import { Providers } from "./providers"; // We'll create a separate file for theme and context providers
import NavBar from "~/components/Navbar";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { popScript } from "../tsScripts/generalScript";

export const metadata = {
  title: "Open Uni Forum",
  description: "A simple forum for Open University courses",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen transition-colors">
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}

// <ClerkProvider>
// <SignedOut>
//   <SignInButton />
// </SignedOut>
// <SignedIn>
//   <UserButton />
// </SignedIn>

// </ClerkProvider>
