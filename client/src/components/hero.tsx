import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center relative bg-cover bg-center" 
      style={{ 
        backgroundImage: `url('https://i.imgur.com/QzwSHuN.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-primary/85"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 font-['Poppins']">
              Level Up Your <span className="text-yellow-400">Brawlhalla</span> Experience
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-lg">
              Professional coaching, boosting services, mammoth coins, and custom video editing from top-tier Brawlhalla players.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild>
                <a href="#products">Shop Now</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:text-yellow-400 hover:border-yellow-400" asChild>
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
              src="https://i.imgur.com/7wMQ8DW.png" 
              alt="Brawlhalla Characters" 
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
