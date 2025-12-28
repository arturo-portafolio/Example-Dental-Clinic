import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Service } from "@shared/schema";
import { motion } from "framer-motion";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full"
    >
      <div className="h-48 overflow-hidden bg-secondary relative">
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors z-10" />
        {service.image ? (
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary text-primary/30">
            <span className="text-4xl font-display font-bold">{service.title[0]}</span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <span className="text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-2 py-1 rounded">
            {service.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-muted-foreground mb-6 line-clamp-3 flex-grow">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <span className="font-semibold text-foreground">{service.price}</span>
          <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
            <button className="flex items-center gap-2 text-primary font-medium group/btn">
              Book Now 
              <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
