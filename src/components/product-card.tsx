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
          <div className="h-40 sm:h-44 md:h-48 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="p-4 sm:p-6">
          <h3 className="font-semibold text-lg sm:text-xl text-white mb-1 sm:mb-2 font-['Poppins'] line-clamp-1">{name}</h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{description}</p>
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <div>
              {discountedPrice ? (
                <>
                  <span className="text-gray-500 line-through mr-2 text-sm sm:text-base">{formattedPrice}</span>
                  <span className="text-white font-bold text-base sm:text-lg">{formattedDiscountedPrice}</span>
                </>
              ) : (
                <span className="text-white font-bold text-base sm:text-lg">{formattedPrice}</span>
              )}
            </div>
            <Button size="sm" className="w-full text-xs sm:text-sm py-1 h-auto sm:h-9">Add to Cart</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
