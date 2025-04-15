import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { z } from "zod";
import { contactFormSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Clock, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaDiscord, FaTwitter, FaTwitch, FaInstagram } from "react-icons/fa";

type FormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: async (response) => {
      const data = await response.json();
      toast({
        title: "Success!",
        description: data.message || "Your message has been sent successfully!",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error("Contact form submission failed:", error);
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start">
          <motion.div 
            className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-3xl md:text-4xl text-white mb-4 font-['Poppins']">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Have questions about our services? Need custom solutions for your Brawlhalla journey? Reach out to our team.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-primary mr-4 mt-1">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Our Location</h4>
                  <p className="text-gray-400">Brawlhaven Arena, Digital Plaza</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-primary mr-4 mt-1">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Email Us</h4>
                  <p className="text-gray-400">support@brawlmarket.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-primary mr-4 mt-1">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Support Hours</h4>
                  <p className="text-gray-400">24/7 Online Support</p>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-gray-700 transition-colors p-3 rounded-full text-white"
                  aria-label="Discord"
                >
                  <FaDiscord size={20} />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-gray-700 transition-colors p-3 rounded-full text-white"
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-gray-700 transition-colors p-3 rounded-full text-white"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-gray-700 transition-colors p-3 rounded-full text-white"
                  aria-label="Twitch"
                >
                  <FaTwitch size={20} />
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            className="bg-gray-700 border-0 text-white focus:ring-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your@email.com" 
                            className="bg-gray-700 border-0 text-white focus:ring-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-700 border-0 text-white focus:ring-primary">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            <SelectItem value="coaching">Coaching Inquiry</SelectItem>
                            <SelectItem value="boosting">Boosting Services</SelectItem>
                            <SelectItem value="coins">Mammoth Coins</SelectItem>
                            <SelectItem value="editing">Video Editing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="bg-gray-700 border-0 text-white focus:ring-primary resize-none" 
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
