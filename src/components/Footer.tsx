import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, DollarSign } from 'lucide-react';

interface Destination {
  name: string;
  location: string;
  duration: string;
  price: string;
}

interface FooterProps {
  currentDestination: Destination;
}

export function Footer({ currentDestination }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="p-6 text-white"
    >
      <div className="flex justify-center gap-8 flex-wrap">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span>{currentDestination.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span>{currentDestination.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          <span>From {currentDestination.price}</span>
        </div>
      </div>
    </motion.footer>
  );
}
