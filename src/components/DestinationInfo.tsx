import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface Destination {
  name: string;
  highlights: string[];
  duration: string;
  price: string;
}

interface DestinationInfoProps {
  destination: Destination;
}

export function DestinationInfo({ destination }: DestinationInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto"
    >
      <h3 className="text-white text-2xl mb-4">Experience Highlights</h3>
      <div className="space-y-3 mb-6">
        {destination.highlights.map((highlight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 text-white"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <span>{highlight}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
        <div>
          <p className="text-white/60 text-sm">Duration</p>
          <p className="text-white">{destination.duration}</p>
        </div>
        <div>
          <p className="text-white/60 text-sm">Starting Price</p>
          <p className="text-white">{destination.price}</p>
        </div>
      </div>
    </motion.div>
  );
}
