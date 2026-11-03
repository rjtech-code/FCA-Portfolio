import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  LuArrowUpRight,
  LuBookOpen,
  LuCalendarCheck,
  LuCheck,
  LuFileChartColumn,
  LuHourglass,
  LuLayoutDashboard,
  LuMessageSquare,
  LuMoon,
  LuScanFace,
  LuSun,
  LuUserCog,
  LuUserX,
  LuUsers,
  LuVolume2,
  LuVolumeX,
  LuX,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const problemCards = [
  {
    title: "Proxy attendance",
    description:
      "Students sign in for absent peers, creating inaccurate records and liability.",
    icon: LuUsers,
  },
  {
    title: "Manual registers",
    description:
      "Paper registers slow teachers down and create duplicate data entry.",
    icon: LuBookOpen,
  },
  {
    title: "Time wastage",
    description:
      "Every minute taken in class is lost; attendance should be automated.",
    icon: LuHourglass,
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

const featureIcons = {
  "Real-time face recognition": LuScanFace,
  "Unknown person alerts": LuUserX,
  "One attendance per day": LuCalendarCheck,
  "Live dashboard": LuLayoutDashboard,
  "Attendance reports": LuFileChartColumn,
  "Parent SMS alerts": LuMessageSquare,
  "Admin management": LuUserCog,
};

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

// Pricing: one flat rate for every student, billed once a year.
const PRICE_PER_STUDENT_YEAR = 70;
// Older attendance tools charge ₹70 per student every month.
const OLD_TOOL_PER_STUDENT_MONTH = 70;
const OLD_TOOL_PER_STUDENT_YEAR = OLD_TOOL_PER_STUDENT_MONTH * 12; // ₹840
const SAVING_PER_STUDENT_YEAR =
  OLD_TOOL_PER_STUDENT_YEAR - PRICE_PER_STUDENT_YEAR; // ₹770
const SAVING_PERCENT = Math.round(
  (SAVING_PER_STUDENT_YEAR / OLD_TOOL_PER_STUDENT_YEAR) * 100,
); // 92%
const formatINR = (value) => `₹${Math.round(value).toLocaleString("en-IN")}`;

// The shared RJ Portfolio API stores and manages inquiries for all Vultus Go properties.
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://rj-portfolio-rt3u.onrender.com").replace(/\/+$/, "");

const planFeatures = [
  "Face attendance for every student",
  "Liveness & anti-spoofing checks",
  "Live admin dashboard",
  "Daily, monthly & custom reports",
  "Parent SMS alerts",
  "Unknown person alerts",
  "Multi-camera & CCTV support",
  "Onboarding and support included",
];

const studentPresets = [200, 500, 1000, 2500, 5000];

const comparisonRows = [
  {
    label: "Price per student / month",
    old: formatINR(OLD_TOOL_PER_STUDENT_MONTH),
    vultus: `≈ ₹${(PRICE_PER_STUDENT_YEAR / 12).toFixed(2)}`,
  },
  {
    label: "Price per student / year",
    old: formatINR(OLD_TOOL_PER_STUDENT_YEAR),
    vultus: formatINR(PRICE_PER_STUDENT_YEAR),
  },
  {
    label: "500 students / year",
    old: formatINR(500 * OLD_TOOL_PER_STUDENT_YEAR),
    vultus: formatINR(500 * PRICE_PER_STUDENT_YEAR),
  },
  {
    label: "1,000 students / year",
    old: formatINR(1000 * OLD_TOOL_PER_STUDENT_YEAR),
    vultus: formatINR(1000 * PRICE_PER_STUDENT_YEAR),
  },
  { label: "Billing", old: "Every month", vultus: "Once a year" },
  {
    label: "Proxy attendance",
    old: "Possible",
    vultus: "Blocked by face match",
  },
  {
    label: "Marking method",
    old: "Cards / manual",
    vultus: "Automatic face scan",
  },
];

const oldToolPoints = [
  "₹70 per student, charged every month",
  "Monthly bills keep adding up",
  "Cards, registers or fingerprints",
  "Proxy attendance still possible",
];

const vultusPoints = [
  "₹70 per student for the whole year",
  "One simple annual payment",
  "Contactless face recognition",
  "Proxy-free, automatic attendance",
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
    question: "How much does Vultus Go cost?",
    answer:
      "Just ₹70 per student per year — one flat annual price. Older attendance tools charge around ₹70 per student every month (₹840 a year), so you save ₹770 per student, every year.",
  },
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

function FeatureIcon({ name }) {
  const Icon = featureIcons[name] ?? LuCheck;
  return <Icon aria-hidden="true" />;
}

const contactDetails = [
  {
    label: "Email",
    value: "vultusgo@gmail.com",
    href: "mailto:vultusgo@gmail.com",
    icon: LuMail,
  },
  {
    label: "Phone",
    value: "+91 96643 73310",
    href: "tel:+919664373310",
    icon: LuPhone,
  },
];

// Social profiles as linked from the official site (vultusgo.in)
const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/vultusgo",
    icon: FaLinkedinIn,
  },
  { label: "Twitter", href: "https://twitter.com/vultusgo", icon: FaXTwitter },
  {
    label: "Instagram",
    href: "https://www.instagram.com/vultusgo",
    icon: FaInstagram,
  },
];

// Footer content mirrors the official site footer (vultusgo.in)
const MAIN_SITE = "https://www.vultusgo.in";

const footerColumns = [
  {
    title: "Company",
    links: [
      ["Home", `${MAIN_SITE}/`],
      ["About", `${MAIN_SITE}/about`],
      ["Services", `${MAIN_SITE}/services`],
      ["Products", `${MAIN_SITE}/products`],
      ["Contact", `${MAIN_SITE}/contact`],
    ],
  },
  {
    title: "Services",
    links: [
      ["Web Development", `${MAIN_SITE}/services/web-development`],
      ["Mobile Apps", `${MAIN_SITE}/services/mobile-app-development`],
      ["Custom Software", `${MAIN_SITE}/services/custom-software-development`],
      ["AI & Machine Learning", `${MAIN_SITE}/services/ai-machine-learning`],
      ["UI/UX Design", `${MAIN_SITE}/services/ui-ux-design`],
    ],
  },
  {
    title: "Products",
    links: [
      ["Facial Recognition Attendance", "#hero"],
      ["Pricing · ₹70 / student / year", "#pricing"],
      ["Compare with old tools", "#compare"],
      ["All Products", `${MAIN_SITE}/products`],
    ],
  },
];

const footerSocials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/vultusgo",
    icon: FaLinkedinIn,
  },
  { label: "GitHub", href: "https://github.com/vultusgo", icon: FaGithub },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/vultusgo",
    icon: FaXTwitter,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/vultusgo",
    icon: FaInstagram,
  },
];

const footerContacts = [
  {
    label: "Email",
    value: "vultusgo@gmail.com",
    href: "mailto:vultusgo@gmail.com",
    icon: LuMail,
  },
  {
    label: "Phone",
    value: "+91 9664373310",
    href: "tel:+919664373310",
    icon: LuPhone,
  },
  { label: "Location", value: "Churu, Rajasthan 331001", icon: LuMapPin },
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
  const [students, setStudents] = useState(500);
  const [inquiry, setInquiry] = useState({ name: "", email: "", organization: "", message: "" });
  const [inquiryStatus, setInquiryStatus] = useState("idle");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const studentCount = Math.max(0, Number(students) || 0);
  const vultusYearly = studentCount * PRICE_PER_STUDENT_YEAR;
  const oldToolYearly = studentCount * OLD_TOOL_PER_STUDENT_YEAR;
  const productVideoRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : "light";
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

  const submitInquiry = async (event) => {
    event.preventDefault();
    setInquiryStatus("submitting");
    setInquiryMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiry.name.trim(),
          email: inquiry.email.trim(),
          organization: inquiry.organization.trim(),
          details: inquiry.message.trim(),
          projectType: "Other",
          inquiryType: "product_site_contact",
          sourceDomain: window.location.hostname,
          productName: "Vultus Go Facial Recognition Attendance",
        }),
      });
      let data = {};
      try { data = await response.json(); } catch { /* API may return an empty response */ }
      if (!response.ok) throw new Error(data.message || `Submission failed (${response.status}).`);
      setInquiryStatus("success");
      setInquiryMessage(data.message || "Your inquiry has been received. Our team will contact you soon.");
      setInquiry({ name: "", email: "", organization: "", message: "" });
    } catch (error) {
      setInquiryStatus("error");
      setInquiryMessage(error.message || "Unable to send your inquiry. Please try again.");
    }
  };

  const updateInquiryField = (field) => (event) => {
    setInquiry((current) => ({ ...current, [field]: event.target.value }));
  };

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

    window.addEventListener("pointerdown", enableAudioAfterInteraction, {
      passive: true,
    });
    window.addEventListener("keydown", enableAudioAfterInteraction);
    window.addEventListener("touchstart", enableAudioAfterInteraction, {
      passive: true,
    });

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
        className={`fixed inset-0 z-50 flex items-center justify-center bg-page/95 transition-opacity duration-700 ${loaded ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-line bg-tile/95 px-10 py-10 shadow-[0_0_80px_rgba(249,115,22,0.16)]">
          <div className="h-18 w-18 animate-spin rounded-full border-4 border-sky-500/50 border-t-sky-500"></div>
          <p className="text-sm uppercase tracking-[0.42em] text-fg-muted">
            Loading Vultus Go
          </p>
          <p className="text-center text-base text-fg">
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
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-page/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
          <a
            href="#hero"
            className="flex min-w-0 items-center gap-3 text-fg"
            aria-label="Vultus Go home"
          >
            <img
              src="/brand/vultus-go-logo.jpeg"
              alt="Vultus Go logo"
              className="h-10 w-10 shrink-0 rounded-xl border border-line bg-white object-contain p-1 shadow-[0_15px_40px_rgba(249,115,22,0.18)] sm:h-11 sm:w-11"
            />
            <div className="min-w-0">
              <p className="text-base font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                Vultus <span className="text-sky-600">Go</span>
              </p>
              <p className="text-xs text-fg-muted">Face Attendance</p>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-fg-muted xl:flex">
            <a href="#hero" className="transition hover:text-fg">
              Home
            </a>
            <a href="#problem" className="transition hover:text-fg">
              Problems
            </a>
            <a href="#solution" className="transition hover:text-fg">
              Solution
            </a>
            <a href="#features" className="transition hover:text-fg">
              Features
            </a>
            <a href="#product-gallery" className="transition hover:text-fg">
              Product
            </a>
            <a href="#pricing" className="transition hover:text-fg">
              Pricing
            </a>
            <a href="#compare" className="transition hover:text-fg">
              Compare
            </a>
            <a
              href="https://www.vultusgo.in/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-sky-600 transition hover:text-fg"
            >
              Official Site{" "}
              <LuArrowUpRight
                aria-hidden="true"
                className="inline-block h-4 w-4"
              />
            </a>
          </nav>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-600 sm:inline-flex"
            >
              Request Demo
            </a>
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              aria-pressed={theme === "light"}
              className="rounded-lg p-2.5 bg-sky-500/10 text-sky-600 transition hover:bg-sky-500/20"
            >
              {theme === "dark" ? (
                <LuSun aria-hidden="true" className="h-5 w-5" />
              ) : (
                <LuMoon aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="rounded-lg border border-line bg-tile/80 px-3 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-sky-400 xl:hidden"
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        {mobileMenuOpen ? (
          <nav className="border-t border-line bg-page/95 px-4 py-4 xl:hidden">
            <div className="mx-auto grid max-w-7xl gap-1 text-sm font-medium text-fg-muted sm:grid-cols-2">
              {[
                ["Home", "#hero"],
                ["Challenges", "#problem"],
                ["How it works", "#solution"],
                ["Features", "#features"],
                ["Product", "#product-gallery"],
                ["Pricing", "#pricing"],
                ["Compare", "#compare"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 transition hover:bg-sky-500/10 hover:text-sky-600"
                >
                  {label}
                </a>
              ))}
              <a
                href="https://www.vultusgo.in/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-4 py-3 text-sky-600 transition hover:bg-sky-500/10"
              >
                Official Site{" "}
                <LuArrowUpRight
                  aria-hidden="true"
                  className="inline-block h-4 w-4"
                />
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-3 font-semibold text-white sm:col-span-2"
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
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-tile/80 px-4 py-2 text-sm text-sky-600 shadow-[0_0_40px_rgba(249,115,22,0.12)]">
                Innovative SaaS for modern schools
              </div>
              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl md:text-6xl">
                  AI-Powered Facial Recognition Attendance System
                </h1>
                <p className="max-w-xl text-base leading-8 text-fg-muted md:text-lg">
                  Turn arrival routines into intelligent automation with secure
                  facial recognition, live attendance logs, and instant
                  school-ready insights.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
                >
                  Request Demo
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-line bg-tile/70 px-7 py-3 text-sm font-semibold text-fg transition hover:border-sky-400 hover:text-fg"
                >
                  View Features
                </a>
              </div>
              <a
                href="#pricing"
                className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-sky-400/30 bg-sky-500/5 px-5 py-3 text-sm transition hover:border-sky-400"
              >
                <span className="text-2xl font-semibold text-sky-600">₹70</span>
                <span className="font-medium text-fg">per student / year</span>
                <span className="text-fg-muted">
                  · old tools charge ₹70 every month
                </span>
              </a>
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
                    className="rounded-3xl border border-line bg-tile/75 px-5 py-5 shadow-[0_24px_80px_rgba(24,24,27,0.105)]"
                  >
                    <p className="text-base font-semibold text-fg">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-fg-muted">
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
              <div className="relative isolate overflow-hidden rounded-[42px] border border-line bg-card/90 p-6 shadow-[0_45px_120px_rgba(249,115,22,0.2)]">
                <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-sky-500/10 blur-3xl" />
                <div className="absolute right-8 top-16 h-16 w-16 rounded-full bg-sky-400/15 blur-2xl" />
                <div className="relative mb-5 overflow-hidden rounded-2xl border border-line bg-tile">
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
                    aria-label={
                      isMuted ? "Unmute product video" : "Mute product video"
                    }
                    aria-pressed={!isMuted}
                    className="absolute bottom-4 right-4 rounded-full border border-line bg-card/90 px-4 py-2 text-xs font-semibold text-fg shadow-lg backdrop-blur transition hover:bg-sky-500"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {isMuted ? (
                        <LuVolumeX aria-hidden="true" className="h-4 w-4" />
                      ) : (
                        <LuVolume2 aria-hidden="true" className="h-4 w-4" />
                      )}
                      {isMuted ? "Unmute" : "Sound on"}
                    </span>
                  </button>
                </div>
                <div className="relative rounded-[32px] border border-line bg-card/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-fg-muted">Campus attendance</p>
                      <h2 className="text-2xl font-semibold text-fg">
                        Vultus Go Dashboard
                      </h2>
                    </div>
                    <div className="rounded-3xl bg-sky-500/10 px-4 py-2 text-sm text-sky-600">
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
                      className="rounded-3xl bg-gradient-to-br from-tile via-card to-tile/90 p-4"
                    >
                      <p className="text-3xl font-semibold text-fg">96.8%</p>
                      <p className="mt-2 text-sm text-fg-muted">
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
                      className="rounded-3xl bg-gradient-to-br from-tile via-card to-tile/90 p-4"
                    >
                      <p className="text-3xl font-semibold text-fg">18K</p>
                      <p className="mt-2 text-sm text-fg-muted">
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
                      className="rounded-3xl bg-tile/80 p-4 text-center text-sm text-fg-muted"
                    >
                      <p className="text-xs uppercase tracking-[0.32em] text-sky-600">
                        {label}
                      </p>
                      <p className="mt-3 text-xl font-semibold text-fg">
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
                  className="pointer-events-none absolute -right-14 -top-14 -z-10 flex h-28 w-28 items-center justify-center rounded-full border border-sky-300/20 bg-sky-400/10 shadow-[0_0_60px_rgba(249,115,22,0.16)]"
                >
                  <div className="h-12 w-12 rounded-[18px] border border-line bg-tile/80 shadow-[0_0_20px_rgba(249,115,22,0.23)]" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="problem"
          className="relative border-t border-line px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="mx-auto mb-12 max-w-3xl space-y-4 text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-600">
                Attendance friction
              </p>
              <h2 className="text-4xl font-semibold text-fg md:text-5xl">
                Traditional systems leave classrooms behind.
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-8 text-fg-muted">
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
                  className="glass-card rounded-[28px] border border-line p-8 shadow-[0_30px_70px_rgba(24,24,27,0.105)]"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-500/10 text-2xl text-sky-600">
                    <card.icon aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-fg">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-fg-muted">
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
              className="mx-auto mb-12 max-w-3xl space-y-4 text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-600">
                How it works
              </p>
              <h2 className="text-4xl font-semibold text-fg md:text-5xl">
                A frictionless workflow from camera to classroom analytics.
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-8 text-fg-muted">
                Vultus Go senses presence, validates identity, and shares
                attendance insights across administration, teachers, and
                parents.
              </p>
            </motion.div>
            <div className="glass-card relative overflow-hidden rounded-[32px] border border-line bg-card/70 p-8 shadow-[0_40px_120px_rgba(249,115,22,0.16)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-sky-400/10 to-transparent" />
              <div className="grid gap-6 lg:grid-cols-5">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, duration: 0.7 }}
                    className="rounded-[28px] border border-line bg-card/90 p-6 text-center"
                  >
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-sky-500/10 text-2xl">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-fg">
                      {step.label}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-fg-muted">
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
          className="relative border-t border-line px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              className="mx-auto mb-12 max-w-3xl text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-600">
                Product suite
              </p>
              <h2 className="text-4xl font-semibold text-fg md:text-5xl">
                Everything a modern school needs for secure attendance
                management.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-fg-muted">
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
                  className="group rounded-[28px] border border-line bg-card/80 p-7 shadow-[0_35px_90px_rgba(24,24,27,0.077)] transition hover:border-sky-400/40 hover:bg-tile/95"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500/10 text-2xl text-sky-600">
                    <FeatureIcon name={feature} />
                  </div>
                  <h3 className="text-lg font-semibold text-fg">{feature}</h3>
                  <p className="mt-4 text-sm leading-7 text-fg-muted">
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
          className="relative border-t border-line px-6 py-24"
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
                <p className="text-sm uppercase tracking-[0.32em] text-sky-600">
                  Product in action
                </p>
                <h2 className="mt-4 text-4xl font-semibold text-fg md:text-5xl">
                  Built for every moment of the school day.
                </h2>
              </div>
              <p className="max-w-md text-base leading-8 text-fg-muted lg:text-right">
                From a camera at the entrance to clear attendance reports for
                teachers and leadership, Vultus Go keeps the whole campus
                connected.
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-12">
              <motion.figure
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="group relative min-h-[360px] overflow-hidden rounded-[28px] border border-line bg-card lg:col-span-7 lg:row-span-2 lg:min-h-[520px]"
              >
                <img
                  src="/images/product/teacher-analytics.jpeg"
                  alt="Teacher viewing the Vultus Go attendance analytics dashboard"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-card/90 p-6 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.28em] text-sky-600">
                    Live analytics
                  </p>
                  <p className="mt-2 text-lg font-semibold text-fg">
                    Insights that teachers can act on.
                  </p>
                </figcaption>
              </motion.figure>

              <motion.figure
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08, duration: 0.7 }}
                className="group relative min-h-[250px] overflow-hidden rounded-[28px] border border-line bg-card lg:col-span-5"
              >
                <img
                  src="/images/product/students-dashboard.png"
                  alt="Vultus Go student management dashboard"
                  className="h-full w-full object-cover object-left-top transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-card/90 px-5 py-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-fg">
                    Student management at a glance
                  </p>
                </figcaption>
              </motion.figure>

              <motion.figure
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.16, duration: 0.7 }}
                className="group relative min-h-[250px] overflow-hidden rounded-[28px] border border-line bg-card lg:col-span-5"
              >
                <img
                  src="/images/product/attendance-reports.png"
                  alt="Vultus Go attendance reports dashboard"
                  className="h-full w-full object-cover object-left-top transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-card/90 px-5 py-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-fg">
                    Clear reports for every attendance trend
                  </p>
                </figcaption>
              </motion.figure>

              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06, duration: 0.7 }}
                className="group relative min-h-[360px] overflow-hidden rounded-[28px] border border-line bg-card lg:col-span-3"
              >
                <img
                  src="/images/product/entry-camera.jpeg"
                  alt="Entry camera installed at a school doorway"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-card/90 px-5 py-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-fg">
                    Seamless entry capture
                  </p>
                </figcaption>
              </motion.figure>

              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12, duration: 0.7 }}
                className="group relative min-h-[360px] overflow-hidden rounded-[28px] border border-line bg-card lg:col-span-4"
              >
                <img
                  src="/images/product/corridor-recognition.jpeg"
                  alt="Students walking through a camera-enabled school corridor"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-card/90 px-5 py-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-fg">
                    Recognition in everyday movement
                  </p>
                </figcaption>
              </motion.figure>

              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18, duration: 0.7 }}
                className="group relative min-h-[360px] overflow-hidden rounded-[28px] border border-line bg-card lg:col-span-5"
              >
                <img
                  src="/images/product/leadership-reports.jpeg"
                  alt="School leadership reviewing a Vultus Go attendance report"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-card/90 px-5 py-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-fg">
                    Shared visibility for school leadership
                  </p>
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
              className="mx-auto mb-12 max-w-3xl text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-600">
                Technical architecture
              </p>
              <h2 className="text-4xl font-semibold text-fg md:text-5xl">
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
                    className="glass-card rounded-[28px] border border-line bg-card/80 p-6 shadow-[0_30px_80px_rgba(249,115,22,0.1)]"
                  >
                    <p className="text-sm uppercase tracking-[0.32em] text-sky-600">
                      {item.label}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-fg">
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
                className="relative rounded-[32px] border border-line bg-tile/80 p-8 shadow-[0_45px_130px_rgba(24,24,27,0.077)]"
              >
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-sky-500/15 to-transparent" />
                <div className="flex flex-col gap-5">
                  <div className="rounded-[30px] border border-line bg-card/90 p-6">
                    <p className="text-sm text-fg-muted">Campus camera feed</p>
                    <div className="mt-5 h-40 rounded-[28px] bg-gradient-to-br from-tile via-soft to-card p-4 shadow-inner shadow-black/5"></div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[30px] bg-card/90 p-5">
                      <p className="text-sm uppercase tracking-[0.32em] text-fg-subtle">
                        Backend
                      </p>
                      <p className="mt-3 text-xl font-semibold text-fg">
                        Python inferencing
                      </p>
                    </div>
                    <div className="rounded-[30px] bg-card/90 p-5">
                      <p className="text-sm uppercase tracking-[0.32em] text-fg-subtle">
                        Frontend
                      </p>
                      <p className="mt-3 text-xl font-semibold text-fg">
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
          className="relative border-t border-line px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              className="mx-auto mb-12 max-w-3xl text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-600">
                Accuracy & performance
              </p>
              <h2 className="text-4xl font-semibold text-fg md:text-5xl">
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
                    className="rounded-[32px] border border-line bg-card/80 p-6 shadow-[0_30px_60px_rgba(24,24,27,0.07)]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-fg-muted">
                          {item.label}
                        </p>
                        <p className="mt-3 text-3xl font-semibold text-fg">
                          {item.value}
                        </p>
                      </div>
                      <div className="rounded-3xl bg-tile/90 px-4 py-2 text-xs uppercase tracking-[0.28em] text-sky-600">
                        Stable
                      </div>
                    </div>
                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-soft">
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
                className="rounded-[32px] border border-line bg-tile/80 p-8 shadow-[0_40px_120px_rgba(249,115,22,0.15)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-fg-subtle">
                      Security score
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-fg">
                      Enterprise grade
                    </p>
                  </div>
                  <div className="rounded-2xl bg-sky-500/15 px-4 py-2 text-sm text-sky-600">
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
                      className="rounded-3xl border border-line bg-card/90 px-5 py-4"
                    >
                      <p className="text-sm text-fg-muted">{item}</p>
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
              className="mx-auto mb-12 max-w-3xl text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-600">
                Pricing
              </p>
              <h2 className="text-4xl font-semibold text-fg md:text-5xl">
                ₹70 per student, <span className="text-sky-600">per year.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-fg-muted">
                One simple plan for every school. Total annual cost = students ×
                ₹70. No monthly bills, no hidden add-ons.
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
                className="rounded-[32px] border border-sky-400/40 bg-sky-500/5 p-6 shadow-[0_30px_90px_rgba(249,115,22,0.16)] sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-fg-muted">
                    Vultus Go Plan
                  </p>
                  <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
                    Save {SAVING_PERCENT}%
                  </span>
                </div>
                <p className="mt-4 flex flex-wrap items-baseline gap-x-2 text-fg">
                  <span className="text-6xl font-semibold tracking-tight">
                    ₹70
                  </span>
                  <span className="text-lg text-fg-muted">
                    per student / year
                  </span>
                </p>
                <p className="mt-2 text-sm text-fg-muted">
                  That&apos;s just ≈ ₹5.83 per student per month, billed once a
                  year.
                </p>
                <ul className="mt-8 grid gap-3 text-sm text-fg-muted sm:grid-cols-2">
                  {planFeatures.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <LuCheck
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-sky-600"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-sky-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
                  >
                    Get Started
                  </a>
                  <a
                    href="#compare"
                    className="inline-flex items-center justify-center rounded-full border border-line bg-tile/70 px-7 py-3 text-sm font-semibold text-fg transition hover:border-sky-400"
                  >
                    Compare with old tools
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12, duration: 0.75 }}
                className="rounded-[32px] border border-line bg-card/80 p-6 sm:p-8"
              >
                <h3 className="text-xl font-semibold text-fg">
                  Calculate your annual cost
                </h3>
                <p className="mt-1 text-sm text-fg-muted">
                  Students × ₹70 = your total for the whole year.
                </p>
                <label className="mt-6 block space-y-2 text-sm text-fg-muted">
                  <span>Number of students</span>
                  <input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={students}
                    onChange={(event) =>
                      setStudents(
                        event.target.value === ""
                          ? ""
                          : Math.max(0, Number(event.target.value)),
                      )
                    }
                    className="input-field text-lg font-semibold"
                  />
                </label>
                <input
                  type="range"
                  aria-label="Number of students"
                  min={50}
                  max={10000}
                  step={50}
                  value={Math.min(Math.max(studentCount, 50), 10000)}
                  onChange={(event) => setStudents(Number(event.target.value))}
                  className="mt-5 w-full accent-sky-500"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {studentPresets.map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setStudents(count)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        studentCount === count
                          ? "border-sky-500 bg-sky-500 text-white"
                          : "border-line bg-tile/70 text-fg-muted hover:border-sky-400"
                      }`}
                    >
                      {count.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-sky-500 px-5 py-4 text-white">
                    <span className="text-sm">Vultus Go / year</span>
                    <span className="text-2xl font-semibold">
                      {formatINR(vultusYearly)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-line bg-tile/80 px-5 py-4">
                    <span className="text-sm text-fg-muted">
                      Old tools / year (₹70 × 12)
                    </span>
                    <span className="font-semibold text-fg-muted line-through">
                      {formatINR(oldToolYearly)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-sky-400/40 bg-sky-500/10 px-5 py-4">
                    <span className="text-sm font-medium text-sky-600">
                      You save every year
                    </span>
                    <span className="text-xl font-semibold text-sky-600">
                      {formatINR(oldToolYearly - vultusYearly)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
            <p className="mt-8 text-center text-sm leading-7 text-fg-muted">
              Website development, custom integrations, and additional hardware
              are scoped and priced separately based on your school&apos;s
              needs.
            </p>
          </div>
        </section>

        <section
          id="compare"
          className="relative border-t border-line px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              className="mx-auto mb-12 max-w-3xl text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-600">
                Compare
              </p>
              <h2 className="text-4xl font-semibold text-fg md:text-5xl">
                Same ₹70. Old tools charge it every month — we charge it once a
                year.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-fg-muted">
                Older attendance tools cost ₹70 per student per month, which is
                ₹840 per student every year. Vultus Go is ₹70 per student for
                the full year — {SAVING_PERCENT}% less.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="rounded-[32px] border border-line bg-card/80 p-6 sm:p-8"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-fg-subtle">
                  Old attendance tools
                </p>
                <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-5xl font-semibold text-fg-muted">
                    ₹70
                  </span>
                  <span className="text-fg-muted">per student / month</span>
                </p>
                <p className="mt-2 text-sm text-fg-muted">
                  = <span className="font-semibold">₹840</span> per student per
                  year
                </p>
                <ul className="mt-6 space-y-3 text-sm text-fg-muted">
                  {oldToolPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <LuX
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12, duration: 0.7 }}
                className="rounded-[32px] border border-sky-400/40 bg-sky-500/5 p-6 shadow-[0_30px_90px_rgba(249,115,22,0.16)] sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
                    Vultus Go
                  </p>
                  <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
                    12× cheaper
                  </span>
                </div>
                <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-5xl font-semibold text-sky-600">
                    ₹70
                  </span>
                  <span className="text-fg">per student / year</span>
                </p>
                <p className="mt-2 text-sm text-fg-muted">
                  Save <span className="font-semibold text-fg">₹770</span> per
                  student, every year
                </p>
                <ul className="mt-6 space-y-3 text-sm text-fg-muted">
                  {vultusPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <LuCheck
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-sky-600"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-8 rounded-[32px] border border-line bg-card/80 p-6 sm:p-8"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-fg-muted">
                Yearly cost per student
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-fg-muted">Old tools</span>
                    <span className="font-semibold text-fg-muted">₹840</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-soft">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                      className="h-full rounded-full bg-fg-subtle"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-fg">Vultus Go</span>
                    <span className="font-semibold text-sky-600">₹70</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-soft">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{
                        width: `${(PRICE_PER_STUDENT_YEAR / OLD_TOOL_PER_STUDENT_YEAR) * 100}%`,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      className="h-full rounded-full bg-sky-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-line text-fg-muted">
                      <th className="py-3 pr-4 font-medium">Comparison</th>
                      <th className="py-3 pr-4 font-medium">
                        Old tools (₹70 / month)
                      </th>
                      <th className="py-3 font-semibold text-sky-600">
                        Vultus Go (₹70 / year)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-line last:border-0"
                      >
                        <td className="py-3 pr-4 text-fg">{row.label}</td>
                        <td className="py-3 pr-4 text-fg-muted">{row.old}</td>
                        <td className="py-3 font-semibold text-fg">
                          {row.vultus}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="vision"
          className="relative border-t border-line px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              className="mx-auto mb-12 max-w-3xl text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-sky-600">
                Future vision
              </p>
              <h2 className="text-4xl font-semibold text-fg md:text-5xl">
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
                  className="glass-card rounded-[28px] border border-line bg-card/80 p-7 shadow-[0_35px_90px_rgba(24,24,27,0.084)]"
                >
                  <h3 className="text-lg font-semibold text-fg">{item}</h3>
                  <p className="mt-4 text-sm leading-7 text-fg-muted">
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
                  <p className="text-sm uppercase tracking-[0.32em] text-sky-600">
                    Trusted by schools
                  </p>
                  <h2 className="text-4xl font-semibold text-fg md:text-5xl">
                    Leaders choose Vultus Go for reliable, auditable attendance.
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-fg-muted">
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
                      className="rounded-[32px] border border-line bg-card/80 p-8 shadow-[0_35px_90px_rgba(24,24,27,0.077)]"
                    >
                      <p className="text-lg leading-8 text-fg">
                        “{item.quote}”
                      </p>
                      <div className="mt-6 border-t border-line pt-5 text-sm text-fg-muted">
                        <p className="font-semibold text-fg">{item.name}</p>
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
                  <p className="text-sm uppercase tracking-[0.32em] text-sky-600">
                    FAQs
                  </p>
                  <h2 className="text-4xl font-semibold text-fg md:text-5xl">
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
                      className="rounded-[28px] border border-line bg-card/80 p-7 shadow-[0_30px_80px_rgba(24,24,27,0.056)]"
                    >
                      <h3 className="text-lg font-semibold text-fg">
                        {item.question}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-fg-muted">
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
          className="relative border-t border-line px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                className="space-y-6 rounded-[32px] border border-line bg-card/80 p-6 sm:p-10 shadow-[0_45px_120px_rgba(24,24,27,0.056)]"
              >
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.32em] text-sky-600">
                    Contact
                  </p>
                  <h2 className="text-4xl font-semibold text-fg">
                    Book a discovery call or request a school pilot.
                  </h2>
                  <p className="max-w-xl text-base leading-8 text-fg-muted">
                    Reach out to see how Vultus Go can integrate with your
                    campus existing camera infrastructure and administration
                    tools.
                  </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {contactDetails.map(({ label, value, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      className="group rounded-3xl border border-transparent bg-tile/80 p-6 transition hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-[0_20px_50px_rgba(249,115,22,0.12)]"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-lg text-sky-600 transition group-hover:bg-sky-500 group-hover:text-white">
                        <Icon aria-hidden="true" />
                      </span>
                      <p className="mt-4 text-sm uppercase tracking-[0.32em] text-fg-muted">
                        {label}
                      </p>
                      <p className="mt-2 break-all text-lg font-semibold text-fg transition group-hover:text-sky-600">
                        {value}
                      </p>
                    </a>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-fg-muted">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-tile/80 px-4 py-2 transition hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-500 hover:text-white"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </motion.div>
              <motion.form
                onSubmit={submitInquiry}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                className="space-y-6 rounded-[32px] border border-line bg-card/85 p-8 shadow-[0_35px_90px_rgba(24,24,27,0.077)]"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block space-y-2 text-sm text-fg-muted">
                    <span>Name</span>
                    <input className="input-field" name="name" autoComplete="name" maxLength={100} required value={inquiry.name} onChange={updateInquiryField("name")} placeholder="Your name" />
                  </label>
                  <label className="block space-y-2 text-sm text-fg-muted">
                    <span>Email</span>
                    <input className="input-field" name="email" type="email" autoComplete="email" maxLength={254} required value={inquiry.email} onChange={updateInquiryField("email")} placeholder="school@example.com" />
                  </label>
                </div>
                <label className="block space-y-2 text-sm text-fg-muted">
                  <span>School / Organization</span>
                  <input className="input-field" name="organization" autoComplete="organization" maxLength={200} value={inquiry.organization} onChange={updateInquiryField("organization")} placeholder="School / organization name" />
                </label>
                <label className="block space-y-2 text-sm text-fg-muted">
                  <span>Message</span>
                  <textarea className="input-field min-h-[160px] resize-none" name="message" maxLength={5000} required value={inquiry.message} onChange={updateInquiryField("message")} placeholder="Tell us about your attendance goals..." />
                </label>
                {inquiryMessage && (
                  <p role={inquiryStatus === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm ${inquiryStatus === "error" ? "border-red-400/30 bg-red-500/10 text-red-300" : "border-emerald-400/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"}`}>
                    {inquiryMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={inquiryStatus === "submitting"}
                  className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-wait disabled:opacity-60"
                >
                  {inquiryStatus === "submitting" ? "Sending..." : inquiryStatus === "success" ? "Send Another Inquiry" : "Send Inquiry"}
                </button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative overflow-hidden border-t border-zinc-800 bg-[#0a0a0b] px-6 pb-8 pt-16 text-zinc-400 sm:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-2">
              <a
                href="#hero"
                className="mb-5 inline-flex items-center gap-3"
                aria-label="Vultus Go home"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg font-bold text-white">
                  V<span className="text-sky-400">G</span>
                </span>
                <span className="text-xl font-bold tracking-tight text-white">
                  Vultus<span className="text-sky-400">Go</span>
                </span>
              </a>
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-zinc-400">
                Vultus Go is an AI and technology company building intelligent
                software that helps organizations automate, secure, and grow.
                Face attendance at just ₹70 per student / year.
              </p>
              <div className="flex gap-3">
                {footerSocials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition hover:border-sky-400/60 hover:bg-sky-500 hover:text-white"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300">
                  {column.title}
                </p>
                <ul className="space-y-3">
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        {...(href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="text-sm text-zinc-400 transition-colors hover:text-sky-400"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 border-t border-white/10 py-8 md:grid-cols-3">
            {footerContacts.map(({ label, value, href, icon: Icon }) => {
              const content = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sky-400 transition group-hover:border-sky-500 group-hover:bg-sky-500 group-hover:text-white">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                      {label}
                    </span>
                    <span className="block break-all text-sm text-zinc-300 transition group-hover:text-white">
                      {value}
                    </span>
                  </span>
                </>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-3"
                >
                  {content}
                </a>
              ) : (
                <div key={label} className="group flex items-center gap-3">
                  {content}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500 md:flex-row">
            <p>© {new Date().getFullYear()} Vultus Go. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <a
                href="https://www.vultusgo.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-zinc-300 transition-colors hover:text-sky-400"
              >
                Main site · vultusgo.in
                <LuArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://dev.vultusgo.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-zinc-300 transition-colors hover:text-sky-400"
              >
                Dev Studio · dev.vultusgo.in
                <LuArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
