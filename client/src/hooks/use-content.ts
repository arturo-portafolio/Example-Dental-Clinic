import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";
import type { 
  InsertService, InsertTeamMember, InsertPromotion, InsertFaq, InsertMessage,
  Service, TeamMember, Promotion, Faq, GalleryItem
} from "@shared/schema";

// === SERVICES ===
const SERVICES_FALLBACK: Service[] = ([
  {
    id: 1,
    title: "General Cleaning",
    category: "Preventive",
    description: "Professional cleaning to keep your teeth and gums healthy with a gentle touch.",
    price: 120,
    image: "",
  },
  {
    id: 2,
    title: "Whitening",
    category: "Cosmetic",
    description: "Brighten your smile safely and quickly with modern whitening techniques.",
    price: 350,
    image: "",
  },
  {
    id: 3,
    title: "Invisalign",
    category: "Cosmetic",
    description: "Clear aligners to straighten your teeth discreetly.",
    price: 0,
    image: "",
  },
  {
    id: 4,
    title: "Dental Implants",
    category: "Restorative",
    description: "Permanent, natural-looking solution for missing teeth.",
    price: 1500,
    image: "",
  },
  {
    id: 5,
    title: "Emergency",
    category: "Urgent Care",
    description: "Fast relief for tooth pain, broken teeth, or urgent dental concerns.",
    price: 0,
    image: "",
  },
  {
    id: 6,
    title: "Consultation",
    category: "General",
    description: "Meet our specialists and get a personalized treatment plan.",
    price: 0,
    image: "",
  },
] as unknown) as Service[];

export function useServices() {
  const SERVICES_PATH = "/api/services";

  return useQuery({
    queryKey: [SERVICES_PATH],
    queryFn: async () => {
      try {
        const res = await fetch(SERVICES_PATH);
        if (!res.ok) throw new Error("Failed to fetch services");

        const json = await res.json();

        const schema: any = api.services.list.responses[200];
        if (schema?.safeParse) {
          const parsed = schema.safeParse(json);
          return parsed.success ? parsed.data : SERVICES_FALLBACK;
        }

        return schema?.parse ? schema.parse(json) : json;
      } catch {
        return SERVICES_FALLBACK;
      }
    },
  });
}



export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & Partial<InsertService>) => {
      const url = buildUrl(api.services.update.path, { id });
      const res = await fetch(url, {
        method: api.services.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update service");
      return api.services.update.responses[200].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.services.list.path] }),
  });
}

// === TEAM ===
const TEAM_FALLBACK: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Sarah Bennett",
    role: "Lead Dentist",
    bio: "Dr. Bennett has over 15 years of experience in restorative and cosmetic dentistry. She loves creating confident smiles.",
    image: "",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Orthodontist",
    bio: "Specializing in Invisalign and braces, Dr. Chen helps patients of all ages achieve a straighter, healthier smile.",
    image: "",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Hygienist",
    bio: "Emily focuses on preventive care and patient comfort, ensuring every visit is smooth and informative.",
    image: "",
  },
];

export function useTeam() {
  const TEAM_PATH = "/api/team";

  return useQuery({
    queryKey: [TEAM_PATH],
    queryFn: async () => {
      try {
        const res = await fetch(TEAM_PATH);
        if (!res.ok) throw new Error("Failed to fetch team");

        const json = await res.json();

        // Intenta validar; si no cuadra el esquema, usa fallback
        const schema: any = api.team.list.responses[200];
        if (schema?.safeParse) {
          const parsed = schema.safeParse(json);
          return parsed.success ? parsed.data : TEAM_FALLBACK;
        }

        return schema?.parse ? schema.parse(json) : json;
      } catch {
        return TEAM_FALLBACK;
      }
    },
  });
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & Partial<InsertTeamMember>) => {
      const url = buildUrl(api.team.update.path, { id });
      const res = await fetch(url, {
        method: api.team.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update team member");
      return api.team.update.responses[200].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.team.list.path] }),
  });
}

// === PROMOTIONS ===
const PROMOTIONS_FALLBACK: Promotion[] = ([
  {
    id: 1,
    title: "New Patient Special: Cleaning + Exam",
    description: "Get a complete dental exam and professional cleaning at a special introductory price.",
    validUntil: "2026-12-31",
    image: "",
  },
  {
    id: 2,
    title: "Whitening Discount",
    description: "Save on professional teeth whitening when you book this month.",
    validUntil: "2026-12-31",
    image: "",
  },
] as unknown) as Promotion[];

export function usePromotions() {
  const PROMOTIONS_PATH = "/api/promotions";

  return useQuery({
    queryKey: [PROMOTIONS_PATH],
    queryFn: async () => {
      try {
        const res = await fetch(PROMOTIONS_PATH);
        if (!res.ok) throw new Error("Failed to fetch promotions");

        const json = await res.json();

        const schema: any = api.promotions.list.responses[200];
        if (schema?.safeParse) {
          const parsed = schema.safeParse(json);
          return parsed.success ? parsed.data : PROMOTIONS_FALLBACK;
        }

        return schema?.parse ? schema.parse(json) : json;
      } catch {
        return PROMOTIONS_FALLBACK;
      }
    },
  });
}


export function useUpdatePromotion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & Partial<InsertPromotion>) => {
      const url = buildUrl(api.promotions.update.path, { id });
      const res = await fetch(url, {
        method: api.promotions.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update promotion");
      return api.promotions.update.responses[200].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.promotions.list.path] }),
  });
}

// === FAQS ===
export function useFaqs() {
  return useQuery({
    queryKey: [api.faqs.list.path],
    queryFn: async () => {
      const res = await fetch(api.faqs.list.path);
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      return api.faqs.list.responses[200].parse(await res.json());
    },
  });
}

export function useUpdateFaq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & Partial<InsertFaq>) => {
      const url = buildUrl(api.faqs.update.path, { id });
      const res = await fetch(url, {
        method: api.faqs.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update FAQ");
      return api.faqs.update.responses[200].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.faqs.list.path] }),
  });
}

// === GALLERY ===
export function useGallery() {
  return useQuery({
    queryKey: [api.gallery.list.path],
    queryFn: async () => {
      const res = await fetch(api.gallery.list.path);
      if (!res.ok) throw new Error("Failed to fetch gallery");
      return api.gallery.list.responses[200].parse(await res.json());
    },
  });
}

// === CONTACT ===
export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contact.submit.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }
      return api.contact.submit.responses[200].parse(await res.json());
    },
  });
}

// === ADMIN AUTH ===
export function useAdminLogin() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.admin.login.input>) => {
      const res = await fetch(api.admin.login.path, {
        method: api.admin.login.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Invalid credentials");
        throw new Error("Login failed");
      }
      return api.admin.login.responses[200].parse(await res.json());
    },
  });
}
