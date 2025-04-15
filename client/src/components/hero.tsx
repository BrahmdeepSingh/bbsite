import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import brawlBgImage from "@assets/brawl.jpg";
import brawl2v2Image from "@assets/2v2-1024x582.jpg";

export default function Hero() {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center relative bg-cover bg-center" 
      style={{ 
        backgroundImage: `url(${brawlBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/85 to-gray-900/75"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 font-['Poppins']">
              Level Up Your <span className="text-primary font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Brawlhalla</span> Experience
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-lg">
              Professional coaching, boosting services, mammoth coins, and custom video editing from top-tier Brawlhalla players.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild>
                <a href="#products">Shop Now</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary transition-colors" asChild>
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.img 
              src={brawl2v2Image} 
              alt="Brawlhalla 2v2 Match" 
              className="rounded-lg shadow-2xl max-w-full h-auto"
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                easings: ["easeInOut"] 
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
