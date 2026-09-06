import { Hero } from "@/components/hero/Hero";
import { Navigation } from "@/components/navigation/Navigation";

export default function Home() {
  return (
    <main
      id="top"
      className="platform-shell"
    >
      <Navigation />
      <Hero />
    </main>
  );
}