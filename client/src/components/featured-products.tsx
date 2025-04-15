import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ProductCard from "./product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedProducts() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  // Loading skeletons
  const ProductSkeleton = () => (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full">
      <Skeleton className="w-full h-48" />
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl text-white mb-2 font-['Poppins']">
            Current <span className="text-primary">Deals</span>
          </h2>
          <h3 className="text-xl text-primary font-semibold mb-4">Up to 50% OFF</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Exclusive offers on our most popular Brawlhalla services, perfect for players looking to gain an edge in the arena.
          </p>
        </div>
        
        {error ? (
          <div className="text-center text-red-500 my-12">
            Failed to load products. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              // Show loading skeletons
              Array(4).fill(0).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : (
              // Show products
              products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-medium">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
