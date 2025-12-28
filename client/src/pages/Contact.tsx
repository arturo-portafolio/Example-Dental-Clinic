import { Layout } from "@/components/Layout";
import { useSubmitContact } from "@/hooks/use-content";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Contact() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const preselectedService = searchParams.get("service") || "";
  
  const { toast } = useToast();
  const mutation = useSubmitContact();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: preselectedService,
      message: "",
      date: "",
    },
  });

  // Update service if URL param changes
  useEffect(() => {
    if (preselectedService) {
      form.setValue("service", preselectedService);
    }
  }, [preselectedService, form]);

  function onSubmit(data: InsertMessage) {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you shortly to confirm your appointment.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  }

  return (
    <Layout title="Contact Us | BrightSmile Dental">
      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to schedule your visit? Fill out the form below or give us a call.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-3xl border shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Book an Appointment</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="rounded-xl h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} className="rounded-xl h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} className="rounded-xl h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Date (Optional)</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} value={field.value || ''} className="rounded-xl h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Interested In</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl h-12">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="General Cleaning">General Cleaning</SelectItem>
                            <SelectItem value="Whitening">Whitening</SelectItem>
                            <SelectItem value="Invisalign">Invisalign</SelectItem>
                            <SelectItem value="Implants">Dental Implants</SelectItem>
                            <SelectItem value="Emergency">Emergency</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message / Concerns</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your dental needs..." 
                            className="resize-none rounded-xl min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-12 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Visit Us</h4>
                      <p className="text-muted-foreground">
                        123 Dental Avenue, Suite 100<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Call Us</h4>
                      <p className="text-muted-foreground">
                        (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Email Us</h4>
                      <p className="text-muted-foreground">
                        hello@brightsmile.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Opening Hours</h3>
                <div className="bg-secondary p-6 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-primary font-bold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="font-medium">Saturday</span>
                    <span className="text-primary font-bold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span className="font-medium">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
              {/* Map Placeholder */}
              <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden relative"> <iframe title="BrightSmile Dental Location" className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=123+Dental+Avenue,+Suite+100,+New+York,+NY+10001&output=embed" /> </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
