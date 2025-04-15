import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import logoImage from "@assets/cropped-cropped-Untitled-1-1-removebg-preview.png";

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
    { 
      name: "Shop", 
      href: "#products",
      dropdown: true,
      items: [
        { name: "Boosting", href: "#" },
        { name: "Mammoth Coins", href: "#" },
        { name: "Codes", href: "#" },
        { name: "Coaching", href: "#" },
        { name: "Others", href: "#" }
      ]
    },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className={`fixed w-full z-50 transition-colors duration-300 ${scrolled ? "bg-gray-900/95 shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left section - Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center space-x-2">
              <img src={logoImage} alt="Logo" className="h-10 w-10" />
              <span className="font-bold text-2xl text-white font-['Poppins']">Brawlhalla Shop</span>
            </Link>
          </div>
          
          {/* Center section - Navigation */}
          <div className="flex-1 flex justify-center">
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                item.dropdown ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger className="text-white hover:text-primary transition-colors font-medium flex items-center space-x-1 focus:outline-none">
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                      {item.items?.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} className="focus:bg-gray-800 cursor-pointer" asChild>
                          <a 
                            href={subItem.href}
                            className="w-full px-2 py-1.5 text-sm hover:text-primary transition-colors"
                          >
                            {subItem.name}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <a 
                    key={item.name} 
                    href={item.href}
                    className="text-white hover:text-primary transition-colors font-medium"
                  >
                    {item.name}
                  </a>
                )
              ))}
            </nav>
          </div>
          
          {/* Right section - Cart and Mobile Menu */}
          <div className="flex-1 flex justify-end items-center space-x-4">
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
                    item.dropdown ? (
                      <div key={item.name} className="space-y-2">
                        <p className="text-white font-semibold py-2 text-lg">{item.name}</p>
                        <div className="flex flex-col space-y-2 pl-4 border-l border-gray-700">
                          {item.items?.map((subItem) => (
                            <SheetClose asChild key={subItem.name}>
                              <a 
                                href={subItem.href}
                                className="text-gray-300 hover:text-primary transition-colors py-1 text-base"
                              >
                                {subItem.name}
                              </a>
                            </SheetClose>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <SheetClose asChild key={item.name}>
                        <a 
                          href={item.href}
                          className="text-white hover:text-primary transition-colors py-2 text-lg"
                        >
                          {item.name}
                        </a>
                      </SheetClose>
                    )
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
