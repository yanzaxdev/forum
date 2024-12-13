import { xTrans } from "~/translations";
import { Text } from "./components/text";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-4 text-4xl font-bold">
        <Text text={xTrans.welcomeMessage}></Text>
      </h1>
      <p className="mb-6 max-w-md text-center text-lg">
        <Text text={xTrans.welcomeDescription}></Text>
      </p>
    </main>
  );
}
