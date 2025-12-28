import { Layout } from "@/components/Layout";
import { usePromotions } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Clock, Ticket, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Promotions() {
  const { data: promotions, isLoading } = usePromotions();

  return (
    <Layout title="Special Offers | BrightSmile Dental">
      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Special Offers</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Quality dental care should be accessible. Take advantage of our current promotions.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {isLoading ? (
             <div className="space-y-6">
               {[1,2].map(i => <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />)}
             </div>
          ) : (
            <div className="space-y-8">
              {promotions?.map((promo) => (
                <div key={promo.id} className="bg-white rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
                  <div className="bg-primary p-8 md:w-1/3 flex flex-col justify-center items-center text-white text-center">
                    <Ticket className="w-12 h-12 mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold font-display">Limited Time</h3>
                  </div>
                  <div className="p-8 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">{promo.title}</h3>
                      <p className="text-muted-foreground text-lg mb-6">{promo.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span>New patients only</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span>Cannot be combined with insurance</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm font-medium text-orange-500">
                        <Clock className="w-4 h-4" />
                        <span>Valid until {promo.validUntil}</span>
                      </div>
                      <Link href="/contact">
                        <Button>Claim Offer</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
