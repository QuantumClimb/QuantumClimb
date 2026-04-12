import type { ReactNode } from "react";
import { motion } from "motion/react";

type RevealType = "fade-up" | "mask" | "fold";

type RevealProps = Readonly<{
  children: ReactNode;
  className?: string;
  type?: RevealType;
  delay?: number;
}>;

const variants = {
  "fade-up": {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  mask: {
    hidden: { y: "100%" },
    visible: { y: 0 },
  },
  fold: {
    hidden: { opacity: 0, rotateX: -20, y: 40, scale: 0.95 },
    visible: { opacity: 1, rotateX: 0, y: 0, scale: 1 },
  },
} as const;

export function Reveal({
  children,
  className = "",
  type = "fade-up",
  delay = 0,
}: RevealProps) {
  if (type === "mask") {
    return (
      <div className={`overflow-hidden ${className}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
          variants={variants.mask}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      variants={variants[type]}
      className={className}
    >
      {children}
    </motion.div>
  );
}