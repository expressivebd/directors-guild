"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type ShapeType = "circle" | "square" | "triangle" | "hexagon" | "blob"
type ShapeSize = "sm" | "md" | "lg" | "xl"

interface GlassmorphicShapeProps {
  shape?: ShapeType
  size?: ShapeSize
  color?: string
  className?: string
  floatingSpeed?: number
  rotationSpeed?: number
  delay?: number
  fixed?: boolean
  top?: string
  left?: string
  right?: string
  bottom?: string
  zIndex?: number
}

export default function GlassmorphicShape({
  shape = "circle",
  size = "md",
  color,
  className,
  floatingSpeed = 10,
  rotationSpeed = 20,
  delay = 0,
  fixed = false,
  top,
  left,
  right,
  bottom,
  zIndex = -1,
}: GlassmorphicShapeProps) {
  const [mounted, setMounted] = useState(false)

  // Define shape-specific default colors
  const getDefaultColor = (shapeType: ShapeType): string => {
    switch (shapeType) {
      case "circle":
        return "rgba(46, 204, 113, 0.15)"
      case "square":
        return "rgba(52, 152, 219, 0.15)"
      case "triangle":
        return "rgba(155, 89, 182, 0.15)"
      case "hexagon":
        return "rgba(241, 196, 15, 0.15)"
      case "blob":
        return "rgba(231, 76, 60, 0.15)"
      default:
        return "rgba(255, 255, 255, 0.15)"
    }
  }

  // Use the shape-specific default color if none provided
  const shapeColor = color || getDefaultColor(shape)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Size mapping
  const sizeMap = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  }

  // Shape specific classes
  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg",
    triangle: "clip-path-triangle",
    hexagon: "clip-path-hexagon",
    blob: "clip-path-blob",
  }

  // Animation variants
  const floatingAnimation = {
    initial: { y: 0, x: 0, rotate: 0 },
    animate: {
      y: [0, -10, 0, 10, 0],
      x: [0, 5, 0, -5, 0],
      rotate: [0, rotationSpeed, 0, -rotationSpeed, 0],
      transition: {
        duration: floatingSpeed,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        delay,
      },
    },
  }

  return (
    <motion.div
      className={cn(
        "pointer-events-none backdrop-blur-md",
        sizeMap[size],
        shapeClasses[shape],
        fixed ? "fixed" : "absolute",
        className,
      )}
      style={{
        backgroundColor: shapeColor,
        top,
        left,
        right,
        bottom,
        zIndex,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
      }}
      initial="initial"
      animate="animate"
      variants={floatingAnimation}
    />
  )
}
