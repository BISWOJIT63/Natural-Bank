import HeroSection from '@/components/hero/HeroSection';
import BankFeatures from '@/components/hero/BankFeatures';

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#00ff88] selection:text-black">
            <HeroSection />
            <BankFeatures />
        </main>
    );
}
