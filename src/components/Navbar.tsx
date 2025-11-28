import React from 'react';
import { ChevronLeft, ChevronRight, Menu, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  onLeftClick: () => void;
  onRightClick: () => void;
  onMenuClick: () => void;
}

export function Navbar({ onLeftClick, onRightClick, onMenuClick }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between p-6 text-white">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <Compass className="w-8 h-8" />
        <span className="text-xl">WildExplorer</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onLeftClick}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
          aria-label="Previous destination"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onRightClick}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
          aria-label="Next destination"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onMenuClick}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </nav>
  );
}
