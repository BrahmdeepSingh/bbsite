import { Link } from "wouter";
import { Gamepad } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaDiscord, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const services = [
    { name: "Mammoth Coins", href: "#" },
    { name: "Pro Coaching", href: "#" },
    { name: "Ranked Boosting", href: "#" },
    { name: "Video Editing", href: "#" },
    { name: "Custom Training", href: "#" },
  ];
  
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#" },
    { name: "Services", href: "#products" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];
  
  const policies = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Refund Policy", href: "#" },
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Gamepad className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl text-white font-['Poppins']">BrawlMarket</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your one-stop shop for all Brawlhalla services, helping you become the champion you were meant to be.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Discord">
                <FaDiscord size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="YouTube">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 font-['Poppins']">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 font-['Poppins']">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 font-['Poppins']">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow bg-gray-800 border border-gray-700 rounded-r-none text-white focus:ring-primary"
              />
              <Button className="rounded-l-none px-4" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="m22 2-7 20-4-9-9-4Z"></path>
                  <path d="M22 2 11 13"></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} BrawlMarket. All rights reserved.
          </p>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            {policies.map((policy, index) => (
              <a 
                key={index}
                href={policy.href}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                {policy.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
