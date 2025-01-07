"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import Navbar from "../components/Navigation/NavBar";

interface TemplateProps {
  children: ReactNode;
}
export default function Template({ children }: TemplateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
