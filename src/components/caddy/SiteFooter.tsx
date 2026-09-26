import { motion, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, Heart, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToothMark } from "./ToothMark";

const COLUMNS: { title: string; links: { label: string; to?: string }[] }[] = [
  {
    title: "Patients",
    links: [
      { label: "Book appointment", to: "/book" },
      { label: "Services", to: "/services" },
      { label: "Pricing", to: "/pricing" },
      { label: "Queue status", to: "/queue" },
      { label: "Patient area", to: "/dashboard" },
    ],
  },
  {
    title: "Clinic",
    links: [
      { label: "Our dentists", to: "/dentists" },
      { label: "About & safety", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Patient login", to: "/login" },
    ],
  },
  {
    title: "Staff (demo)",
    links: [
      { label: "Reception", to: "/reception" },
      { label: "Dentist workspace", to: "/doctor" },
      { label: "Clinic owner", to: "/owner" },
    ],
  },
];

const MARQUEE = [
  "itemized treatment plans",
  "sterilized instruments",
  "family appointments",
  "private queue status",
  "dentist-reviewed records",
  "transparent estimates",
];

export function SiteFooter() {
  const calm = useReducedMotion();

  return (
    <footer className="relative mt-16 overflow-hidden sm:mt-24">
      {/* marquee ribbon */}
      <div
        className="relative hidden overflow-hidden py-2.5 sm:block"
        style={{ background: "var(--gradient-care)" }}
        aria-hidden
      >
        <motion.div
          className="flex w-max gap-6 whitespace-nowrap"
          animate={calm ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-primary-foreground/90"
            >
              {word} <span className="opacity-60">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative bg-secondary/60">
        <div aria-hidden className="clinic-grain pointer-events-none absolute inset-0 opacity-50" />

        <div className="relative mx-auto max-w-6xl px-5 pb-7 pt-8 sm:px-8 sm:pb-9 sm:pt-12">
          <div className="grid gap-7 lg:grid-cols-[1.3fr_2fr] lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
            >
              <div className="flex items-center gap-2">
                <ToothMark className="size-10" />
                <span className="font-display text-xl font-extrabold leading-none">
                  Crescent<span className="foil-text foil-animate"> &amp; Pearl</span>
                </span>
              </div>
               <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                 Calm, clear family dentistry with simple booking and transparent next steps.
              </p>
               <div className="mt-4 grid gap-2 text-xs font-semibold text-muted-foreground sm:flex sm:flex-wrap sm:gap-4">
                 <span className="inline-flex items-center gap-2"><Phone aria-hidden className="size-3.5 text-primary" /> +92 300 000 0000 (demo)</span>
                 <span className="inline-flex items-center gap-2"><MapPin aria-hidden className="size-3.5 text-primary" /> Karachi (demo location)</span>
              </div>
               <Button asChild className="mt-5 h-10 rounded-md px-4 font-extrabold">
                 <Link to="/book"><CalendarCheck aria-hidden /> Book appointment</Link>
               </Button>
            </motion.div>

             <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
              {COLUMNS.map((col, ci) => (
                <motion.div
                  key={col.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    type: "spring",
                    stiffness: 170,
                    damping: 18,
                    delay: 0.06 * ci,
                  }}
                >
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-primary">
                    {col.title}
                  </p>
                   <ul className="mt-3 space-y-2 text-[0.8rem] font-semibold">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        {l.to ? (
                          <Link
                            to={l.to}
                            className="story-link inline-block text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {l.label}
                          </Link>
                        ) : (
                          <span className="story-link inline-block cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
                            {l.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-2 border-t border-border pt-4 text-[0.7rem] font-semibold text-muted-foreground sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:pt-5">
            <p>© {new Date().getFullYear()} Crescent & Pearl Dental (demo)</p>
            <p className="inline-flex items-center gap-1.5">
              Made with
              <motion.span
                animate={calm ? {} : { scale: [1, 1.35, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="text-accent"
              >
                <Heart aria-hidden className="size-3" />
              </motion.span>
              for calmer dental visits
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
