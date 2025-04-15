import { motion } from "framer-motion";
import { Trophy, Shield, Zap } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Trophy className="h-10 w-10" />,
      title: "Expert Players",
      description: "Our team consists of top-ranked Brawlhalla players with tournament experience."
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Secure Transactions",
      description: "Your account information and payments are protected with advanced security measures."
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Fast Delivery",
      description: "Instant delivery for digital goods and quick service completion for coaching and boosting."
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl text-white mb-4 font-['Poppins']">
            Why Choose <span className="text-primary">BrawlMarket</span>?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're dedicated to providing the highest quality Brawlhalla services with a team of professional players.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-800 rounded-xl p-8 text-center transition-shadow hover:shadow-xl"
            >
              <div className="text-primary text-4xl mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl text-white mb-3 font-['Poppins']">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
