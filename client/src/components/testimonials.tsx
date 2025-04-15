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

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    
    // Auto carousel
    const interval = setInterval(() => {
      setCurrentIndex(prev => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials]);

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
      {/* Add vector game elements in the background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sword element */}
        <svg className="absolute left-[5%] top-[10%] w-16 h-16 text-primary/30 transform rotate-45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 17.5L3 6V3H6L17.5 14.5M14.5 17.5L16.5 19.5M14.5 17.5L18.5 21.5M19 21L21 19M6.5 12.5L16.5 2.5L21.5 7.5L11.5 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        {/* Shield element */}
        <svg className="absolute right-[8%] top-[20%] w-14 h-14 text-primary/30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        {/* Fire element */}
        <svg className="absolute left-[15%] bottom-[10%] w-12 h-12 text-orange-500/30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C9 7 4 9 4 14C4 19 8 22 12 22C16 22 20 19 20 14C20 9 15 7 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16C10.9 16 10 15.1 10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        {/* Hammer element */}
        <svg className="absolute right-[12%] bottom-[15%] w-16 h-16 text-primary/30 transform -rotate-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 12L3 12M15 12L10 7M15 12L10 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 7V17M15 7H19H21V17H19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        {/* Star element */}
        <svg className="absolute left-[45%] top-[10%] w-10 h-10 text-yellow-400/30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

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
                className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-primary text-white hover:bg-primary/90 rounded-full p-2 hidden md:flex"
              >
                <ChevronLeft />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-primary text-white hover:bg-primary/90 rounded-full p-2 hidden md:flex"
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
