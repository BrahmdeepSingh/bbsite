import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Gamepad, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Shop", href: "#products" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className={`fixed w-full z-50 transition-colors duration-300 ${scrolled ? "bg-gray-900/95 shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Gamepad className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl text-white font-['Poppins']">BrawlMarket</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-white hover:text-primary transition-colors font-medium"
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative text-white hover:text-primary hover:bg-transparent">
            <ShoppingCart className="h-6 w-6" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white">
              3
            </Badge>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:text-primary hover:bg-transparent">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-900 border-gray-800">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <a 
                      href={item.href}
                      className="text-white hover:text-primary transition-colors py-2 text-lg"
                    >
                      {item.name}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button className="w-full mt-4">Sign In</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          
          <Button className="hidden md:block">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
