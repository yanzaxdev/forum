"use client";

import { useLanguage } from "./providers";

export default function HomePage() {
  const { language } = useLanguage();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-4 text-4xl font-bold">
        {language === "en"
          ? "Welcome to the Open Uni Forum"
          : "ברוכים הבאים לפורום האוניברסיטה הפתוחה"}
      </h1>
      <p className="mb-6 max-w-md text-center text-lg">
        {language === "en"
          ? "A place to share thoughts, leave feedback, and explore courses offered at the Open University."
          : "מקום לשתף מחשבות, להשאיר משוב, ולחקור קורסים באוניברסיטה הפתוחה."}
      </p>
    </main>
  );
}
