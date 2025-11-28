import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Home, Info, Globe, Phone, Calendar, Star } from 'lucide-react';

interface HamburgerMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export function HamburgerMenu({ isVisible, onClose }: HamburgerMenuProps) {
  const menuItems = [
    { icon: Home, label: 'Home', description: 'Return to main page' },
    { icon: Globe, label: 'Destinations', description: 'Explore all locations' },
    { icon: Calendar, label: 'My Bookings', description: 'View your trips' },
    { icon: Star, label: 'Reviews', description: 'Read traveler stories' },
    { icon: Info, label: 'About Us', description: 'Our mission' },
    { icon: Phone, label: 'Contact', description: 'Get in touch' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl text-black">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-6">
              <ul className="space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={onClose}
                        className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <div className="text-black">{item.label}</div>
                          <div className="text-gray-500 text-sm">{item.description}</div>
                        </div>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
              <p className="text-gray-600 text-sm mb-2">Need help planning your trip?</p>
              <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Speak to an Expert
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
