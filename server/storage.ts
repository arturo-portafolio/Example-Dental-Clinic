import { 
  users, type User, type InsertUser,
  services, type Service, type InsertService,
  teamMembers, type TeamMember, type InsertTeamMember,
  promotions, type Promotion, type InsertPromotion,
  faqs, type Faq, type InsertFaq,
  galleryItems, type GalleryItem, type InsertGalleryItem,
  messages, type Message, type InsertMessage
} from "@shared/schema";

export interface IStorage {
  // Services
  getServices(): Promise<Service[]>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;

  // Team
  getTeamMembers(): Promise<TeamMember[]>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember>;

  // Promotions
  getPromotions(): Promise<Promotion[]>;
  updatePromotion(id: number, promotion: Partial<InsertPromotion>): Promise<Promotion>;

  // FAQs
  getFaqs(): Promise<Faq[]>;
  updateFaq(id: number, faq: Partial<InsertFaq>): Promise<Faq>;

  // Gallery
  getGalleryItems(): Promise<GalleryItem[]>;

  // Messages
  createMessage(message: InsertMessage): Promise<Message>;

  // User (Admin) - kept for compatibility, though we use static auth
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private services: Map<number, Service>;
  private teamMembers: Map<number, TeamMember>;
  private promotions: Map<number, Promotion>;
  private faqs: Map<number, Faq>;
  private galleryItems: Map<number, GalleryItem>;
  private messages: Map<number, Message>;
  private users: Map<number, User>;
  
  private currentId: { [key: string]: number } = {
    services: 1,
    team: 1,
    promotions: 1,
    faqs: 1,
    gallery: 1,
    messages: 1,
    users: 1
  };

  constructor() {
    this.services = new Map();
    this.teamMembers = new Map();
    this.promotions = new Map();
    this.faqs = new Map();
    this.galleryItems = new Map();
    this.messages = new Map();
    this.users = new Map();

    this.seedData();
  }

  private seedData() {
    // Seed Services
    const initialServices: InsertService[] = [
      { title: "General Cleanings", description: "Regular dental check-ups and cleanings to maintain optimal oral health.", price: "Starting at $120", category: "General" },
      { title: "Professional Whitening", description: "Brighten your smile up to 8 shades in a single visit.", price: "Starting at $350", category: "Cosmetic" },
      { title: "Invisalign", description: "Clear aligners to straighten your teeth discreetly.", price: "Consultation Required", category: "Cosmetic" },
      { title: "Dental Implants", description: "Permanent, natural-looking solution for missing teeth.", price: "Starting at $1,500", category: "Restorative" },
      { title: "Emergency Dentistry", description: "Immediate care for toothaches, accidents, and urgent dental needs.", price: "Varies", category: "General" }
    ];
    initialServices.forEach(s => this.createService(s));

    // Seed Team
    const initialTeam: InsertTeamMember[] = [
      { name: "Dr. Sarah Bennett", role: "Lead Dentist", bio: "Dr. Bennett has over 15 years of experience in restorative and cosmetic dentistry. She loves creating confident smiles.", image: "" },
      { name: "Dr. Michael Chen", role: "Orthodontist", bio: "Specializing in Invisalign and braces, Dr. Chen helps patients of all ages achieve straighter teeth.", image: "" },
      { name: "Emily Davis", role: "Dental Hygienist", bio: "Emily is known for her gentle touch and dedication to patient education.", image: "" }
    ];
    initialTeam.forEach(t => this.createTeamMember(t));

    // Seed Promotions
    const initialPromos: InsertPromotion[] = [
      { title: "New Patient Special", description: "Exam, X-Rays, and Cleaning for only $99.", validUntil: "Dec 31, 2025" },
      { title: "Free Whitening Consult", description: "Book any cosmetic procedure and get a free whitening consultation.", validUntil: "Ongoing" }
    ];
    initialPromos.forEach(p => this.createPromotion(p));

    // Seed FAQs
    const initialFaqs: InsertFaq[] = [
      { question: "Do you accept insurance?", answer: "Yes, we accept most major PPO insurance plans. Please call our office to verify your coverage." },
      { question: "How often should I visit the dentist?", answer: "We recommend visiting every 6 months for a routine check-up and cleaning." },
      { question: "Do you treat children?", answer: "Absolutely! We love seeing patients of all ages, including children." },
      { question: "What if I have a dental emergency?", answer: "Call us immediately at +1 (555) 123-4567. We offer same-day appointments for emergencies." }
    ];
    initialFaqs.forEach(f => this.createFaq(f));

    // Seed Gallery
    const initialGallery: InsertGalleryItem[] = [
      { title: "Teeth Whitening", beforeImage: "", afterImage: "" },
      { title: "Invisalign Correction", beforeImage: "", afterImage: "" },
      { title: "Dental Implants", beforeImage: "", afterImage: "" }
    ];
    initialGallery.forEach(g => this.createGalleryItem(g));
  }

  // Helper creators (internal only for seeding)
  private createService(insert: InsertService) {
    const id = this.currentId.services++;
    this.services.set(id, { ...insert, id, image: insert.image || null });
  }
  private createTeamMember(insert: InsertTeamMember) {
    const id = this.currentId.team++;
    this.teamMembers.set(id, { ...insert, id, image: insert.image || null });
  }
  private createPromotion(insert: InsertPromotion) {
    const id = this.currentId.promotions++;
    this.promotions.set(id, { ...insert, id, validUntil: insert.validUntil || null });
  }
  private createFaq(insert: InsertFaq) {
    const id = this.currentId.faqs++;
    this.faqs.set(id, { ...insert, id });
  }
  private createGalleryItem(insert: InsertGalleryItem) {
    const id = this.currentId.gallery++;
    this.galleryItems.set(id, { ...insert, id });
  }

  // Public Interface Implementation

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  async updateService(id: number, updates: Partial<InsertService>): Promise<Service> {
    const existing = this.services.get(id);
    if (!existing) throw new Error("Service not found");
    const updated = { ...existing, ...updates };
    this.services.set(id, updated);
    return updated;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }
  async updateTeamMember(id: number, updates: Partial<InsertTeamMember>): Promise<TeamMember> {
    const existing = this.teamMembers.get(id);
    if (!existing) throw new Error("Team member not found");
    const updated = { ...existing, ...updates };
    this.teamMembers.set(id, updated);
    return updated;
  }

  async getPromotions(): Promise<Promotion[]> {
    return Array.from(this.promotions.values());
  }
  async updatePromotion(id: number, updates: Partial<InsertPromotion>): Promise<Promotion> {
    const existing = this.promotions.get(id);
    if (!existing) throw new Error("Promotion not found");
    const updated = { ...existing, ...updates };
    this.promotions.set(id, updated);
    return updated;
  }

  async getFaqs(): Promise<Faq[]> {
    return Array.from(this.faqs.values());
  }
  async updateFaq(id: number, updates: Partial<InsertFaq>): Promise<Faq> {
    const existing = this.faqs.get(id);
    if (!existing) throw new Error("FAQ not found");
    const updated = { ...existing, ...updates };
    this.faqs.set(id, updated);
    return updated;
  }

  async getGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values());
  }

  async createMessage(insert: InsertMessage): Promise<Message> {
    const id = this.currentId.messages++;
    const message: Message = { ...insert, id, phone: insert.phone || null, date: insert.date || null };
    this.messages.set(id, message);
    return message;
  }

  // User methods (stubbed or simple implementation)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
