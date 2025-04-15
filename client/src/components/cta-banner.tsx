import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CtaBanner() {
  return (
    <section className="py-16 bg-blue-900">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-bold text-3xl text-white mb-6 font-['Poppins']">
            Ready to Dominate in Brawlhalla?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied players who have improved their skills and experience with our premium services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" asChild>
              <a href="#products">Get Started Now</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
              Join Discord
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
