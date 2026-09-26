import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import { DOCTORS, type Doctor } from "@/lib/home-data";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";


const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

function DoctorCard({
  doctor,
  index,
}: {
  doctor: Doctor;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -12, boxShadow: "var(--shadow-card-hover)" }}
      transition={{ ...spring, delay: index * 0.07 }}
      className="group relative w-[min(310px,86vw)] shrink-0 snap-center overflow-hidden rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:w-[310px]"
    >
      {/* soft gradient wash that blooms on hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-care)" }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.08 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
      />

      <div className="relative flex items-start gap-4">
        <div className="relative size-20 shrink-0">
          <motion.div
            aria-hidden
            className="absolute -inset-2 rounded-full blur-xl"
            style={{ background: "color-mix(in oklab, var(--care) 55%, transparent)" }}
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.06, 0.95] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          />
          <img
            src={doctor.photo}
            alt={`${doctor.name}, ${doctor.specialty}`}
            width={640}
            height={640}
            loading="lazy"
            draggable={false}
            className="relative size-20 rounded-full border-2 border-card object-cover"
          />
          <motion.span
            className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full bg-primary text-primary-foreground"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 420, damping: 14, delay: 0.25 }}
          >
            <BadgeCheck aria-hidden className="size-3.5" />
          </motion.span>
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-lg font-extrabold leading-tight">{doctor.name}</h3>
          <p className="text-sm font-bold text-primary">{doctor.specialty}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin aria-hidden className="size-3" />
            <span className="truncate">{doctor.clinic}</span>
          </p>
        </div>
      </div>

      <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">{doctor.bio}</p>

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {doctor.tags.map((tag) => (
          <motion.span
            key={tag}
            whileHover={{ scale: 1.06 }}
            transition={spring}
            className="rounded-full bg-secondary/80 px-2.5 py-1 text-[11px] font-bold text-muted-foreground"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <dl className="relative mt-4 grid grid-cols-2 gap-2 rounded-md bg-secondary/60 p-3 text-center">
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Languages
          </dt>
          <dd className="mt-0.5 text-[11px] font-extrabold leading-tight">{doctor.languages}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Status
          </dt>
          <dd className="mt-0.5 text-sm font-extrabold text-accent-foreground">Demo</dd>
        </div>
      </dl>

      <p className="relative mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-primary">
        <Clock aria-hidden className="size-3.5" />
        Next indicative slot · {doctor.next}
      </p>

      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ y: 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 18 }}
        className="mt-4"
      >
      <Link
        to="/book"
        search={{ dentist: doctor.id }}
        className="btn-3d relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-primary py-3 text-sm font-extrabold text-primary-foreground"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, transparent 20%, color-mix(in oklab, white 45%, transparent) 50%, transparent 80%)",
          }}
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
        />
        <CalendarCheck aria-hidden className="relative size-4" />
        <span className="relative">Book with {doctor.name.split(" ")[1]}</span>
      </Link>
      </motion.div>
    </motion.article>
  );
}

export function DoctorCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const { scrollXProgress } = useScroll({ container: trackRef, axis: "x" });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure]);

  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = (card?.clientWidth ?? 300) + 20;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };


  return (
    <section className="space-y-5" aria-labelledby="dentist-finder-title">
      <motion.header
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"
      >
        <div className="space-y-2">
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 20 } },
            }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[0.65rem] font-bold tracking-[0.22em] uppercase text-primary"
          >
            Our dental team
          </motion.span>

          <motion.h2 id="dentist-finder-title" variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: spring } }} className="text-4xl font-extrabold leading-tight sm:text-5xl">Find your dentist</motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 22 } },
            }}
            className="max-w-md text-sm text-muted-foreground"
          >
            Compare focus areas and choose who feels right for your visit.
          </motion.p>
        </div>

        <motion.span
          variants={{
            hidden: { opacity: 0, scale: 0.85 },
            show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
          }}
          className="hidden items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-muted-foreground sm:inline-flex"
        >
          <span className="size-2 animate-pulse rounded-full bg-primary" />
          {DOCTORS.length} demo profiles
        </motion.span>
      </motion.header>

      <div className="relative">
        <div
          ref={trackRef}
          className="no-scrollbar -mx-1 snap-x snap-mandatory scroll-px-1 overflow-x-auto px-1 pb-6"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex items-stretch gap-5">
            {DOCTORS.map((d, i) => (
              <DoctorCard
                key={d.id}
                doctor={d}
                index={i}
                total={DOCTORS.length}
              />
            ))}
          </div>
        </div>

        {/* scroll arrows */}
        {([-1, 1] as const).map((dir) => {
          const disabled = dir === -1 ? edges.start : edges.end;
          const Icon = dir === -1 ? ChevronLeft : ChevronRight;
          return (
            <Button key={dir} type="button" variant="outline" size="icon" onClick={() => scrollBy(dir)} disabled={disabled} aria-label={dir === -1 ? "Previous dentists" : "Next dentists"} className={`absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 rounded-full sm:inline-flex ${dir === -1 ? "-left-3" : "-right-3"}`}><Icon aria-hidden className="size-5" /></Button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button asChild variant="outline" className="h-11 rounded-md px-5 font-extrabold"><Link to="/dentists">View all dentists</Link></Button>
      </div>

    </section>
  );
}
