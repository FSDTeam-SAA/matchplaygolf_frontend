"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0f0f11] flex items-center justify-center px-4">
      
      {/* Subtle Gradient Accent (not too strong) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-purple-300/10 to-transparent blur-2xl"
      />

      {/* Soft floating shapes */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-24 left-24 w-40 h-40 rounded-full bg-purple-400/10 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute bottom-24 right-24 w-52 h-52 rounded-full bg-purple-500/10 blur-3xl"
      />

      {/* Central content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-lg w-full p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center shadow-2xl"
      >
        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-7xl md:text-8xl font-extrabold text-white tracking-tight"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-gray-300 mt-4 text-lg"
        >
          Page not found. Maybe it’s hiding somewhere else.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Link
            href="/"
            className="mt-6 inline-block px-8 py-3 rounded-xl bg-primary text-white font-medium shadow-lg hover:opacity-90 transition"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>

      {/* Soft floating hint */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4], y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-10 text-gray-400 text-xs tracking-wide"
      >
        Still looking?
      </motion.div>
    </div>
  );
}
