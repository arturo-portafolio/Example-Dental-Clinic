import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";
import type { 
  InsertService, InsertTeamMember, InsertPromotion, InsertFaq, InsertMessage,
  Service, TeamMember, Promotion, Faq, GalleryItem
} from "@shared/schema";

// === SERVICES ===
export function useServices() {
  return useQuery({
    queryKey: [api.services.list.path],
    queryFn: async () => {
      const res = await fetch(api.services.list.path);
      if (!res.ok) throw new Error("Failed to fetch services");
      return api.services.list.responses[200].parse(await res.json());
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
export function useTeam() {
  const TEAM_PATH = "/api/team";

  return useQuery({
    queryKey: [TEAM_PATH],
    queryFn: async () => {
      const res = await fetch(TEAM_PATH);
      if (!res.ok) throw new Error("Failed to fetch team");
      return api.team.list.responses[200].parse(await res.json());
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
export function usePromotions() {
  return useQuery({
    queryKey: [api.promotions.list.path],
    queryFn: async () => {
      const res = await fetch(api.promotions.list.path);
      if (!res.ok) throw new Error("Failed to fetch promotions");
      return api.promotions.list.responses[200].parse(await res.json());
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
