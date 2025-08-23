import ThemeBtn from "@/components/ThemeBtn";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import MatrixRain from "./_components/MatrixRain";
import HeaderWithMetaInfo from "./map/_components/HeaderWithMetaInfo";

const Page = async () => {
    return (
        <div className="relative min-h-dvh h-full">
            <ThemeBtn className="absolute top-4 right-0 rounded-e-none bg-background border border-border" />
            <HeaderWithMetaInfo headerTextOnly />

            <MatrixRain />
            <Hero />
            <Footer />
        </div>
    );
};

export default Page;
