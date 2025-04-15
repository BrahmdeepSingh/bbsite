// src/server/index.ts
import express2 from "express";
import { createServer as createServer2 } from "http";
import { Server } from "socket.io";

// src/server/routes.ts
import { createServer } from "http";

// src/server/storage.ts
var MemStorage = class {
  users;
  products;
  testimonials;
  contactSubmissions;
  currentUserId;
  currentProductId;
  currentTestimonialId;
  currentContactId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.products = /* @__PURE__ */ new Map();
    this.testimonials = /* @__PURE__ */ new Map();
    this.contactSubmissions = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentTestimonialId = 1;
    this.currentContactId = 1;
    this.initializeProducts();
    this.initializeTestimonials();
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Product methods
  async getAllProducts() {
    return Array.from(this.products.values());
  }
  async getFeaturedProducts() {
    return Array.from(this.products.values()).filter((product) => product.featured);
  }
  async getProductsByCategory(category) {
    return Array.from(this.products.values()).filter((product) => product.category === category);
  }
  async getProductById(id) {
    return this.products.get(id);
  }
  async createProduct(insertProduct) {
    const id = this.currentProductId++;
    const product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  // Testimonial methods
  async getAllTestimonials() {
    return Array.from(this.testimonials.values());
  }
  async createTestimonial(insertTestimonial) {
    const id = this.currentTestimonialId++;
    const testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  // Contact form methods
  async createContactSubmission(insertContact) {
    const id = this.currentContactId++;
    const contact = {
      ...insertContact,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactSubmissions.set(id, contact);
    return contact;
  }
  // Initialize with dummy data
  initializeProducts() {
    const products2 = [
      {
        name: "Mammoth Coins Pack",
        description: "140 Mammoth Coins for all your in-game purchases. Instant delivery to your account.",
        category: "mammoth_coins",
        price: 1999,
        discountedPrice: 1499,
        discountPercentage: 25,
        imageUrl: "https://i.imgur.com/KO8n1Nz.png",
        featured: true
      },
      {
        name: "Pro Coaching Session",
        description: "2-hour coaching session with top 100 ranked player. Learn advanced strategies and combos.",
        category: "coaching",
        price: 3999,
        discountedPrice: 3399,
        discountPercentage: 15,
        imageUrl: "https://i.imgur.com/Cq9czR8.png",
        featured: true
      },
      {
        name: "Ranked Boosting",
        description: "Get boosted to Gold rank by our professional players. Secure and discreet service.",
        category: "boosting",
        price: 4999,
        discountedPrice: 3499,
        discountPercentage: 30,
        imageUrl: "https://i.imgur.com/7EHMofi.png",
        featured: true
      },
      {
        name: "Montage Editing",
        description: "Professional editing of your best Brawlhalla moments into an epic montage video.",
        category: "editing",
        price: 2999,
        discountedPrice: 2399,
        discountPercentage: 20,
        imageUrl: "https://i.imgur.com/Y8RaVQo.png",
        featured: true
      },
      {
        name: "Elite Coaching Package",
        description: "5-session coaching package with personalized improvement plan and follow-ups.",
        category: "coaching",
        price: 9999,
        discountedPrice: 7999,
        discountPercentage: 20,
        imageUrl: "https://i.imgur.com/aTjKVaO.png",
        featured: false
      },
      {
        name: "Legend Mastery Course",
        description: "Master specific Brawlhalla legends with our specialized coaching program.",
        category: "coaching",
        price: 2499,
        discountedPrice: null,
        discountPercentage: null,
        imageUrl: "https://i.imgur.com/rrr5dtW.png",
        featured: false
      },
      {
        name: "Diamond Rank Boosting",
        description: "Guaranteed boosting to Diamond rank by our top players.",
        category: "boosting",
        price: 9999,
        discountedPrice: 8499,
        discountPercentage: 15,
        imageUrl: "https://i.imgur.com/mP33Eii.png",
        featured: false
      },
      {
        name: "340 Mammoth Coins",
        description: "340 Mammoth Coins at the best price. Delivered instantly to your account.",
        category: "mammoth_coins",
        price: 3499,
        discountedPrice: null,
        discountPercentage: null,
        imageUrl: "https://i.imgur.com/P5ONJwM.png",
        featured: false
      }
    ];
    products2.forEach((product) => {
      this.createProduct(product);
    });
  }
  initializeTestimonials() {
    const testimonials2 = [
      {
        customerName: "Jake Reynolds",
        customerImage: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        comment: "The coaching session was amazing! I learned so many new techniques and my gameplay improved instantly. Would definitely recommend to any serious Brawlhalla player."
      },
      {
        customerName: "Sarah Mitchell",
        customerImage: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4,
        comment: "Super fast delivery of my Mammoth Coins! The process was smooth and I received exactly what I paid for. Will be coming back for future purchases."
      },
      {
        customerName: "Marcus Wong",
        customerImage: "https://randomuser.me/api/portraits/men/67.jpg",
        rating: 5,
        comment: "The montage edit they created from my clips was absolutely insane! Professional quality that made me look like a pro. Worth every penny!"
      },
      {
        customerName: "Alex Turner",
        customerImage: "https://randomuser.me/api/portraits/women/28.jpg",
        rating: 4,
        comment: "The boosting service helped me get out of silver rank where I was stuck for months. The booster was professional and completed the job faster than expected."
      }
    ];
    testimonials2.forEach((testimonial) => {
      this.createTestimonial(testimonial);
    });
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  // mammoth_coins, coaching, boosting, editing
  price: integer("price").notNull(),
  // in cents
  discountedPrice: integer("discounted_price"),
  // in cents
  discountPercentage: integer("discount_percentage"),
  imageUrl: text("image_url").notNull(),
  featured: boolean("featured").default(false)
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true
});
var testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerImage: text("customer_image").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull()
});
var insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true
});
var contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

// src/server/routes.ts
import { ZodError } from "zod";
function setupRoutes(app2) {
  app2.get("/api/products", async (req, res) => {
    try {
      const products2 = await storage.getAllProducts();
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/featured", async (req, res) => {
    try {
      const products2 = await storage.getFeaturedProducts();
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });
  app2.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products2 = await storage.getProductsByCategory(category);
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
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
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials2 = await storage.getAllTestimonials();
      res.json(testimonials2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
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
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join("."),
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
async function registerRoutes(app2) {
  setupRoutes(app2);
  const httpServer2 = createServer(app2);
  return httpServer2;
}

// src/server/socket.ts
function setupSocket(io2) {
  io2.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

// src/server/index.ts
import path3 from "path";

// src/server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __dirname2 = path.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname2, "./src"),
      "@shared": path.resolve(__dirname2, "./shared"),
      "@assets": path.resolve(__dirname2, "./attached_assets")
    }
  },
  root: path.resolve(__dirname2, "src"),
  build: {
    outDir: "../public",
    emptyOutDir: true
  }
});

// src/server/vite.ts
import { nanoid } from "nanoid";
import { fileURLToPath as fileURLToPath2 } from "url";
var __dirname3 = path2.dirname(fileURLToPath2(import.meta.url));
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname3,
        "..",
        "..",
        "src",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="./main.tsx"`,
        `src="./main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname3, "../../public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// src/server/index.ts
var app = express2();
var httpServer = createServer2(app);
var io = new Server(httpServer);
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "production") {
  app.use(express2.static(path3.join(__dirname, "../../public")));
}
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
setupRoutes(app);
setupSocket(io);
if (app.get("env") === "development") {
  await registerRoutes(app);
  await setupVite(app, httpServer);
} else {
  serveStatic(app);
}
var PORT = process.env.PORT || 3e3;
httpServer.listen(PORT, () => {
  log(`Server is running on port ${PORT}`);
});
