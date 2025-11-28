import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Mail, User } from 'lucide-react';

interface Destination {
  name: string;
  location: string;
  price: string;
  duration: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination;
}

export function BookingModal({ isOpen, onClose, destination }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '2',
    date: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', guests: '2', date: '' });
      onClose();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
                <div>
                  <h2 className="text-black text-2xl">Book Your Adventure</h2>
                  <p className="text-gray-600">{destination.name}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {!isSubmitted ? (
                  <>
                    {/* Trip Summary */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Destination</span>
                        <span className="text-black">{destination.location}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Duration</span>
                        <span className="text-black">{destination.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per person</span>
                        <span className="text-black">{destination.price}</span>
                      </div>
                    </div>

                    {/* Booking Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4" />
                            <span>Full Name</span>
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                            placeholder="John Doe"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                            placeholder="john@example.com"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="w-4 h-4" />
                            <span>Number of Guests</span>
                          </div>
                          <select
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? 'Guest' : 'Guests'}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4" />
                            <span>Preferred Date</span>
                          </div>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                          />
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Request Booking
                      </button>
                    </form>

                    <p className="text-gray-500 text-sm mt-4 text-center">
                      A travel specialist will contact you within 24 hours
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <motion.svg
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-8 h-8 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <motion.path
                          d="M20 6L9 17l-5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </div>
                    <h3 className="text-2xl text-black mb-2">Booking Requested!</h3>
                    <p className="text-gray-600">
                      We'll be in touch soon to confirm your adventure.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
