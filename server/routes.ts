import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSignupSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist signup endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      const validatedData = insertWaitlistSignupSchema.parse(req.body);
      
      // Check if email already exists
      const existingSignup = await storage.getWaitlistSignupByEmail(validatedData.email);
      if (existingSignup) {
        return res.status(400).json({ 
          message: "Email already registered for waitlist",
          success: false 
        });
      }

      const signup = await storage.createWaitlistSignup(validatedData);
      res.status(201).json({ 
        message: "Successfully joined waitlist", 
        success: true,
        signup: { id: signup.id, email: signup.email }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid email format",
          success: false,
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        message: "Internal server error",
        success: false 
      });
    }
  });

  // Get waitlist count
  app.get("/api/waitlist/count", async (req, res) => {
    try {
      const count = await storage.getWaitlistSignupCount();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ 
        message: "Internal server error",
        count: 0 
      });
    }
  });

  // Get all waitlist signups (for admin view)
  app.get("/api/admin/waitlist", async (req, res) => {
    try {
      const signups = await storage.getAllWaitlistSignups();
      res.json({ signups });
    } catch (error) {
      res.status(500).json({ 
        message: "Internal server error",
        signups: [] 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
