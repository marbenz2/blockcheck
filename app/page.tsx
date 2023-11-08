import Blocks from "./components/Blocks";
import Marketdata from "./components/Marketdata";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-stone-300 pb-12 relative">
      <Navbar />
      <section className="flex flex-row flex-wrap justify-center items-center gap-4 pt-4 px-4">
        <Blocks />
      </section>
      <section className="flex flex-row justify-center items-center pt-4 p px-4">
        <Marketdata />
      </section>
      <footer className="flex bottom-0 h-8 w-full justify-center items-center bg-gray-100 absolute">
        <p>&copy; 2023 - MarBenz</p>
      </footer>
    </main>
  );
}
