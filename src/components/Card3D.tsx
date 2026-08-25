import React, { useState, useRef, ReactNode, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  onClick?: () => void;
}

export function Card3D({
  children,
  className = "",
  maxTilt = 12,
  glareOpacity = 0.25,
  onClick,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);

  const glareX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = (e.clientX - rect.left) / rect.width;
    const clientY = (e.clientY - rect.top) / rect.height;
    x.set(clientX);
    y.set(clientY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className={`relative inline-block w-full ${className}`}
    >
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="relative h-full w-full rounded-3xl will-change-transform"
      >
        {/* Dynamic Specular Sheen Layer */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 rounded-3xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle 320px at ${gx} ${gy}, rgba(255, 255, 255, 0.32), rgba(56, 189, 248, 0.12) 40%, transparent 80%)`
            ),
          }}
        />

        {/* 3D Border Glow Reflection */}
        <div
          className={`pointer-events-none absolute -inset-[1px] z-0 rounded-3xl bg-gradient-to-br from-neon-cyan/40 via-primary/30 to-accent/40 opacity-0 transition-opacity duration-500 blur-[1px] ${
            isHovered ? "opacity-100" : ""
          }`}
        />

        {/* Inner Content with 3D child preservation */}
        <div className="relative z-10 h-full w-full [transform-style:preserve-3d]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export function Layer3D({
  children,
  z = 25,
  className = "",
}: {
  children: ReactNode;
  z?: number;
  className?: string;
}) {
  return (
    <div
      style={{ transform: `translateZ(${z}px)` }}
      className={`[transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  );
}
