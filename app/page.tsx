import BlockCard from "./components/BlockCard";
import Marketdata from "./components/Marketdata";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-stone-600">
      <Navbar />
      <section className="flex flex-row flex-wrap px-4 pt-4 gap-4">
        <BlockCard key={"0x1"} block={{}} />
      </section>
      <section className="flex px-4 pt-4">
        <Marketdata />
      </section>
    </main>
  );
}
