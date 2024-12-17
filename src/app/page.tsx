import { serverDetLang } from "../utils/language";
import { cn } from "~/lib/utils";
export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: {
    lang?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { t } = await serverDetLang(searchParams);

  return (
    <main
      dir={t._dir}
      className={cn(
        "flex min-h-screen flex-col",
        "items-center justify-center",
        "px-4 py-8",
      )}
    >
      <h1 className={cn("text-4xl font-bold", "mb-4")}>{t.welcomeMessage}</h1>

      <p className={cn("text-center text-lg", "max-w-md", "mb-6")}>
        {t.welcomeDescription}
      </p>
    </main>
  );
}
