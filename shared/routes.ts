import { z } from 'zod';
import { 
  insertServiceSchema, 
  insertTeamMemberSchema, 
  insertPromotionSchema, 
  insertFaqSchema, 
  insertGalleryItemSchema, 
  insertMessageSchema,
  services,
  teamMembers,
  promotions,
  faqs,
  galleryItems,
  messages
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  services: {
    list: {
      method: 'GET' as const,
      path: '/api/services',
      responses: {
        200: z.array(z.custom<typeof services.$inferSelect>()),
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/services/:id',
      input: insertServiceSchema.partial(),
      responses: {
        200: z.custom<typeof services.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  team: {
    list: {
      method: 'GET' as const,
      path: '/api/team',
      responses: {
        200: z.array(z.custom<typeof teamMembers.$inferSelect>()),
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/team/:id',
      input: insertTeamMemberSchema.partial(),
      responses: {
        200: z.custom<typeof teamMembers.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  promotions: {
    list: {
      method: 'GET' as const,
      path: '/api/promotions',
      responses: {
        200: z.array(z.custom<typeof promotions.$inferSelect>()),
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/promotions/:id',
      input: insertPromotionSchema.partial(),
      responses: {
        200: z.custom<typeof promotions.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  faqs: {
    list: {
      method: 'GET' as const,
      path: '/api/faqs',
      responses: {
        200: z.array(z.custom<typeof faqs.$inferSelect>()),
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/faqs/:id',
      input: insertFaqSchema.partial(),
      responses: {
        200: z.custom<typeof faqs.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  gallery: {
    list: {
      method: 'GET' as const,
      path: '/api/gallery',
      responses: {
        200: z.array(z.custom<typeof galleryItems.$inferSelect>()),
      },
    },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertMessageSchema,
      responses: {
        200: z.object({ success: z.boolean(), message: z.string() }),
        400: errorSchemas.validation,
      },
    },
  },
  admin: {
    login: {
      method: 'POST' as const,
      path: '/api/admin/login',
      input: z.object({ username: z.string(), password: z.string() }),
      responses: {
        200: z.object({ success: z.boolean() }),
        401: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
