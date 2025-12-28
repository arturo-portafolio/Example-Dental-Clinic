import { Layout } from "@/components/Layout";
import { useFaqs } from "@/hooks/use-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Faq() {
  const { data: faqs, isLoading } = useFaqs();

  return (
    <Layout title="FAQ | BrightSmile Dental">
      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Got questions? We have answers. If you don't see your question here, feel free to contact us.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs?.map((faq) => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border rounded-xl px-4 bg-white shadow-sm">
                  <AccordionTrigger className="text-lg font-medium text-left hover:text-primary transition-colors py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>
    </Layout>
  );
}
