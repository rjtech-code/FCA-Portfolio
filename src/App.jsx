import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const problemCards = [
  {
    title: "Proxy attendance",
    description:
      "Students sign in for absent peers, creating inaccurate records and liability.",
    icon: "🧾",
  },
  {
    title: "Manual registers",
    description:
      "Paper registers slow teachers down and create duplicate data entry.",
    icon: "📕",
  },
  {
    title: "Time wastage",
    description:
      "Every minute taken in class is lost; attendance should be automated.",
    icon: "⏳",
  },
];

const workflowSteps = [
  { label: "Camera", accent: "CCTV and smart devices" },
  { label: "Face Detection", accent: "Live frame scanning" },
  { label: "Recognition", accent: "AI identity match" },
  { label: "Attendance", accent: "Automated logging" },
  { label: "Dashboard", accent: "Realtime analytics" },
];

const features = [
  "Real-time face recognition",
  "Unknown person alerts",
  "One attendance per day",
  "Live dashboard",
  "Attendance reports",
  "Parent SMS alerts",
  "Admin management",
];

const architectureItems = [
  { label: "Python Backend", detail: "Fast REST API + ML inference" },
  {
    label: "React Frontend",
    detail: "Modern user interface for administrators",
  },
  { label: "AI Model", detail: "High accuracy facial recognition" },
  { label: "Database", detail: "Secure attendance storage" },
  { label: "CCTV/IP Camera", detail: "Easy campus integration" },
];

const pricingPlans = [
  {
    name: "Essential",
    price: "₹40",
    period: "per student / year",
    description: "A simple annual plan for schools starting with smart attendance.",
    items: ["Face attendance for every student", "Daily attendance records", "Admin dashboard"],
  },
  {
    name: "Growth",
    price: "₹60",
    period: "per student / year",
    popular: true,
    description: "For growing campuses that need more visibility and automation.",
    items: ["Everything in Essential", "Advanced analytics & reports", "Parent alerts and multi-camera support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored annual plan",
    description: "A tailored plan for multi-campus deployments and custom workflows.",
    items: ["Everything in Growth", "API & system integrations", "Dedicated onboarding and support"],
  },
];

const futureVision = [
  "Smart campus access",
  "Parent notification flow",
  "Visitor management",
  "Advanced analytics",
  "Emotion & security alerts",
];

const testimonials = [
  {
    quote:
      "Vultus Go cut our daily attendance process from 15 minutes to 30 seconds and reduced manual errors entirely.",
    name: "Aisha Khan",
    role: "Principal, Horizon Academy",
  },
  {
    quote:
      "The dashboard gave our operations team instant trust in attendance data and parent engagement.",
    name: "Dev Patel",
    role: "Director of IT, Nova Schools",
  },
];

const faqItems = [
  {
    question: "How accurate is the facial recognition engine?",
    answer:
      "Our model is designed for school environments with 99.3% recognition accuracy in controlled lighting.",
  },
  {
    question: "Can the system integrate with existing CCTV?",
    answer:
      "Yes — Vultus Go supports IP cameras and CCTV feeds with minimal installation effort.",
  },
  {
    question: "How quickly does attendance register?",
    answer:
      "Attendance is recorded in under 2 seconds per student during arrival workflows.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function App() {
  const [loaded, setLoaded] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const productVideoRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "light";
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      if (theme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", theme);
    } catch {
      // Theme persistence is optional when browser storage is unavailable.
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const enableAudioAfterInteraction = () => {
      const video = productVideoRef.current;
      if (!video || !video.muted) return;

      video.muted = false;
      video.volume = 1;
      setIsMuted(false);
      video.play().catch(() => {});
      window.removeEventListener("pointerdown", enableAudioAfterInteraction);
      window.removeEventListener("keydown", enableAudioAfterInteraction);
      window.removeEventListener("touchstart", enableAudioAfterInteraction);
    };

    window.addEventListener("pointerdown", enableAudioAfterInteraction, { passive: true });
    window.addEventListener("keydown", enableAudioAfterInteraction);
    window.addEventListener("touchstart", enableAudioAfterInteraction, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", enableAudioAfterInteraction);
      window.removeEventListener("keydown", enableAudioAfterInteraction);
      window.removeEventListener("touchstart", enableAudioAfterInteraction);
    };
  }, []);

  const handleProductVideoReady = async () => {
    if (videoReady) return;
    setVideoReady(true);
    setLoaded(true);

    const video = productVideoRef.current;
    if (!video) return;

    try {
      video.muted = false;
      video.volume = 1;
      await video.play();
      setIsMuted(false);
    } catch {
      // Browsers commonly block autoplay with sound. Start the loop silently
      // in that case; the visible sound control lets visitors enable audio.
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});
    }
  };

  const toggleVideoAudio = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (productVideoRef.current) {
      productVideoRef.current.muted = nextMuted;
      productVideoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      onMouseMove={(event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 40;
        const y = (event.clientY / window.innerHeight - 0.5) * 40;
        setMouse({ x, y });
      }}
      className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200"
    >
      <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/95 transition-opacity duration-700 ${loaded ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-500/20 bg-slate-900/95 px-10 py-10 shadow-[0_0_80px_rgba(249,115,22,0.16)]">
          <div className="h-18 w-18 animate-spin rounded-full border-4 border-sky-500/50 border-t-sky-300"></div>
          <p className="text-sm uppercase tracking-[0.42em] text-slate-300">
            Loading Vultus Go
          </p>
          <p className="text-center text-base text-slate-200/80">
            Building a futuristic school attendance experience.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: mouse.x * 0.04, y: mouse.y * 0.04 }}
          className="absolute left-1/4 top-16 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl"
        />
        <motion.div
          animate={{ x: mouse.x * -0.03, y: mouse.y * 0.05 }}
          className="absolute right-10 top-56 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl"
        />
        <div className="absolute left-10 top-80 h-28 w-28 rounded-full bg-sky-300/10 blur-2xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-slate-700/40 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
          <a href="#hero" className="flex min-w-0 items-center gap-3 text-slate-50" aria-label="Vultus Go home">
            <img
              src="/brand/vultus-go-logo.jpeg"
              alt="Vultus Go logo"
              className="h-10 w-10 shrink-0 rounded-xl border border-white/10 bg-white object-contain p-1 shadow-[0_15px_40px_rgba(249,115,22,0.18)] sm:h-11 sm:w-11"
            />
            <div className="min-w-0">
              <p className="text-base font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                Vultus <span className="text-sky-300">Go</span>
              </p>
              <p className="text-xs text-slate-400">Face Attendance</p>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 xl:flex">
            <a href="#hero" className="transition hover:text-white">
              Home
            </a>
            <a href="#problem" className="transition hover:text-white">
              Problems
            </a>
            <a href="#solution" className="transition hover:text-white">
              Solution
            </a>
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#product-gallery" className="transition hover:text-white">
              Product
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a
              href="https://www.vultusgo.in/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-sky-300 transition hover:text-white"
            >
              Official Site ↗
            </a>
          </nav>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/25 transition hover:bg-sky-400 sm:inline-flex"
            >
              Request Demo
            </a>
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              aria-pressed={theme === "light"}
              className="rounded-lg p-2.5 bg-sky-500/10 text-sky-300 transition hover:bg-sky-500/20"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-sky-400 xl:hidden"
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        {mobileMenuOpen ? (
          <nav className="border-t border-white/10 bg-slate-950/95 px-4 py-4 xl:hidden">
            <div className="mx-auto grid max-w-7xl gap-1 text-sm font-medium text-slate-300 sm:grid-cols-2">
              {[
                ["Home", "#hero"],
                ["Challenges", "#problem"],
                ["How it works", "#solution"],
                ["Features", "#features"],
                ["Product", "#product-gallery"],
                ["Pricing", "#pricing"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 transition hover:bg-sky-500/10 hover:text-sky-300"
                >
                  {label}
                </a>
              ))}
              <a
                href="https://www.vultusgo.in/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-4 py-3 text-sky-300 transition hover:bg-sky-500/10"
              >
                Official Site ↗
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-3 font-semibold text-slate-950 sm:col-span-2"
              >
                Request a Demo
              </a>
            </div>
          </nav>
        ) : null}
      </header>

      <main className="relative">
        <section
          id="hero"
          className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:pt-24"
        >
          <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.14),_transparent_45%)] pointer-events-none" />
          <div className="absolute left-[12%] top-24 h-60 w-60 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute right-[10%] top-36 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />

          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="space-y-6 sm:space-y-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-slate-900/80 px-4 py-2 text-sm text-sky-200 shadow-[0_0_40px_rgba(249,115,22,0.12)]">
                Innovative SaaS for modern schools
              </div>
              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl md:text-6xl">
                  AI-Powered Facial Recognition Attendance System
                </h1>
                <p className="max-w-xl text-base leading-8 text-slate-300 md:text-lg">
                  Turn arrival routines into intelligent automation with secure
                  facial recognition, live attendance logs, and instant
                  school-ready insights.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                  Request Demo
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-slate-500/40 bg-slate-900/70 px-7 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-400 hover:text-white"
                >
                  View Features
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Camera-ready",
                    detail: "Works with your existing school entry setup.",
                  },
                  {
                    title: "Simple for teams",
                    detail: "A clear workspace for everyday attendance.",
                  },
                  {
                    title: "Reports that matter",
                    detail: "Keep attendance information easy to review.",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 160, damping: 18 }}
                    className="rounded-3xl border border-white/10 bg-slate-900/75 px-5 py-5 shadow-[0_24px_80px_rgba(15,23,42,0.3)]"
                  >
                    <p className="text-base font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative mx-auto max-w-xl"
            >
              <div className="absolute inset-0 rounded-[42px] border border-sky-500/10 bg-sky-500/5 blur-3xl" />
              <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-slate-950/90 p-6 shadow-[0_45px_120px_rgba(249,115,22,0.2)]">
                <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-sky-500/10 blur-3xl" />
                <div className="absolute right-8 top-16 h-16 w-16 rounded-full bg-sky-400/15 blur-2xl" />
                <div className="relative mb-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                  <video
                    ref={productVideoRef}
                    src="/videos/vultus-go-product.mp4"
                    className="aspect-video w-full object-cover"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    onCanPlay={handleProductVideoReady}
                  />
                  <button
                    type="button"
                    onClick={toggleVideoAudio}
                    aria-label={isMuted ? "Unmute product video" : "Mute product video"}
                    aria-pressed={!isMuted}
                    className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-slate-950/90 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur transition hover:bg-sky-500"
                  >
                    {isMuted ? "🔇 Unmute" : "🔊 Sound on"}
                  </button>
                </div>
                <div className="relative rounded-[32px] border border-slate-800/80 bg-slate-950/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-400">
                        Campus attendance
                      </p>
                      <h2 className="text-2xl font-semibold text-white">
                        Vultus Go Dashboard
                      </h2>
                    </div>
                    <div className="rounded-3xl bg-sky-500/10 px-4 py-2 text-sm text-sky-300">
                      Live status
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut",
                      }}
                      className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900/90 p-4"
                    >
                      <p className="text-3xl font-semibold text-white">96.8%</p>
                      <p className="mt-2 text-sm text-slate-400">
                        Recognition accuracy
                      </p>
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut",
                      }}
                      className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900/90 p-4"
                    >
                      <p className="text-3xl font-semibold text-white">18K</p>
                      <p className="mt-2 text-sm text-slate-400">
                        Students tracked
                      </p>
                    </motion.div>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Entry", "Class", "Exit"].map((label) => (
                    <motion.div
                      key={label}
                      whileHover={{ scale: 1.03 }}
                      className="rounded-3xl bg-slate-900/80 p-4 text-center text-sm text-slate-300"
                    >
                      <p className="text-xs uppercase tracking-[0.32em] text-sky-300">
                        {label}
                      </p>
                      <p className="mt-3 text-xl font-semibold text-white">
                        Active
                      </p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  animate={{ x: [0, 16, -10, 0], y: [0, -10, 8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-12 bottom-10 flex h-28 w-28 items-center justify-center rounded-full border border-sky-300/20 bg-sky-400/10 shadow-[0_0_60px_rgba(249,115,22,0.16)]"
                >
                  <div className="h-12 w-12 rounded-[18px] border border-white/10 bg-slate-900/80 shadow-[0_0_20px_rgba(249,115,22,0.23)]" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35, duration: 0.85 }}
                  className="absolute left-6 bottom-6 hidden lg:block"
                >
                  <div style={{ perspective: 320 }}>
                    <div
                      className="relative h-28 w-28 rounded-[32px] border border-slate-700/50 bg-slate-900/80 shadow-[0_30px_90px_rgba(15,23,42,0.35)]"
                      style={{
                        transform: "rotateX(18deg) rotateY(22deg) skewY(-4deg)",
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="problem"
          className="relative border-t border-white/10 px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="mb-12 max-w-3xl space-y-4 text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-300">
                Attendance friction
              </p>
              <h2 className="text-4xl font-semibold text-white md:text-5xl">
                Traditional systems leave classrooms behind.
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-8 text-slate-400">
                Proxy sign-ins, handwritten journals, and manual validation
                create false attendance, staff overload, and lost learning time.
              </p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-3">
              {problemCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.7 }}
                  className="glass-card rounded-[28px] border border-white/10 p-8 shadow-[0_30px_70px_rgba(15,23,42,0.3)]"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-500/10 text-2xl">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="solution" className="relative px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              className="mb-12 max-w-3xl space-y-4 text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-300">
                How it works
              </p>
              <h2 className="text-4xl font-semibold text-white md:text-5xl">
                A frictionless workflow from camera to classroom analytics.
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-8 text-slate-400">
                Vultus Go senses presence, validates identity, and shares attendance
                insights across administration, teachers, and parents.
              </p>
            </motion.div>
            <div className="glass-card relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 p-8 shadow-[0_40px_120px_rgba(249,115,22,0.16)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-sky-400/10 to-transparent" />
              <div className="grid gap-6 lg:grid-cols-5">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, duration: 0.7 }}
                    className="rounded-[28px] border border-slate-700/70 bg-slate-950/90 p-6 text-center"
                  >
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-sky-500/10 text-2xl">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {step.label}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {step.accent}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="relative border-t border-white/10 px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              className="mb-12 max-w-3xl text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-300">
                Product suite
              </p>
              <h2 className="text-4xl font-semibold text-white md:text-5xl">
                Everything a modern school needs for secure attendance
                management.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400">
                Built for administrators, teachers, and parents with
                transparency, alerts, and intelligent policy controls.
              </p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  whileHover={{ y: -8 }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  className="group rounded-[28px] border border-white/10 bg-slate-950/80 p-7 shadow-[0_35px_90px_rgba(15,23,42,0.22)] transition hover:border-sky-400/40 hover:bg-slate-900/95"
                >
                  <div className="mb-5 h-12 w-12 rounded-3xl bg-sky-500/10 text-center text-2xl leading-[3rem] text-sky-300">
                    ✓
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    A premium feature tailored to secure campus attendance while
                    retaining transparency.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="product-gallery"
          className="relative border-t border-white/10 px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.32em] text-sky-300">
                  Product in action
                </p>
                <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
                  Built for every moment of the school day.
                </h2>
              </div>
              <p className="max-w-md text-base leading-8 text-slate-400 lg:text-right">
                From a camera at the entrance to clear attendance reports for
                teachers and leadership, Vultus Go keeps the whole campus connected.
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-12">
              <motion.figure
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="group relative min-h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 lg:col-span-7 lg:row-span-2 lg:min-h-[520px]"
              >
                <img
                  src="/images/product/teacher-analytics.jpeg"
                  alt="Teacher viewing the Vultus Go attendance analytics dashboard"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-slate-950/90 p-6 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Live analytics</p>
                  <p className="mt-2 text-lg font-semibold text-white">Insights that teachers can act on.</p>
                </figcaption>
              </motion.figure>

              <motion.figure
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08, duration: 0.7 }}
                className="group relative min-h-[250px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 lg:col-span-5"
              >
                <img
                  src="/images/product/students-dashboard.png"
                  alt="Vultus Go student management dashboard"
                  className="h-full w-full object-cover object-left-top transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-slate-950/90 px-5 py-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Student management at a glance</p>
                </figcaption>
              </motion.figure>

              <motion.figure
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.16, duration: 0.7 }}
                className="group relative min-h-[250px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 lg:col-span-5"
              >
                <img
                  src="/images/product/attendance-reports.png"
                  alt="Vultus Go attendance reports dashboard"
                  className="h-full w-full object-cover object-left-top transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-slate-950/90 px-5 py-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Clear reports for every attendance trend</p>
                </figcaption>
              </motion.figure>

              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06, duration: 0.7 }}
                className="group relative min-h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 lg:col-span-3"
              >
                <img
                  src="/images/product/entry-camera.jpeg"
                  alt="Entry camera installed at a school doorway"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-slate-950/90 px-5 py-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Seamless entry capture</p>
                </figcaption>
              </motion.figure>

              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12, duration: 0.7 }}
                className="group relative min-h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 lg:col-span-4"
              >
                <img
                  src="/images/product/corridor-recognition.jpeg"
                  alt="Students walking through a camera-enabled school corridor"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-slate-950/90 px-5 py-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Recognition in everyday movement</p>
                </figcaption>
              </motion.figure>

              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18, duration: 0.7 }}
                className="group relative min-h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 lg:col-span-5"
              >
                <img
                  src="/images/product/leadership-reports.jpeg"
                  alt="School leadership reviewing a Vultus Go attendance report"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-slate-950/90 px-5 py-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Shared visibility for school leadership</p>
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </section>

        <section id="architecture" className="relative px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              className="mb-12 max-w-3xl text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-300">
                Technical architecture
              </p>
              <h2 className="text-4xl font-semibold text-white md:text-5xl">
                A future-ready stack for secure campus deployment.
              </h2>
            </motion.div>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
              <div className="space-y-6">
                {architectureItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.75 }}
                    className="glass-card rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_80px_rgba(249,115,22,0.1)]"
                  >
                    <p className="text-sm uppercase tracking-[0.32em] text-sky-300">
                      {item.label}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-[32px] border border-slate-700/60 bg-slate-900/80 p-8 shadow-[0_45px_130px_rgba(15,23,42,0.22)]"
              >
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-sky-500/15 to-transparent" />
                <div className="flex flex-col gap-5">
                  <div className="rounded-[30px] border border-white/5 bg-slate-950/90 p-6">
                    <p className="text-sm text-slate-400">Campus camera feed</p>
                    <div className="mt-5 h-40 rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-4 shadow-inner shadow-slate-950/30"></div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[30px] bg-slate-950/90 p-5">
                      <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                        Backend
                      </p>
                      <p className="mt-3 text-xl font-semibold text-white">
                        Python inferencing
                      </p>
                    </div>
                    <div className="rounded-[30px] bg-slate-950/90 p-5">
                      <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                        Frontend
                      </p>
                      <p className="mt-3 text-xl font-semibold text-white">
                        Modern React portal
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="performance"
          className="relative border-t border-white/10 px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              className="mb-12 max-w-3xl text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-300">
                Accuracy & performance
              </p>
              <h2 className="text-4xl font-semibold text-white md:text-5xl">
                Performance built for real school schedules.
              </h2>
            </motion.div>
            <div className="grid gap-8 lg:grid-cols-[0.95fr_0.85fr]">
              <div className="space-y-8">
                {[
                  { label: "Recognition accuracy", value: "96.8%" },
                  { label: "Attendance speed", value: "1.8s" },
                  { label: "Multi-student detection", value: "22 per frame" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, duration: 0.7 }}
                    className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_60px_rgba(15,23,42,0.2)]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                          {item.label}
                        </p>
                        <p className="mt-3 text-3xl font-semibold text-white">
                          {item.value}
                        </p>
                      </div>
                      <div className="rounded-3xl bg-slate-900/90 px-4 py-2 text-xs uppercase tracking-[0.28em] text-sky-300">
                        Stable
                      </div>
                    </div>
                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{
                          width:
                            item.value === "1.8s"
                              ? "90%"
                              : item.value === "22 per frame"
                                ? "86%"
                                : "98%",
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="h-full rounded-full bg-[var(--primary)]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_40px_120px_rgba(249,115,22,0.15)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                      Security score
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-white">
                      Enterprise grade
                    </p>
                  </div>
                  <div className="rounded-2xl bg-sky-500/15 px-4 py-2 text-sm text-sky-300">
                    AES 256
                  </div>
                </div>
                <div className="mt-8 space-y-5">
                  {[
                    "Secure data access",
                    "Encrypted attendance logs",
                    "Role-based admin permissions",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-3xl border border-slate-700/60 bg-slate-950/90 px-5 py-4"
                    >
                      <p className="text-sm text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="pricing" className="relative px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              className="mb-12 max-w-3xl text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-300">
                Pricing plans
              </p>
              <h2 className="text-4xl font-semibold text-white md:text-5xl">
                Flexible plans for campus pilots to enterprise rollout.
              </h2>
            </motion.div>
            <div className="grid gap-8 lg:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.75 }}
                  className={`group rounded-[32px] border ${plan.popular ? "border-sky-400/40 bg-sky-500/5 shadow-[0_30px_90px_rgba(249,115,22,0.16)]" : "border-white/10 bg-slate-950/80"} p-8`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                        {plan.name} Plan
                      </p>
                      <p className="mt-3 text-4xl font-semibold text-white">
                        {plan.price}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">{plan.period}</p>
                    </div>
                    {plan.popular ? (
                      <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
                        Popular
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-6 text-sm leading-7 text-slate-300">
                    {plan.description}
                  </p>
                  <ul className="mt-8 space-y-4 text-sm text-slate-300">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 text-sky-300">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                  >
                    Get Started
                  </a>
                </motion.div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm leading-7 text-slate-400">
              Website development, custom integrations, and additional hardware
              are scoped and priced separately based on your school&apos;s needs.
            </p>
          </div>
        </section>

        <section
          id="vision"
          className="relative border-t border-white/10 px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              className="mb-12 max-w-3xl text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-300">
                Future vision
              </p>
              <h2 className="text-4xl font-semibold text-white md:text-5xl">
                Smart school ecosystems powered by attendance intelligence.
              </h2>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {futureVision.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.7 }}
                  className="glass-card rounded-[28px] border border-white/10 bg-slate-950/80 p-7 shadow-[0_35px_90px_rgba(15,23,42,0.24)]"
                >
                  <h3 className="text-lg font-semibold text-white">{item}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    Deploy capability across campus security, parent updates,
                    and visitor intelligence.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonial-faq" className="relative px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-8">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  variants={fadeUp}
                  className="space-y-4"
                >
                  <p className="text-sm uppercase tracking-[0.32em] text-sky-300">
                    Trusted by schools
                  </p>
                  <h2 className="text-4xl font-semibold text-white md:text-5xl">
                    Leaders choose Vultus Go for reliable, auditable attendance.
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-slate-400">
                    Our product design has been shaped by education teams and
                    operations leaders to feel intuitive, secure, and instantly
                    actionable.
                  </p>
                </motion.div>
                <div className="grid gap-6 md:grid-cols-2">
                  {testimonials.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12, duration: 0.7 }}
                      className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_35px_90px_rgba(15,23,42,0.22)]"
                    >
                      <p className="text-lg leading-8 text-slate-200">
                        “{item.quote}”
                      </p>
                      <div className="mt-6 border-t border-white/10 pt-5 text-sm text-slate-400">
                        <p className="font-semibold text-white">{item.name}</p>
                        <p>{item.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  variants={fadeUp}
                  className="space-y-4"
                >
                  <p className="text-sm uppercase tracking-[0.32em] text-sky-300">
                    FAQs
                  </p>
                  <h2 className="text-4xl font-semibold text-white md:text-5xl">
                    Answers for school leaders and IT teams.
                  </h2>
                </motion.div>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <motion.div
                      key={item.question}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.7 }}
                      className="rounded-[28px] border border-white/10 bg-slate-950/80 p-7 shadow-[0_30px_80px_rgba(15,23,42,0.16)]"
                    >
                      <h3 className="text-lg font-semibold text-white">
                        {item.question}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-400">
                        {item.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative border-t border-white/10 px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                className="space-y-6 rounded-[32px] border border-white/10 bg-slate-950/80 p-10 shadow-[0_45px_120px_rgba(15,23,42,0.16)]"
              >
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.32em] text-sky-300">
                    Contact
                  </p>
                  <h2 className="text-4xl font-semibold text-white">
                    Book a discovery call or request a school pilot.
                  </h2>
                  <p className="max-w-xl text-base leading-8 text-slate-400">
                    Reach out to see how Vultus Go can integrate with your campus
                    existing camera infrastructure and administration tools.
                  </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-900/80 p-6">
                    <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                      Email
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      vultusgo@gmail.com
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/80 p-6">
                    <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                      Phone
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      +91 96643 73310
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                  <span className="rounded-full border border-white/10 bg-slate-900/80 px-4 py-2">
                    LinkedIn
                  </span>
                  <span className="rounded-full border border-white/10 bg-slate-900/80 px-4 py-2">
                    Twitter
                  </span>
                  <span className="rounded-full border border-white/10 bg-slate-900/80 px-4 py-2">
                    Instagram
                  </span>
                </div>
              </motion.div>
              <motion.form
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                className="space-y-6 rounded-[32px] border border-white/10 bg-slate-950/85 p-8 shadow-[0_35px_90px_rgba(15,23,42,0.22)]"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-300">
                    <span>Name</span>
                    <input className="input-field" placeholder="Your name" />
                  </label>
                  <label className="space-y-2 text-sm text-slate-300">
                    <span>Email</span>
                    <input
                      className="input-field"
                      placeholder="school@fras.ai"
                    />
                  </label>
                </div>
                <label className="space-y-2 text-sm text-slate-300">
                  <span>School / Organization</span>
                  <input
                    className="input-field"
                    placeholder="School / organization name"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Message</span>
                  <textarea
                    className="input-field min-h-[160px] resize-none"
                    placeholder="Tell us about your attendance goals..."
                  />
                </label>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                  Send Inquiry
                </button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/90 px-6 py-8 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Vultus Go — AI-Powered Facial Recognition Attendance System.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#hero" className="transition hover:text-white">
              Terms
            </a>
            <a href="#hero" className="transition hover:text-white">
              Privacy
            </a>
            <a href="mailto:vultusgo@gmail.com" className="transition hover:text-white">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
