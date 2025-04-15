import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Testimonial } from "@shared/schema";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { QuoteIcon } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkMobile();
    
    // Add listener for window resize
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Removed auto-carousel functionality

  const handlePrev = () => {
    if (!testimonials) return;
    setCurrentIndex(prev => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (!testimonials) return;
    setCurrentIndex(prev => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  // For mobile we show one testimonial at a time
  // For desktop we show 3 testimonials with the current one in the middle
  const getVisibleTestimonials = () => {
    if (!testimonials) return [];
    
    if (isMobile) {
      return [testimonials[currentIndex]];
    } else {
      // For desktop, show 3 testimonials
      const items = [];
      
      // Previous testimonial
      const prevIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
      items.push(testimonials[prevIndex]);
      
      // Current testimonial
      items.push(testimonials[currentIndex]);
      
      // Next testimonial
      const nextIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
      items.push(testimonials[nextIndex]);
      
      return items;
    }
  };

  // Skeleton loader for testimonials
  const TestimonialSkeleton = () => (
    <div className="bg-gray-800 rounded-xl p-8 relative h-full border border-gray-700 shadow-lg">
      <div className="flex justify-end mb-6">
        <div className="flex space-x-1">
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-4 w-4" />
          ))}
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-3" />
      <Skeleton className="h-4 w-11/12 mb-3" />
      <Skeleton className="h-4 w-10/12" />
    </div>
  );

  return (
    <section id="testimonials" className="py-20 bg-gray-950 relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl text-white mb-4 font-['Poppins']">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from players who have used our services.
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          {error ? (
            <div className="text-center text-red-500 my-12">
              Failed to load testimonials. Please try again later.
            </div>
          ) : (
            <div className="flex justify-center">
              <div className={`flex transition-all duration-500 ease-in-out ${isMobile ? 'w-full' : 'w-full md:w-4/5'}`}>
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {Array(isMobile ? 1 : 3).fill(0).map((_, index) => (
                      <TestimonialSkeleton key={index} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {getVisibleTestimonials().map((testimonial, index) => (
                      <motion.div
                        key={`${testimonial.id}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative"
                      >
                        <div className="bg-gray-800 rounded-xl p-8 relative h-full border border-gray-700 shadow-lg">
                          <div className="text-primary text-4xl absolute top-6 left-6 opacity-20">
                            <QuoteIcon size={40} />
                          </div>
                          <div className="flex justify-end mb-6">
                            <div className="flex text-primary">
                              {Array(5).fill(0).map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={16} 
                                  fill={i < testimonial.rating ? "currentColor" : "none"} 
                                  className={i < testimonial.rating ? "text-primary" : "text-gray-500"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-300 relative z-10 text-lg italic">{testimonial.comment}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {!isLoading && testimonials && testimonials.length > 0 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-primary text-white hover:bg-primary/90 rounded-full p-2 hidden md:flex"
              >
                <ChevronLeft />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary text-white hover:bg-primary/90 rounded-full p-2 hidden md:flex"
              >
                <ChevronRight />
              </Button>
              
              <div className="flex justify-center mt-8 space-x-2 md:hidden">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-gray-600"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
