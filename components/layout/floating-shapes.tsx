"use client"

import { useEffect, useState } from "react"
import { useScroll, useTransform, motion, useSpring } from "framer-motion"
import GlassmorphicShape from "@/components/ui/glassmorphic-shape"

export default function FloatingShapes() {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()

  // Define initial transform values with more dramatic ranges
  const initialTopLeftY = 0
  const initialTopRightY = 0
  const initialBottomLeftY = 0
  const initialBottomRightY = 0
  const initialCenterScale = 1
  const initialCenterRotate = 0
  const initialCenterX = 0
  const initialCenterY = 0

  // Transform values based on scroll position with more dramatic effects
  const topLeftY = useTransform(scrollY, [0, 1000], [initialTopLeftY, 150])
  const topRightY = useTransform(scrollY, [0, 1000], [initialTopRightY, -200])
  const bottomLeftY = useTransform(scrollY, [0, 1000], [initialBottomLeftY, -150])
  const bottomRightY = useTransform(scrollY, [0, 1000], [initialBottomRightY, 250])

  // Add spring physics for smoother animations
  const springConfig = { stiffness: 100, damping: 30 }
  const centerScaleSpring = useSpring(useTransform(scrollY, [0, 500], [initialCenterScale, 1.5]), springConfig)
  const centerRotateSpring = useSpring(useTransform(scrollY, [0, 1000], [initialCenterRotate, 90]), springConfig)
  const centerXSpring = useSpring(useTransform(scrollY, [0, 1000], [initialCenterX, 150]), springConfig)
  const centerYSpring = useSpring(useTransform(scrollY, [0, 1000], [initialCenterY, -100]), springConfig)

  // Add opacity transforms for shapes to fade in/out based on scroll
  const topOpacity = useTransform(scrollY, [0, 800], [1, 0.7])
  const bottomOpacity = useTransform(scrollY, [0, 800], [0.7, 1])
  const centerOpacity = useTransform(scrollY, [0, 400, 800], [0.8, 1, 0.8])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top left shapes */}
      <motion.div style={{ y: topLeftY, opacity: topOpacity }} className="absolute top-[10%] left-[5%]">
        <GlassmorphicShape shape="circle" size="lg" floatingSpeed={15} delay={0} zIndex={-1} />
      </motion.div>
      <motion.div style={{ y: topLeftY, opacity: topOpacity }} className="absolute top-[15%] left-[10%]">
        <GlassmorphicShape shape="square" size="md" floatingSpeed={20} delay={1} zIndex={-1} />
      </motion.div>

      {/* Top right shapes */}
      <motion.div style={{ y: topRightY, opacity: topOpacity }} className="absolute top-[5%] right-[10%]">
        <GlassmorphicShape shape="triangle" size="lg" floatingSpeed={18} delay={0.5} zIndex={-1} />
      </motion.div>
      <motion.div style={{ y: topRightY, opacity: topOpacity }} className="absolute top-[20%] right-[15%]">
        <GlassmorphicShape shape="hexagon" size="sm" floatingSpeed={12} delay={1.5} zIndex={-1} />
      </motion.div>

      {/* Bottom left shapes */}
      <motion.div style={{ y: bottomLeftY, opacity: bottomOpacity }} className="absolute bottom-[10%] left-[5%]">
        <GlassmorphicShape shape="blob" size="xl" floatingSpeed={25} delay={2} zIndex={-1} />
      </motion.div>
      <motion.div style={{ y: bottomLeftY, opacity: bottomOpacity }} className="absolute bottom-[20%] left-[15%]">
        <GlassmorphicShape shape="circle" size="sm" floatingSpeed={10} delay={0.8} zIndex={-1} />
      </motion.div>

      {/* Bottom right shapes */}
      <motion.div style={{ y: bottomRightY, opacity: bottomOpacity }} className="absolute bottom-[15%] right-[10%]">
        <GlassmorphicShape shape="square" size="md" floatingSpeed={22} delay={1.2} zIndex={-1} />
      </motion.div>
      <motion.div style={{ y: bottomRightY, opacity: bottomOpacity }} className="absolute bottom-[5%] right-[5%]">
        <GlassmorphicShape shape="hexagon" size="lg" floatingSpeed={17} delay={0.3} zIndex={-1} />
      </motion.div>

      {/* Center shapes with spring physics */}
      <motion.div
        style={{
          scale: centerScaleSpring,
          rotate: centerRotateSpring,
          x: centerXSpring,
          y: centerYSpring,
          opacity: centerOpacity,
        }}
        className="absolute top-[40%] left-[45%]"
      >
        <GlassmorphicShape
          shape="circle"
          size="xl"
          color="rgba(255, 255, 255, 0.1)"
          floatingSpeed={30}
          delay={2.5}
          zIndex={-1}
        />
      </motion.div>
    </div>
  )
}
