import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactFormSchema, 
  insertContactSchema,
} from "@shared/schema";
import { ZodError } from "zod";

// Add setupRoutes function that matches what index.ts is expecting
export function setupRoutes(app: Express): void {
  // API routes setup
  
  // Get all products
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  // Get featured products
  app.get("/api/products/featured", async (req: Request, res: Response) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });
  
  // Get products by category
  app.get("/api/products/category/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });
  
  // Get product by ID
  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  // Get all testimonials
  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  // Submit contact form
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const formData = contactFormSchema.parse(req.body);
      const contactData = insertContactSchema.parse(formData);
      
      const result = await storage.createContactSubmission(contactData);
      res.status(201).json({ 
        message: "Your message has been sent successfully!",
        id: result.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: formattedErrors 
        });
      }
      
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup the same routes
  setupRoutes(app);
  
  const httpServer = createServer(app);
  return httpServer;
}
