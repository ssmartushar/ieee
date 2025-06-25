import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {
        isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-3xl max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold">{title}</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </header>
              <main className="p-6 overflow-y-auto prose prose-invert">
                {children}
              </main>
            </motion.div>
          </motion.div>
        )
      }
    </AnimatePresence>
  );
};

export default LegalModal;
