import {
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  testimonials, type Testimonial, type InsertTestimonial,
  contactSubmissions, type Contact, type InsertContact,
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact form methods
  createContactSubmission(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private testimonials: Map<number, Testimonial>;
  private contactSubmissions: Map<number, Contact>;
  
  currentUserId: number;
  currentProductId: number;
  currentTestimonialId: number;
  currentContactId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.testimonials = new Map();
    this.contactSubmissions = new Map();
    
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentTestimonialId = 1;
    this.currentContactId = 1;
    
    // Initialize with dummy data
    this.initializeProducts();
    this.initializeTestimonials();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Contact form methods
  async createContactSubmission(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contactSubmissions.set(id, contact);
    return contact;
  }
  
  // Initialize with dummy data
  private initializeProducts() {
    const products: InsertProduct[] = [
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
    
    products.forEach(product => {
      this.createProduct(product);
    });
  }
  
  private initializeTestimonials() {
    const testimonials: InsertTestimonial[] = [
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
    
    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export const storage = new MemStorage();
