"use client";

import { AnimatePresence, motion } from "framer-motion";

interface LoadingToastProps {
  show: boolean;
  message: string;
}

/**
 * Small fixed indicator in the bottom-right corner, for waits that happen
 * off-screen (signing in, redirecting) where the page itself looks idle.
 */
export default function LoadingToast({ show, message }: LoadingToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--background)]/90 px-4 py-3 font-inter text-sm shadow-lg backdrop-blur-md"
        >
          <span
            aria-hidden
            className="h-4 w-4 rounded-full border-2 border-[var(--card-border-hover)] border-t-[var(--foreground)] animate-spin"
          />
          <span className="text-[var(--muted-foreground)]">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
