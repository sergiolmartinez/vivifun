import BubblePopGame from "@/components/BubblePopGame";

export default function BubblePopPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-24">
      <h1 className="text-4xl font-bold mb-5 text-white">Bubble Pop Game</h1>
      <BubblePopGame />
    </main>
  );
}
