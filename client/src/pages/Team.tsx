import { Layout } from "@/components/Layout";
import { useTeam } from "@/hooks/use-content";
import { Skeleton } from "@/components/ui/skeleton";
import { Linkedin, Mail } from "lucide-react";

export default function Team() {
  const { data: team, isLoading } = useTeam();

  return (
    <Layout title="Meet the Team | BrightSmile Dental">
      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Meet Our Experts</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our team of highly qualified and experienced professionals is dedicated to caring for your smile.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-96 rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {team?.map((member) => (
                <div key={member.id} className="group text-center">
                  <div className="relative mb-6 mx-auto w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors z-10" />
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center text-4xl font-bold text-muted-foreground">
                        {member.name[0]}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground mb-6 leading-relaxed max-w-xs mx-auto">
                    {member.bio}
                  </p>
                  
                  <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    <button className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </button>
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
