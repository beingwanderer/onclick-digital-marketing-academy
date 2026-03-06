import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubmitLead } from "@/hooks/useQueries";
import {
  ArrowUp,
  Award,
  BarChart2,
  BookOpen,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  Globe,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Pen,
  Phone,
  Rocket,
  Search,
  Share2,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiWhatsapp,
  SiYoutube,
} from "react-icons/si";

// ─── Types ────────────────────────────────────────────────────────
interface LeadFormData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  purpose: string;
}

type FormId = "hero" | "contact";

// ─── LeadForm Component ───────────────────────────────────────────
function LeadForm({
  formId,
  variant = "card",
}: {
  formId: FormId;
  variant?: "card" | "inline";
}) {
  const [form, setForm] = useState<LeadFormData>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    purpose: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate, isPending } = useSubmitLead();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.purpose) {
      setError("Please select your purpose to learn Digital Marketing.");
      return;
    }
    mutate(form, {
      onSuccess: () => {
        setSubmitted(true);
        setForm({
          fullName: "",
          phoneNumber: "",
          emailAddress: "",
          purpose: "",
        });
      },
      onError: (err) => {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        );
      },
    });
  };

  if (submitted) {
    return (
      <div
        data-ocid={`${formId}.success_state`}
        className={`flex flex-col items-center justify-center gap-4 py-8 px-6 text-center ${
          variant === "card" ? "bg-white rounded-2xl" : ""
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-foreground font-display">
          Thank You!
        </h3>
        <p className="text-muted-foreground">
          Our counsellor will contact you within 24 hours. Get ready to
          kickstart your digital marketing journey!
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          variant="outline"
          className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
        >
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label
          htmlFor={`${formId}-name`}
          className="text-sm font-medium text-foreground mb-1 block"
        >
          Full Name *
        </Label>
        <Input
          id={`${formId}-name`}
          data-ocid={`${formId}.input`}
          type="text"
          placeholder="Enter your full name"
          value={form.fullName}
          onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
          required
          className="h-11 rounded-xl border-border focus:border-brand-blue"
        />
      </div>
      <div>
        <Label
          htmlFor={`${formId}-phone`}
          className="text-sm font-medium text-foreground mb-1 block"
        >
          Phone Number *
        </Label>
        <Input
          id={`${formId}-phone`}
          data-ocid={`${formId}.input`}
          type="tel"
          placeholder="+91 XXXXX XXXXX"
          value={form.phoneNumber}
          onChange={(e) =>
            setForm((p) => ({ ...p, phoneNumber: e.target.value }))
          }
          required
          className="h-11 rounded-xl border-border focus:border-brand-blue"
        />
      </div>
      <div>
        <Label
          htmlFor={`${formId}-email`}
          className="text-sm font-medium text-foreground mb-1 block"
        >
          Email Address *
        </Label>
        <Input
          id={`${formId}-email`}
          data-ocid={`${formId}.input`}
          type="email"
          placeholder="you@email.com"
          value={form.emailAddress}
          onChange={(e) =>
            setForm((p) => ({ ...p, emailAddress: e.target.value }))
          }
          required
          className="h-11 rounded-xl border-border focus:border-brand-blue"
        />
      </div>
      <div>
        <Label
          htmlFor={`${formId}-purpose`}
          className="text-sm font-medium text-foreground mb-1 block"
        >
          Purpose to Learn Digital Marketing *
        </Label>
        <Select
          value={form.purpose}
          onValueChange={(val) => setForm((p) => ({ ...p, purpose: val }))}
        >
          <SelectTrigger
            id={`${formId}-purpose`}
            data-ocid={`${formId}.select`}
            className="h-11 rounded-xl border-border"
          >
            <SelectValue placeholder="Select your purpose..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Get a Job">Get a Job</SelectItem>
            <SelectItem value="Freelancing">Freelancing</SelectItem>
            <SelectItem value="Business Promotion">
              Business Promotion
            </SelectItem>
            <SelectItem value="Career Switch">Career Switch</SelectItem>
            <SelectItem value="Skill Upgrade">Skill Upgrade</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {error && (
        <p
          data-ocid={`${formId}.error_state`}
          className="text-destructive text-sm"
        >
          {error}
        </p>
      )}
      <Button
        type="submit"
        data-ocid={`${formId}.submit_button`}
        disabled={isPending}
        className="h-12 rounded-xl font-bold text-base bg-brand-orange hover:bg-brand-orange-dark text-white transition-all duration-200 shadow-md hover:shadow-lg"
      >
        {isPending ? "Submitting..." : "Get Free Counselling"}
      </Button>
    </form>
  );
}

// ─── Stat Counter ─────────────────────────────────────────────────
function StatCard({
  icon,
  value,
  label,
  delay = 0,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-default ${
        visible ? "animate-count-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-brand-blue">
        {icon}
      </div>
      <p className="text-3xl font-bold font-display text-brand-blue mb-1">
        {value}
      </p>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

// ─── Module Card ──────────────────────────────────────────────────
function ModuleCard({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-ocid={`modules.item.${index}`}
      className={`group p-6 rounded-2xl bg-white shadow-card hover:shadow-card-hover border border-border hover:border-brand-blue/30 transition-all duration-300 cursor-default ${
        visible ? "animate-fade-in-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${(index - 1) * 80}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 text-brand-blue">
        {icon}
      </div>
      <h3 className="text-lg font-bold font-display text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>
      <a
        href="#contact"
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-orange transition-colors duration-200"
        aria-label={`Learn more about ${title}`}
      >
        Learn More <ChevronRight className="w-4 h-4" />
      </a>
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────
function TestimonialCard({
  name,
  outcome,
  review,
  index,
}: {
  name: string;
  outcome: string;
  review: string;
  index: number;
}) {
  return (
    <div
      data-ocid={`testimonials.item.${index}`}
      className="p-6 rounded-2xl bg-white shadow-card border border-border flex flex-col gap-4 h-full"
    >
      <div className="flex gap-1">
        {["s1", "s2", "s3", "s4", "s5"].map((k) => (
          <Star key={k} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 italic">
        "{review}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-blue-400 flex items-center justify-center text-white font-bold text-sm">
          {name[0]}
        </div>
        <div>
          <p className="font-bold text-foreground text-sm">{name}</p>
          <p className="text-xs text-brand-orange font-medium">{outcome}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#courses", label: "Courses" },
    { href: "#trainers", label: "Trainers" },
    { href: "#certifications", label: "Certifications" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  const socialLinks = [
    {
      icon: SiInstagram,
      href: "https://www.instagram.com/onclick_digital_marketing?igsh=MWs5bzJjdG04cWRtaw==",
      label: "Instagram",
    },
    {
      icon: SiFacebook,
      href: "https://www.facebook.com/onclickdigitalmarketing/",
      label: "Facebook",
    },
    {
      icon: SiYoutube,
      href: "https://youtube.com/@onclickdigitalmarketingacademy?si=XHg2cTnm6MIbXQJc",
      label: "YouTube",
    },
    {
      icon: SiLinkedin,
      href: "https://www.linkedin.com/company/onclick-digital-marketing-services/",
      label: "LinkedIn",
    },
  ];

  const modules = [
    {
      icon: <Search className="w-5 h-5" />,
      title: "Search Engine Optimization (SEO)",
      description:
        "Learn on-page, off-page SEO, keyword research, link building and rank websites on Google.",
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Google Ads / PPC Advertising",
      description:
        "Master paid advertising on Google Search, Display, Shopping and YouTube campaigns.",
    },
    {
      icon: <Share2 className="w-5 h-5" />,
      title: "Social Media Marketing",
      description:
        "Build brand presence on Facebook, Instagram, LinkedIn and Twitter with organic and paid strategies.",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Content Marketing",
      description:
        "Create compelling content strategies, blogs, videos and infographics that drive traffic and leads.",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Marketing",
      description:
        "Design email campaigns, build subscriber lists and automate follow-ups with tools like Mailchimp.",
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: "Affiliate Marketing",
      description:
        "Earn commissions by promoting products and services online through affiliate networks.",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      title: "YouTube Marketing",
      description:
        "Grow a YouTube channel, optimize videos for search, and run effective video ad campaigns.",
    },
    {
      icon: <BarChart2 className="w-5 h-5" />,
      title: "Google Analytics",
      description:
        "Analyze website traffic, user behavior and measure campaign performance with data-driven insights.",
    },
    {
      icon: <Pen className="w-5 h-5" />,
      title: "Canva Graphic Designing",
      description:
        "Design professional creatives, social media posts, banners and presentations using Canva.",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "WordPress Web Designing",
      description:
        "Build and manage professional websites without coding using WordPress.",
    },
  ];

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Live Projects & Real Campaign Training",
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      text: "3-Month Internship Program",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "100% Placement Assistance",
    },
    { icon: <Users className="w-5 h-5" />, text: "Expert Industry Trainers" },
    {
      icon: <Heart className="w-5 h-5" />,
      text: "Small Batch Sizes for Personal Attention",
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      text: "Tools: Google Ads, SEMrush, Ahrefs, Mailchimp, Canva, WordPress",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Weekend & Weekday Batches Available",
    },
    {
      icon: <Award className="w-5 h-5" />,
      text: "Course Completion Certificate",
    },
  ];

  const certifications = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Google Ads Certification",
      desc: "Validate your PPC expertise",
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Google Analytics Certification",
      desc: "Master data analytics",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "HubSpot Content Marketing",
      desc: "Content strategy mastery",
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Facebook Blueprint Certification",
      desc: "Social ads expertise",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "OnClick Academy Certificate",
      desc: "Course completion proof",
    },
  ];

  const testimonials = [
    {
      name: "Nazeer",
      outcome: "Placed as Digital Marketing Executive",
      review:
        "I joined OnClick Academy after completing my graduation and within 3 months I got placed as a Digital Marketing Executive. The trainers here are very practical and patient. Best decision I ever made.",
    },
    {
      name: "Prashanth",
      outcome: "Freelancing Full-Time",
      review:
        "The Google Ads and SEO modules were very detailed and practical. I was able to freelance after completing the course and now I earn more than my previous full-time job. Highly recommended!",
    },
    {
      name: "Bhagat Babu",
      outcome: "Placed Within 1 Month",
      review:
        "The internship program at OnClick gave me real campaign experience. My resume stands out because I have actual work experience. Got placed within a month of completing the course.",
    },
    {
      name: "Sirisha",
      outcome: "Business Sales Increased 3x",
      review:
        "As a working professional, I joined the weekend batch. The flexible timings and expert faculty made it easy to learn. Now I handle digital marketing for my own business and have increased sales by 3x.",
    },
    {
      name: "Lakshmi",
      outcome: "Freelance Digital Marketer",
      review:
        "I was a housewife looking to start a career. OnClick Academy helped me become a freelance digital marketer. Now I work from home and earn a great income. The support from trainers even after course completion is amazing.",
    },
  ];

  const faqs = [
    {
      q: "What is the duration of the Digital Marketing Course?",
      a: "The course duration is 3 to 4 months with a 3-month internship program included.",
    },
    {
      q: "Is this course suitable for beginners?",
      a: "Yes, absolutely. Our course is designed for complete beginners as well as working professionals. No prior experience is required.",
    },
    {
      q: "Do you offer weekend batches?",
      a: "Yes, we offer both weekday and weekend batches to accommodate working professionals and students.",
    },
    {
      q: "What certifications will I get after completing the course?",
      a: "You will receive 5+ certifications including Google Ads, Google Analytics, HubSpot, Facebook Blueprint, and the OnClick Academy completion certificate.",
    },
    {
      q: "Do you provide placement assistance?",
      a: "Yes, we provide 100% placement assistance including resume building, mock interviews, LinkedIn optimization, and referrals to our hiring partners.",
    },
    {
      q: "What is the fee for the course?",
      a: "Please contact us for current fee details and available discounts. We also offer EMI options.",
    },
    {
      q: "Are there any live projects during the course?",
      a: "Yes, students work on live projects and real client campaigns throughout the course and during the 3-month internship.",
    },
    {
      q: "Which branches are available?",
      a: "We have branches in Abids, Ameerpet, Dilsukhnagar, and Kukatpally in Hyderabad.",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* ── Navigation ─────────────────────────────────────────── */}
      <header
        id="home"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 nav-blur shadow-sm border-b border-border"
            : "bg-white/80 nav-blur"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#home" data-ocid="nav.link" className="flex items-center">
              <img
                src="/assets/generated/onclick-logo-transparent.dim_600x150.png"
                alt="OnClick Digital Marketing Academy"
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </a>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-6"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid="nav.link"
                  className="text-sm font-semibold text-foreground/80 hover:text-brand-blue transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Right: Social + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-brand-blue hover:bg-blue-50 transition-all duration-200"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <Button
                asChild
                data-ocid="nav.primary_button"
                className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold rounded-xl px-6 shadow-md"
              >
                <a href="#contact">Enroll Now</a>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              data-ocid="nav.toggle"
              className="lg:hidden p-2 rounded-xl text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-fade-in">
              <nav
                className="flex flex-col gap-2"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-ocid="nav.link"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-blue-50 hover:text-brand-blue transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex items-center gap-3 px-4 py-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-brand-blue hover:bg-blue-50 transition-all duration-200"
                    >
                      <s.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
                <Button
                  data-ocid="nav.primary_button"
                  className="mx-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold rounded-xl"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Enroll Now
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* ── Hero Section ───────────────────────────────────────── */}
      <section
        id="hero"
        className="gradient-hero min-h-screen flex items-center pt-20 lg:pt-24 pb-16"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Headline */}
            <div className="text-white animate-fade-in-up">
              <Badge className="bg-white/20 text-white border-0 mb-6 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
                🏆 Hyderabad's #1 Digital Marketing Academy
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6">
                Master Digital Marketing &{" "}
                <span className="text-brand-orange">
                  Build a High-Paying Career
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-white/85 leading-relaxed mb-8 max-w-xl">
                Join Hyderabad's Most Trusted Digital Marketing Academy with 9+
                Years of Expertise. Get Certified, Work on Live Projects, and
                Land Your Dream Job.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Button
                  asChild
                  data-ocid="hero.primary_button"
                  className="h-13 px-8 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold rounded-xl text-base shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <a href="#contact">Enroll Now</a>
                </Button>
                <Button
                  asChild
                  data-ocid="hero.secondary_button"
                  variant="outline"
                  className="h-13 px-8 py-3 border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-blue font-bold rounded-xl text-base transition-all duration-200"
                >
                  <a href="#contact">Book Free Demo</a>
                </Button>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 text-white/80">
                {["9+ Years", "5000+ Students", "100% Placement"].map(
                  (badge) => (
                    <div
                      key={badge}
                      className="flex items-center gap-2 text-sm font-semibold"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {badge}
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Right: Lead Form */}
            <div
              className="bg-white rounded-3xl p-8 shadow-glow animate-fade-in-up animation-delay-200"
              data-ocid="hero.card"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold font-display text-foreground mb-1">
                  Get Free Counselling
                </h2>
                <p className="text-muted-foreground text-sm">
                  Fill in your details and our expert will call you back within
                  24 hours.
                </p>
              </div>
              <LeadForm formId="hero" variant="card" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats / Trust Section ──────────────────────────────── */}
      <section id="stats" className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-50 text-brand-blue border-0 mb-4 px-4 py-1.5 font-semibold">
              Why Students Trust Us
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground">
              Numbers That Speak for Themselves
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard
              icon={<Award className="w-6 h-6" />}
              value="9+"
              label="Years of Experience"
              delay={0}
            />
            <StatCard
              icon={<Users className="w-6 h-6" />}
              value="5000+"
              label="Students Trained"
              delay={100}
            />
            <StatCard
              icon={<BookOpen className="w-6 h-6" />}
              value="15+"
              label="Course Modules"
              delay={200}
            />
            <StatCard
              icon={<CheckCircle className="w-6 h-6" />}
              value="5+"
              label="Certifications"
              delay={300}
            />
            <StatCard
              icon={<Briefcase className="w-6 h-6" />}
              value="100%"
              label="Placement Assistance"
              delay={400}
            />
            <StatCard
              icon={<Clock className="w-6 h-6" />}
              value="3 Months"
              label="Internship Program"
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* ── About Digital Marketing ───────────────────────────── */}
      <section id="about" className="section-padding bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <Badge className="bg-orange-50 text-brand-orange border-0 mb-4 px-4 py-1.5 font-semibold">
              Career Opportunity
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground mb-6">
              Why Digital Marketing is the{" "}
              <span className="text-gradient-blue">Career of the Future</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Digital marketing is one of the fastest-growing industries
              globally. With businesses shifting online, skilled digital
              marketers are in high demand. Whether you want to work with top
              companies, freelance globally, or grow your own business — a
              career in digital marketing offers unlimited income potential,
              flexibility, and growth. India's digital economy is booming, with
              lakhs of job openings annually. Now is the best time to start your
              journey.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "High Demand",
                desc: "Lakhs of job openings every year in India's digital economy",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Freelancing Freedom",
                desc: "Work with global clients from anywhere in the world",
              },
              {
                icon: <Rocket className="w-6 h-6" />,
                title: "Business Growth",
                desc: "Grow your own business with powerful digital strategies",
              },
              {
                icon: <Monitor className="w-6 h-6" />,
                title: "Work From Anywhere",
                desc: "Remote-friendly career with total location flexibility",
              },
              {
                icon: <DollarSign className="w-6 h-6" />,
                title: "Great Pay",
                desc: "Competitive salaries and unlimited freelance income potential",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Future-Proof Career",
                desc: "Digital skills are recession-proof and always in demand",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-background border border-border hover:border-brand-blue/30 hover:shadow-card transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold font-display text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course Modules ────────────────────────────────────── */}
      <section id="courses" className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-50 text-brand-blue border-0 mb-4 px-4 py-1.5 font-semibold">
              Curriculum
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground mb-4">
              15+ Modules Covering Every Aspect of{" "}
              <span className="text-gradient-blue">Digital Marketing</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From SEO to Google Ads, Social Media to Analytics — master every
              tool and strategy used by today's top digital marketers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, i) => (
              <ModuleCard
                key={mod.title}
                index={i + 1}
                icon={mod.icon}
                title={mod.title}
                description={mod.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Course Features / Why Choose Us ───────────────────── */}
      <section id="features" className="section-padding bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-orange-50 text-brand-orange border-0 mb-4 px-4 py-1.5 font-semibold">
                Our Advantages
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground mb-6">
                Why Choose{" "}
                <span className="text-gradient-orange">
                  OnClick Digital Marketing Academy?
                </span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We combine practical training, real-world projects, and
                dedicated career support to give you an unmatched learning
                experience.
              </p>
              <Button
                asChild
                data-ocid="features.primary_button"
                className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold rounded-xl px-8 shadow-md"
              >
                <a href="#contact">Enroll Now — Limited Seats</a>
              </Button>
            </div>
            <div className="grid gap-4">
              {features.map((f) => (
                <div
                  key={f.text}
                  className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover:border-brand-blue/30 hover:shadow-card transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-brand-blue flex-shrink-0">
                    {f.icon}
                  </div>
                  <p className="text-sm font-semibold text-foreground self-center">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trainers Section ──────────────────────────────────── */}
      <section id="trainers" className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-50 text-brand-blue border-0 mb-4 px-4 py-1.5 font-semibold">
              Expert Faculty
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground">
              Learn from{" "}
              <span className="text-gradient-blue">Industry Experts</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Trainer 1 */}
            <div
              data-ocid="trainers.item.1"
              className="rounded-3xl bg-white shadow-card border border-border overflow-hidden group hover:shadow-card-hover transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                <img
                  src="/assets/generated/trainer-karthik.dim_400x400.jpg"
                  alt="Karthik Reddy - Founder & Chief Director"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold font-display text-foreground">
                      Karthik Reddy
                    </h3>
                    <p className="text-brand-orange font-semibold text-sm">
                      Founder & Chief Director
                    </p>
                  </div>
                  <Badge className="bg-blue-50 text-brand-blue border-0 text-xs">
                    9+ Years
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  9+ years of hands-on experience in SEO, Google Ads, Social
                  Media Marketing, Content Marketing and Email Marketing. Has
                  trained 5000+ students and helped hundreds of businesses grow
                  their digital presence.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "SEO",
                    "PPC",
                    "Social Media",
                    "Content",
                    "Email Marketing",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 text-brand-blue text-xs font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Trainer 2 */}
            <div
              data-ocid="trainers.item.2"
              className="rounded-3xl bg-white shadow-card border border-border overflow-hidden group hover:shadow-card-hover transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
                <img
                  src="/assets/generated/trainer-aditya.dim_400x400.jpg"
                  alt="Aditya - Social Media Marketing Expert"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold font-display text-foreground">
                      Aditya
                    </h3>
                    <p className="text-brand-orange font-semibold text-sm">
                      Social Media Marketing Expert
                    </p>
                  </div>
                  <Badge className="bg-orange-50 text-brand-orange border-0 text-xs">
                    Expert
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Expert in Facebook Ads, Instagram Marketing, LinkedIn
                  campaigns and influencer marketing. Passionate about helping
                  students build a strong social media career.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Facebook Ads",
                    "Instagram",
                    "LinkedIn",
                    "Influencer Marketing",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-orange-50 text-brand-orange text-xs font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications ────────────────────────────────────── */}
      <section id="certifications" className="section-padding bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-50 text-brand-blue border-0 mb-4 px-4 py-1.5 font-semibold">
              Globally Recognized
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground mb-4">
              Get 5+ Industry-Recognized{" "}
              <span className="text-gradient-blue">Certifications</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our certification program prepares you for globally recognized
              exams. These certifications are valued by top companies and boost
              your resume significantly.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {certifications.map((cert, i) => (
              <div
                key={cert.title}
                data-ocid={`certifications.item.${i + 1}`}
                className="p-6 rounded-2xl bg-background border border-border hover:border-brand-blue/30 hover:shadow-card text-center group transition-all duration-300 cursor-default"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-blue-50 flex items-center justify-center mb-4 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                  {cert.icon}
                </div>
                <h3 className="font-bold font-display text-foreground text-sm mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-muted-foreground">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Internship Section ────────────────────────────────── */}
      <section id="internship" className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-green-50 text-green-700 border-0 mb-4 px-4 py-1.5 font-semibold">
                Real-World Experience
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground mb-6">
                3-Month Real-World{" "}
                <span className="text-gradient-blue">Internship Program</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Get hands-on experience by working on live campaigns for real
                businesses. During the 3-month internship program, students will
                manage actual Google Ads accounts, run social media campaigns,
                do SEO for real websites, and create content strategies — all
                under expert supervision. This real-world experience sets you
                apart from other candidates when applying for jobs.
              </p>
              <div className="grid gap-3">
                {[
                  "Live Campaign Management",
                  "Real Client Projects",
                  "Performance Tracking",
                  "Expert Mentorship",
                  "Certificate of Internship",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-semibold text-foreground text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="p-8 rounded-3xl gradient-card border border-border shadow-card">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-brand-blue flex items-center justify-center mb-4 animate-float">
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-brand-blue">
                    3-Month Internship
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Industry-Level Experience
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Live Campaigns", value: "Real" },
                    { label: "Client Projects", value: "Actual" },
                    { label: "Expert Guidance", value: "Daily" },
                    { label: "Certificate", value: "Included" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center p-4 bg-white rounded-xl shadow-xs"
                    >
                      <p className="text-lg font-bold text-brand-blue font-display">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Placement Assistance ──────────────────────────────── */}
      <section id="placement" className="section-padding bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-orange-50 text-brand-orange border-0 mb-4 px-4 py-1.5 font-semibold">
              Career Support
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground mb-4">
              100% Placement Assistance —{" "}
              <span className="text-gradient-orange">
                We Help You Get Hired
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We don't just teach — we help you launch your career. Our
              dedicated placement team works closely with hiring companies and
              recruitment partners to help every student land their dream
              digital marketing job.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <FileText className="w-5 h-5" />,
                title: "Resume Building & Interview Preparation",
                desc: "Professionally crafted resume + interview coaching",
              },
              {
                icon: <Globe className="w-5 h-5" />,
                title: "Job Portal Registrations",
                desc: "Profile setup on Naukri, LinkedIn, Indeed, and more",
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "Mock Interviews",
                desc: "Practice rounds with industry professionals",
              },
              {
                icon: <Briefcase className="w-5 h-5" />,
                title: "Referrals to Hiring Partners",
                desc: "Direct connections to our network of 100+ companies",
              },
              {
                icon: <TrendingUp className="w-5 h-5" />,
                title: "LinkedIn Profile Optimization",
                desc: "Stand out to recruiters with a powerful profile",
              },
              {
                icon: <Lightbulb className="w-5 h-5" />,
                title: "Career Counselling Sessions",
                desc: "One-on-one guidance on career paths and growth",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-background border border-border hover:border-brand-orange/30 hover:shadow-card transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold font-display text-foreground mb-2 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section id="testimonials" className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-50 text-brand-blue border-0 mb-4 px-4 py-1.5 font-semibold">
              Student Success Stories
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground">
              What Our <span className="text-gradient-blue">Students Say</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={t.name}
                index={i + 1}
                name={t.name}
                outcome={t.outcome}
                review={t.review}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section id="faq" className="section-padding bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-50 text-brand-blue border-0 mb-4 px-4 py-1.5 font-semibold">
              Common Questions
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground">
              Frequently Asked{" "}
              <span className="text-gradient-blue">Questions</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${i}`}
                  data-ocid={`faq.item.${i + 1}`}
                  className="border border-border rounded-xl px-6 bg-background hover:border-brand-blue/30 transition-colors duration-200"
                >
                  <AccordionTrigger className="text-left font-bold font-display text-foreground py-4 hover:no-underline hover:text-brand-blue">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── Final CTA Section ─────────────────────────────────── */}
      <section id="enroll" className="py-20 gradient-cta">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-6 px-4 py-1.5 font-semibold">
            🚀 Limited Seats Available
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold font-display text-white mb-4">
            Start Your Digital Marketing Career Today
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join 5000+ successful students. Get certified, get hired. Limited
            seats available!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              data-ocid="cta.primary_button"
              className="h-14 px-10 bg-white text-brand-blue hover:bg-white/90 font-bold rounded-xl text-base shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <a href="#contact">Enroll Now</a>
            </Button>
            <Button
              asChild
              data-ocid="cta.secondary_button"
              variant="outline"
              className="h-14 px-10 border-2 border-white text-white bg-transparent hover:bg-white/10 font-bold rounded-xl text-base transition-all duration-200"
            >
              <a href="#contact">Book Free Demo</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Contact Section ───────────────────────────────────── */}
      <section id="contact" className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-50 text-brand-blue border-0 mb-4 px-4 py-1.5 font-semibold">
              Reach Us
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-foreground">
              Get in Touch <span className="text-gradient-blue">with Us</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="shadow-card border-border rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-brand-blue flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold font-display text-foreground mb-1">
                        Phone Numbers
                      </h3>
                      <a
                        href="tel:+919985023500"
                        className="block text-brand-blue font-semibold hover:text-brand-orange transition-colors"
                      >
                        +91 99850 23500
                      </a>
                      <a
                        href="tel:+919346775340"
                        className="block text-brand-blue font-semibold hover:text-brand-orange transition-colors"
                      >
                        +91 93467 75340
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card border-border rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-brand-orange flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold font-display text-foreground mb-1">
                        Email Address
                      </h3>
                      <a
                        href="mailto:onclickhyderabad@gmail.com"
                        className="text-brand-blue font-semibold hover:text-brand-orange transition-colors break-all"
                      >
                        onclickhyderabad@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card border-border rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold font-display text-foreground mb-2">
                        Our Branches
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {[
                          "Abids",
                          "Ameerpet",
                          "Dilsukhnagar",
                          "Kukatpally",
                        ].map((branch) => (
                          <span
                            key={branch}
                            className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full"
                          >
                            {branch}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Hyderabad, Telangana, India
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-border text-muted-foreground hover:text-brand-blue hover:border-brand-blue hover:shadow-card transition-all duration-200"
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Inquiry Form */}
            <div
              data-ocid="contact.card"
              className="bg-white rounded-3xl p-8 shadow-card border border-border"
            >
              <h3 className="text-xl font-bold font-display text-foreground mb-2">
                Send an Enquiry
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Fill out the form and we'll get back to you within 24 hours.
              </p>
              <LeadForm formId="contact" variant="inline" />
            </div>
          </div>

          {/* Google Maps */}
          <div
            data-ocid="contact.map_marker"
            className="w-full rounded-3xl overflow-hidden shadow-card border border-border"
          >
            <iframe
              title="OnClick Digital Marketing Academy Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.31673581937!2d78.24323455!3d17.4127332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9929cfd1e3cf%3A0x19e5af96a5b2f21d!2sOnClick%20Digital%20Marketing%20Academy!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="bg-brand-navy text-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <img
                src="/assets/generated/onclick-logo-transparent.dim_600x150.png"
                alt="OnClick Digital Marketing Academy"
                className="h-10 w-auto object-contain mb-4 brightness-0 invert"
              />
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Hyderabad's most trusted digital marketing academy with 9+ years
                of experience training students for high-paying careers.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-brand-orange hover:text-white transition-all duration-200"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold font-display text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  "Home",
                  "Courses",
                  "Trainers",
                  "Certifications",
                  "Testimonials",
                  "Contact",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      data-ocid="footer.link"
                      className="text-white/60 hover:text-brand-orange text-sm font-medium transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contact"
                    data-ocid="footer.link"
                    className="text-brand-orange font-semibold text-sm hover:text-white transition-colors duration-200"
                  >
                    Enroll Now →
                  </a>
                </li>
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h4 className="font-bold font-display text-white mb-4">
                Courses
              </h4>
              <ul className="space-y-2">
                {[
                  "SEO",
                  "Google Ads",
                  "Social Media Marketing",
                  "Content Marketing",
                  "Email Marketing",
                  "WordPress",
                ].map((course) => (
                  <li key={course}>
                    <a
                      href="#courses"
                      data-ocid="footer.link"
                      className="text-white/60 hover:text-brand-orange text-sm font-medium transition-colors duration-200"
                    >
                      {course}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold font-display text-white mb-4">
                Contact Us
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <Phone className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <a
                      href="tel:+919985023500"
                      className="hover:text-white block transition-colors"
                    >
                      +91 99850 23500
                    </a>
                    <a
                      href="tel:+919346775340"
                      className="hover:text-white block transition-colors"
                    >
                      +91 93467 75340
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <Mail className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:onclickhyderabad@gmail.com"
                    className="hover:text-white transition-colors break-all"
                  >
                    onclickhyderabad@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <p>Abids | Ameerpet | Dilsukhnagar | Kukatpally</p>
                    <p>Hyderabad, Telangana, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>
              © {new Date().getFullYear()} OnClick Digital Marketing Academy.
              All Rights Reserved.
            </p>
            <p>
              Built with{" "}
              <Heart className="w-3.5 h-3.5 inline text-brand-orange" /> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-orange hover:text-white transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp Button ───────────────────────────── */}
      <a
        href="https://wa.me/919985023500?text=Hi%2C%20I'm%20interested%20in%20the%20Digital%20Marketing%20Course"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        aria-label="Chat on WhatsApp"
        className="whatsapp-float"
      >
        <SiWhatsapp className="w-6 h-6 text-white" />
      </a>

      {/* ── Scroll to Top Button ──────────────────────────────── */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          data-ocid="scroll.primary_button"
          aria-label="Scroll to top"
          className="scroll-top-btn bg-brand-blue hover:bg-brand-blue-dark text-white"
          style={{ bottom: "7rem" }}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
