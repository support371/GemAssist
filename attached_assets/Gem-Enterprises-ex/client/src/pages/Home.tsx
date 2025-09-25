import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesOverview />
    </div>
  );
}