import { useState } from "react";
import { useAdminLogin, useServices, useTeam, usePromotions, useFaqs } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Layout } from "@/components/Layout";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useAdminLogin();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ username, password }, {
      onSuccess: () => {
        toast({ title: "Welcome back!" });
        onLogin();
      },
      onError: (err) => {
        toast({ title: "Login Failed", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Enter credentials to access dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              placeholder="Username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
            <Input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Dashboard() {
  const { data: services } = useServices();
  const { data: team } = useTeam();
  const { data: promotions } = usePromotions();
  const { data: faqs } = useFaqs();

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="services">
        <TabsList className="mb-8 w-full justify-start h-auto p-2 bg-secondary/50 rounded-xl overflow-x-auto">
          <TabsTrigger value="services" className="px-6 py-2">Services</TabsTrigger>
          <TabsTrigger value="team" className="px-6 py-2">Team</TabsTrigger>
          <TabsTrigger value="promotions" className="px-6 py-2">Promotions</TabsTrigger>
          <TabsTrigger value="faqs" className="px-6 py-2">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
           {services?.map(service => (
             <Card key={service.id}>
               <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                   <CardTitle>{service.title}</CardTitle>
                   <CardDescription>{service.category}</CardDescription>
                 </div>
                 <Button variant="outline" size="sm">Edit</Button>
               </CardHeader>
             </Card>
           ))}
           <Button className="w-full mt-4">Add New Service</Button>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          {team?.map(member => (
             <Card key={member.id}>
               <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                   <CardTitle>{member.name}</CardTitle>
                   <CardDescription>{member.role}</CardDescription>
                 </div>
                 <Button variant="outline" size="sm">Edit</Button>
               </CardHeader>
             </Card>
           ))}
           <Button className="w-full mt-4">Add Team Member</Button>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-4">
          {promotions?.map(promo => (
             <Card key={promo.id}>
               <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                   <CardTitle>{promo.title}</CardTitle>
                   <CardDescription>Valid until: {promo.validUntil}</CardDescription>
                 </div>
                 <Button variant="outline" size="sm">Edit</Button>
               </CardHeader>
             </Card>
           ))}
           <Button className="w-full mt-4">Add Promotion</Button>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-4">
           {faqs?.map(faq => (
             <Card key={faq.id}>
               <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                   <CardTitle className="text-base">{faq.question}</CardTitle>
                 </div>
                 <Button variant="outline" size="sm">Edit</Button>
               </CardHeader>
             </Card>
           ))}
           <Button className="w-full mt-4">Add FAQ</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Layout title="Admin Portal | BrightSmile Dental">
      <div className="container mx-auto px-4 md:px-6">
        {isAuthenticated ? (
          <Dashboard />
        ) : (
          <LoginForm onLogin={() => setIsAuthenticated(true)} />
        )}
      </div>
    </Layout>
  );
}
