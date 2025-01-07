"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TemplateProps {
  children: ReactNode;
}
export default function Template({ children }: TemplateProps) {
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
