import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useServices, usePromotions, useTeam } from "@/hooks/use-content";
import { ServiceCard } from "@/components/ServiceCard";
import { ArrowRight, Star, ShieldCheck, Clock, Award } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const { data: services } = useServices();
  const { data: promotions } = usePromotions();
  
  // Get top 3 services for homepage
  const featuredServices = services?.slice(0, 3) || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 top-0 w-2/3 h-full bg-blue-50/50 clip-path-slant" />
          {/* Abstract blobs */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-primary font-semibold text-sm translate-y-2">
              <Star className="w-4 h-4 fill-primary" />
              Rated #1 Dental Clinic in City
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-foreground">
              Smile with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Confidence</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Experience modern, painless dentistry with a gentle touch. 
              Our expert team is dedicated to your oral health and dazzling smile.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all">
                  Book Appointment
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="rounded-full text-lg h-14 px-8 border-2 hover:bg-white/50">
                  View Services
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex items-center gap-8 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Certified Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Best Technology</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-8 border-white">
              {/* Using Unsplash with descriptive comment */}
              {/* Friendly female dentist smiling at patient in modern dental clinic */}
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000" 
                alt="Modern Dental Care"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl border border-border/50 max-w-xs z-20"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-lg">2,500+</div>
                  <div className="text-xs text-muted-foreground">Happy Patients</div>
                </div>
              </div>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4">Comprehensive Dental Care</h2>
            <p className="text-muted-foreground">
              From routine checkups to complex cosmetic procedures, we offer a full range of dental services tailored to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/services">
              <Button variant="outline" className="rounded-full px-8 gap-2 group">
                View All Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      {promotions && promotions.length > 0 && (
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm font-semibold mb-6">
                    Special Offer
                  </span>
                  <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                    {promotions[0].title}
                  </h2>
                  <p className="text-blue-100 text-lg mb-8 max-w-md">
                    {promotions[0].description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact">
                      <Button size="lg" variant="secondary" className="rounded-full font-bold text-primary">
                        Claim Offer
                      </Button>
                    </Link>
                    {promotions[0].validUntil && (
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="w-5 h-5" />
                        <span>Valid until {promotions[0].validUntil}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="hidden md:block relative">
                   {/* Dental tools on clean background */}
                   <img 
                    src="https://pixabay.com/get/g933b550c8c1861b5f490196daaadc1bba5e04564e2d0f6ae843473ecf6482ab204dd32a2b116700bb087d47ae0e2845fb7dfb732e8fd6336636b15c906ab452f_1280.jpg"
                    alt="Dental Tools"
                    className="rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500"
                   />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center mb-16 gap-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold">What Our Patients Say</h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border rounded-full shadow-sm">
              <SiGoogle className="text-[#4285F4] w-5 h-5" />
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold">4.9</span>
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                </div>
              </div>
              <span className="text-xs text-muted-foreground border-l pl-2 ml-1">Google Reviews</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-secondary/50 p-8 rounded-2xl relative">
                <div className="absolute -top-4 left-8 text-6xl text-primary/20 font-serif">"</div>
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "The best dental experience I've ever had. The staff was incredibly friendly and professional. I actually look forward to my appointments now!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Patient Name</div>
                    <div className="text-xs text-muted-foreground">Whitening Procedure</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Ready for a Brighter Smile?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Schedule your consultation today and take the first step towards the smile you've always dreamed of.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-10 text-lg h-14 shadow-lg shadow-primary/20">
                Book Appointment
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="rounded-full h-14 px-8 bg-white hover:bg-white/80">
              Call (555) 123-4567
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
