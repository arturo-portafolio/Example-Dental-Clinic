import { Layout } from "@/components/Layout";
import { useGallery } from "@/hooks/use-content";
import { Skeleton } from "@/components/ui/skeleton";

export default function Gallery() {
  const { data: gallery, isLoading } = useGallery();

  return (
    <Layout title="Smile Gallery | BrightSmile Dental">
      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Smile Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real results from our actual patients. See the difference we can make for your smile.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map(i => <Skeleton key={i} className="h-80 rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
              {gallery?.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl overflow-hidden border shadow-lg">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                    <div className="relative group">
                      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium z-10">Before</div>
                      <img src={item.beforeImage} alt={`Before ${item.title}`} className="w-full h-80 object-cover" />
                    </div>
                    <div className="relative group">
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium z-10">After</div>
                      <img src={item.afterImage} alt={`After ${item.title}`} className="w-full h-80 object-cover" />
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
