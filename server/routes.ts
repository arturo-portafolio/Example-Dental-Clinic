import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // -- Services --
  app.get(api.services.list.path, async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });
  
  app.put(api.services.update.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = api.services.update.input.parse(req.body);
      const updated = await storage.updateService(id, data);
      res.json(updated);
    } catch (err) {
      if (err instanceof Error && err.message === "Service not found") {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(400).json({ message: "Invalid input" });
    }
  });

  // -- Team --
  app.get(api.team.list.path, async (req, res) => {
    const team = await storage.getTeamMembers();
    res.json(team);
  });

  app.put(api.team.update.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = api.team.update.input.parse(req.body);
      const updated = await storage.updateTeamMember(id, data);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: "Invalid input or not found" });
    }
  });

  // -- Promotions --
  app.get(api.promotions.list.path, async (req, res) => {
    const promos = await storage.getPromotions();
    res.json(promos);
  });

  app.put(api.promotions.update.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = api.promotions.update.input.parse(req.body);
      const updated = await storage.updatePromotion(id, data);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: "Invalid input or not found" });
    }
  });

  // -- FAQs --
  app.get(api.faqs.list.path, async (req, res) => {
    const faqs = await storage.getFaqs();
    res.json(faqs);
  });

  app.put(api.faqs.update.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = api.faqs.update.input.parse(req.body);
      const updated = await storage.updateFaq(id, data);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: "Invalid input or not found" });
    }
  });

  // -- Gallery --
  app.get(api.gallery.list.path, async (req, res) => {
    const items = await storage.getGalleryItems();
    res.json(items);
  });

  // -- Contact --
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const data = api.contact.submit.input.parse(req.body);
      await storage.createMessage(data);
      // In a real app, we would send an email here.
      res.json({ success: true, message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          field: err.errors[0].path.join('.') 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // -- Admin Auth (Mock) --
  app.post(api.admin.login.path, async (req, res) => {
    const { username, password } = req.body;
    // Simple mock auth - in production use real auth!
    if (username === "admin" && password === "admin123") {
      res.json({ success: true });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  return httpServer;
}
