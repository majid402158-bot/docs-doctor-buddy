import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import heroArt from "@/assets/hero-dentist.png";

/**
 * Hero visual: a friendly human dentist with idle float,
 * pointer parallax tilt, a breathing glow halo and floating trust chips.
 */
export function HeroCaddy() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 18,
  });

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[440px] [perspective:1000px]"
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-square">
        {/* breathing glow halo */}
        <motion.div
          aria-hidden
          className="absolute inset-x-5 bottom-5 top-16 rounded-full bg-primary/25 blur-3xl sm:inset-6"
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-8 bottom-6 top-14 rounded-full border border-primary/25 sm:inset-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        />

        <motion.img
          src={heroArt}
          alt="A friendly Crescent & Pearl dentist welcoming patients"
          width={1024}
          height={1024}
          className="relative z-10 size-full object-contain drop-shadow-[0_22px_28px_color-mix(in_oklab,var(--charcoal)_22%,transparent)]"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {[
        { label: "Gentle care", pos: "left-0 top-10" },
        { label: "Clear estimates", pos: "right-0 bottom-12" },
      ].map((chip, i) => (
        <motion.span
          key={chip.label}
          className={`glass-card absolute z-20 ${chip.pos} rounded-full px-3 py-1.5 text-xs font-bold`}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -4, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.5 + i * 0.15 }}
        >
          {chip.label}
        </motion.span>
      ))}
    </motion.div>
  );
}
