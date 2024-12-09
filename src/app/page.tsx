import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await db.query.posts.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Hello 2
    </main>
  );
}
