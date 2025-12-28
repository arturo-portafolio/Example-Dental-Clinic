import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { Helmet } from "react-helmet-async";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function Layout({ 
  children, 
  title = "BrightSmile Dental | Modern Dental Care",
  description = "BrightSmile Dental offers comprehensive dental care including cleanings, whitening, implants and invisalign. Book your appointment today."
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <Navigation />
      
      <main className="flex-grow pt-20">
        {children}
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
