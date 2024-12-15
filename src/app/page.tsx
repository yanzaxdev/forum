import { xTrans } from "~/translations";
import { serverDetLang } from "./utils/language";
import { popScript } from "./script";
export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { lang?: string };
}) {
  const { t } = await serverDetLang(searchParams);

  // const res = await popScript();
  // if (res) console.log(res);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-4 text-4xl font-bold">{t.welcomeMessage}</h1>
      <p className="mb-6 max-w-md text-center text-lg">
        {t.welcomeDescription}
      </p>
    </main>
  );
}
