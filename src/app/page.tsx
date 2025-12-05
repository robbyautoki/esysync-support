import Header from "@/components/shadcn-studio/blocks/hero-section-12/header";
import HeroSection from "@/components/shadcn-studio/blocks/hero-section-12/hero-section-12";
import TestimonialsComponent from "@/components/shadcn-studio/blocks/testimonials-component-06/testimonials-component-06";
import Footer from "@/components/shadcn-studio/blocks/footer-component-02/footer-component-02";
import type { NavigationSection } from "@/components/shadcn-studio/blocks/menu-navigation";

const navigationData: NavigationSection[] = [
  { title: "Startseite", href: "/" },
  { title: "Hilfe", href: "#hilfe" },
  {
    title: "Support",
    items: [
      { title: "Anleitungen", href: "/anleitungen" },
      { title: "FAQ", href: "/faq" },
      { title: "Fernwartung", href: "/fernwartung" },
    ],
  },
  { title: "Kontakt", href: "#kontakt" },
];

const testimonials = [
  {
    name: "Markus Weber",
    role: "Immobilienmakler, München",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "Unser Display im Schaufenster zeigte plötzlich nichts mehr an. Der esysync Support hat das Problem innerhalb von Minuten per Fernwartung gelöst!",
  },
  {
    name: "Sandra Hoffmann",
    role: "Filialleiterin, Sparkasse",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content: "Die digitalen Exposés in unserer Filiale laufen dank des schnellen Supports wieder einwandfrei. Sehr professionelle Hilfe!",
  },
  {
    name: "Thomas Müller",
    role: "Geschäftsführer, Immobilien GmbH",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Seit wir esysync nutzen, haben wir endlich einen zuverlässigen Partner für unsere Display-Systeme. Der Support ist erstklassig.",
  },
  {
    name: "Julia Becker",
    role: "Marketing, Volksbank",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "Schnelle Reaktionszeiten und kompetente Hilfe bei allen technischen Fragen. So stelle ich mir Support vor!",
  },
  {
    name: "Andreas Fischer",
    role: "Inhaber, Fischer Immobilien",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content: "Die Anleitungen sind verständlich und der telefonische Support ist immer erreichbar. Absolute Empfehlung!",
  },
  {
    name: "Petra Schneider",
    role: "Büroleiterin, Raiffeisenbank",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    content: "Nach einem Stromausfall waren unsere Displays durcheinander. Der Support hat alles schnell wieder hergestellt.",
  },
  {
    name: "Stefan Braun",
    role: "IT-Beauftragter, Immobilienbüro",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    content: "Auch komplexere Probleme werden verständlich erklärt und zügig behoben. Top Service!",
  },
  {
    name: "Maria Klein",
    role: "Maklerin, RE/MAX Partner",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    content: "Die Fernwartung spart uns viel Zeit. Probleme werden gelöst, ohne dass ein Techniker kommen muss.",
  },
];

export default function Home() {
  return (
    <main>
      <Header navigationData={navigationData} />
      <HeroSection />
      <TestimonialsComponent testimonials={testimonials} />
      <Footer />
    </main>
  );
}
