import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DestinationInfo } from './components/DestinationInfo';
import { BookingModal } from './components/BookingModal';
import { HamburgerMenu } from './components/HamburgerMenu';
import Elef from './images/bgElephant.png';
import tiger from './images/TigerBg.png';
import girre from './images/giraffeBg.jpg';
import bird from './images/birdsBg.jpg';



const destinations = [
  {
    id: 1,
    name: 'African Safari',
    location: 'Serengeti, Tanzania',
    image: Elef,
    description: 'Witness majestic elephants roaming the vast plains of the Serengeti.',
    highlights: ['Elephant herds', 'Big Five game drives', 'Sunset safaris'],
    duration: '7 days',
    price: '$3,499'
  },
  {
    id: 2,
    name: 'Bengal Tiger Trek',
    location: 'Ranthambore, India',
    image: tiger,
    description: 'Track the elusive Bengal tiger through ancient forests and ruins.',
    highlights: ['Tiger tracking', 'Historic fort visits', 'Wildlife photography'],
    duration: '5 days',
    price: '$2,799'
  },
  {
    id: 3,
    name: 'Savanna Explorer',
    location: 'Maasai Mara, Kenya',
    image: girre,
    description: 'Experience the grace of giraffes against breathtaking savanna sunsets.',
    highlights: ['Giraffe encounters', 'Hot air balloon safari', 'Maasai culture'],
    duration: '6 days',
    price: '$3,199'
  },
  {
    id: 4,
    name: 'Tropical Birdwatch',
    location: 'Costa Rica Rainforest',
    image: bird,
    description: 'Discover vibrant tropical birds in lush rainforest canopies.',
    highlights: ['Exotic bird species', 'Canopy tours', 'Waterfall hikes'],
    duration: '4 days',
    price: '$1,899'
  }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleLeftClick = () => {
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
    setShowInfo(false);
  };

  const handleRightClick = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
    setShowInfo(false);
  };

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  const handleLearnMore = () => {
    setShowInfo(!showInfo);
  };

  const currentDestination = destinations[currentIndex];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDestination.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentDestination.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
          onMenuClick={handleMenuClick}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDestination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-4xl"
            >
              <h1 className="text-white mb-4">
                {currentDestination.name}
              </h1>
              <p className="text-white/90 text-xl mb-2">
                {currentDestination.location}
              </p>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {currentDestination.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookNow}
                  className="bg-white text-black px-8 py-3 rounded-full transition-all hover:bg-white/90"
                >
                  Book Adventure
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLearnMore}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full border-2 border-white/50 transition-all hover:bg-white/30"
                >
                  {showInfo ? 'Hide Details' : 'Learn More'}
                </motion.button>
              </div>

              {/* Destination Info Panel */}
              <AnimatePresence>
                {showInfo && (
                  <DestinationInfo destination={currentDestination} />
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Indicators */}
          <div className="flex gap-2 mt-12">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowInfo(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        <Footer currentDestination={currentDestination} />
      </div>

      {/* Hamburger Menu */}
      <HamburgerMenu isVisible={isMenuVisible} onClose={() => setIsMenuVisible(false)} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        destination={currentDestination}
      />
    </div>
  );
}
