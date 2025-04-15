import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    id,
    name,
    description,
    price,
    discountedPrice,
    discountPercentage,
    imageUrl
  } = product;

  // Format prices from cents to dollars
  const formattedPrice = `$${(price / 100).toFixed(2)}`;
  const formattedDiscountedPrice = discountedPrice 
    ? `$${(discountedPrice / 100).toFixed(2)}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full group">
        <div className="relative">
          {discountPercentage && (
            <Badge className="absolute top-2 right-2 z-10 bg-primary text-white">
              -{discountPercentage}%
            </Badge>
          )}
          <div className="h-48 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="font-semibold text-xl text-white mb-2 font-['Poppins']">{name}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
          <div className="flex flex-col space-y-4">
            <div>
              {discountedPrice ? (
                <>
                  <span className="text-gray-500 line-through mr-2">{formattedPrice}</span>
                  <span className="text-white font-bold text-lg">{formattedDiscountedPrice}</span>
                </>
              ) : (
                <span className="text-white font-bold text-lg">{formattedPrice}</span>
              )}
            </div>
            <Button size="sm" className="w-full">Add to Cart</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
