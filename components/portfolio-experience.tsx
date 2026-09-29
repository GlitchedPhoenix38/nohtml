"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Rocket,
  Send,
  Sparkles,
  Terminal,
  Trophy,
  Wrench
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  achievements,
  journey,
  projects,
  skillGroups,
  stats,
  techStack
} from "@/lib/portfolio-data";

const navItems = ["About", "Skills", "Projects", "Journey", "Contact"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};

export default function PortfolioExperience() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-cyanGlow via-violetGlow to-emeraldGlow"
        style={{ scaleX }}
      />
      {!shouldReduceMotion ? <CustomCursor /> : null}
      {loading ? <Loader /> : null}
      <BackgroundEffects />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}

function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.62, duration: 0.45 }}
      onAnimationComplete={() => undefined}
      aria-hidden="true"
    >
      <div className="relative grid place-items-center">
        <motion.div
          className="absolute h-28 w-28 rounded-full border border-cyanGlow/40"
          animate={{ scale: [1, 1.24, 1], opacity: [1, 0.45, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="glass grid h-20 w-20 place-items-center rounded-2xl text-2xl font-black text-cyanGlow">A</div>
      </div>
    </motion.div>
  );
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: PointerEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const onEnter = () => setActive(true);
    const onLeave = () => setActive(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.querySelectorAll("a, button, input, textarea").forEach((node) => {
      node.addEventListener("pointerenter", onEnter);
      node.addEventListener("pointerleave", onLeave);
    });
    return () => {
      window.removeEventListener("pointermove", move);
      document.querySelectorAll("a, button, input, textarea").forEach((node) => {
        node.removeEventListener("pointerenter", onEnter);
        node.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-[90] hidden rounded-full border border-cyanGlow/60 mix-blend-screen md:block"
      animate={{
        x: position.x - (active ? 22 : 10),
        y: position.y - (active ? 22 : 10),
        width: active ? 44 : 20,
        height: active ? 44 : 20,
        backgroundColor: active ? "rgba(93,232,255,0.12)" : "rgba(93,232,255,0.28)"
      }}
      transition={{ type: "spring", stiffness: 450, damping: 32 }}
    />
  );
}

function BackgroundEffects() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 53) % 100}%`,
        delay: (index % 8) * 0.45,
        duration: 7 + (index % 5)
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-radial-noise" />
      <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyanGlow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[34rem] w-[34rem] rounded-full bg-violetGlow/12 blur-3xl" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1 w-1 rounded-full bg-cyanGlow/60 shadow-[0_0_16px_rgba(93,232,255,0.9)]"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [-18, 18, -18], opacity: [0.16, 0.7, 0.16] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-3">
        <a href="#home" className="flex items-center gap-3" aria-label="GlitchedPhoenix home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-black text-ink">GP</span>
          <span className="hidden text-sm font-semibold tracking-wide sm:block">GlitchedPhoenix</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-full px-4 py-2 text-sm text-white/68 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyanGlow"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="mailto:pvtabdullah99@gmail.com"
          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-ink transition hover:bg-cyanGlow focus:outline-none focus:ring-2 focus:ring-cyanGlow focus:ring-offset-2 focus:ring-offset-ink"
        >
          Hire Me
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative z-10 flex min-h-screen items-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/76 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-cyanGlow" />
            Computer Science Engineering Student
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-balance text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
            Building polished software for an intelligent future.
          </motion.h1>
          <motion.div variants={fadeUp} className="mt-6 min-h-8 font-mono text-lg text-cyanGlow sm:text-xl">
            <TypingEffect words={["Full-stack developer", "AI/ML explorer", "Product-minded engineer", "Lifelong systems learner"]} />
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
            I am GlitchedPhoenix, a Computer Science Engineering student crafting refined web experiences,
            practical AI tools, and reliable software systems with a strong eye for detail.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyanGlow to-violetGlow px-7 py-4 font-bold text-ink shadow-glow transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyanGlow" href="#projects">
              View Projects <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-7 py-4 font-bold text-white backdrop-blur-xl transition hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-cyanGlow" href="#contact">
              Let&apos;s Connect
            </a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[28rem]"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-cyanGlow/30 via-violetGlow/20 to-emeraldGlow/20 blur-3xl" />
          <div className="glass premium-ring relative overflow-hidden rounded-[2.2rem] p-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-white/16 via-cyanGlow/12 to-violetGlow/18">
              <div className="absolute inset-x-10 top-12 h-44 rounded-full bg-gradient-to-b from-white/28 to-white/6 blur-2xl" />
              <div className="absolute bottom-0 left-1/2 h-[74%] w-[72%] -translate-x-1/2 rounded-t-[999px] bg-gradient-to-b from-white/24 via-cyanGlow/14 to-white/8" />
              <div className="absolute left-1/2 top-[22%] grid h-36 w-36 -translate-x-1/2 place-items-center rounded-full border border-white/20 bg-ink/40 text-5xl font-black text-white shadow-card backdrop-blur-2xl">
                A
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/12 bg-black/26 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-emeraldGlow shadow-[0_0_20px_rgba(85,241,184,0.9)]" />
                  <span className="text-sm font-semibold">Available for internships & projects</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TypingEffect({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const delay = deleting ? 34 : 74;
    const timeout = window.setTimeout(() => {
      if (!deleting && text === word) {
        window.setTimeout(() => setDeleting(true), 900);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
        return;
      }
      setText(word.slice(0, deleting ? text.length - 1 : text.length + 1));
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [deleting, text, wordIndex, words]);

  return (
    <span>
      {text}
      <span className="ml-1 animate-pulse text-white">|</span>
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <motion.div variants={fadeUp} className="mb-4 font-mono text-sm uppercase tracking-[0.35em] text-cyanGlow">
        {eyebrow}
      </motion.div>
      <motion.h2 variants={fadeUp} className="text-balance text-4xl font-black tracking-[-0.03em] sm:text-6xl">
        {title}
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-5 text-lg leading-8 text-white/62">
        {description}
      </motion.p>
    </motion.div>
  );
}

function About() {
  const items = [
    { icon: GraduationCap, title: "Education", text: "B.Tech Computer Science Engineering with a focus on software design, algorithms, databases, and modern web systems." },
    { icon: BrainCircuit, title: "Interests", text: "AI/ML, scalable web apps, automation, human-centered interfaces, cloud deployment, and developer tooling." },
    { icon: Rocket, title: "Career Goal", text: "To become a world-class engineer who can design elegant products, ship dependable systems, and solve meaningful problems." }
  ];

  return (
    <section id="about" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="About Me"
          title="Engineering mindset with product-level taste."
          description="I combine computer science fundamentals with a visual design sensibility to build work that feels sharp, useful, and reliable."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="glass rounded-3xl p-7 transition hover:-translate-y-1 hover:border-cyanGlow/40"
            >
              <item.icon className="h-8 w-8 text-cyanGlow" />
              <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>
              <p className="mt-4 leading-7 text-white/62">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const icons = [Code2, Terminal, BrainCircuit, Wrench];
  return (
    <section id="skills" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Skills"
          title="A flexible stack for modern digital products."
          description="The skill map below is intentionally broad, giving GlitchedPhoenix room to replace placeholders with confirmed strengths over time."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, index) => {
            const Icon = icons[index] ?? Code2;
            return (
              <motion.article
                key={group.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
                className="glass rounded-3xl p-6"
              >
                <Icon className="h-8 w-8 text-cyanGlow" />
                <h3 className="mt-5 text-xl font-bold">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm text-white/72">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((tech) => (
            <div key={tech} className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-center text-sm text-white/68 backdrop-blur">
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Projects"
          title="Placeholder builds with portfolio-grade presentation."
          description="Swap the links, screenshots, and copy as real work grows. The card system is built to make even early projects look polished."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group glass overflow-hidden rounded-3xl"
            >
              <div className={`h-52 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.36),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.16),transparent)]" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/16 bg-black/20 p-4 backdrop-blur-xl">
                  <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/58">{project.type}</div>
                  <h3 className="mt-2 text-2xl font-black">{project.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="leading-7 text-white/64">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/8 px-3 py-1.5 text-xs text-white/64">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex gap-3">
                  <a href={project.github} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/12 px-4 py-3 text-sm font-bold text-white/78 transition hover:bg-white/10">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  <a href={project.demo} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-ink transition hover:bg-cyanGlow">
                    <ExternalLink className="h-4 w-4" /> Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Journey"
          title="Experience and learning, designed as momentum."
          description="A modern timeline for coursework, self-study, internships, communities, and milestone projects."
        />
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyanGlow via-violetGlow to-transparent md:left-1/2" />
          {journey.map((item, index) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`relative mb-8 md:w-[calc(50%-2rem)] ${index % 2 ? "md:ml-auto" : ""} pl-12 md:pl-0`}
            >
              <span className="absolute left-1 top-6 h-7 w-7 rounded-full border-4 border-ink bg-cyanGlow shadow-[0_0_30px_rgba(93,232,255,0.7)] md:left-auto md:right-[-2.9rem]" />
              {index % 2 ? <span className="hidden md:absolute md:left-[-2.9rem] md:top-6 md:block md:h-7 md:w-7 md:rounded-full md:border-4 md:border-ink md:bg-violetGlow md:shadow-[0_0_30px_rgba(141,107,255,0.7)]" /> : null}
              <div className="glass rounded-3xl p-6">
                <div className="font-mono text-sm text-cyanGlow">{item.period}</div>
                <h3 className="mt-3 text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/62">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const icons = [Trophy, Award, BookOpen, CheckCircle2];
  return (
    <section className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Achievements"
          title="Certifications and proof points with room to grow."
          description="A clean system for verified learning, events, hackathons, online courses, and academic recognition."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, index) => {
            const Icon = icons[index] ?? Award;
            return (
              <motion.div
                key={achievement.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="glass rounded-3xl p-6"
              >
                <Icon className="h-8 w-8 text-emeraldGlow" />
                <h3 className="mt-6 text-xl font-bold">{achievement.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{achievement.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Contact"
          title="Let&apos;s build the next impressive thing."
          description="Use this form layout as a front-end placeholder, or wire it to an email service, server action, or CRM later."
        />
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass rounded-3xl p-7">
            <h3 className="text-2xl font-bold">Contact Details</h3>
            <p className="mt-4 leading-7 text-white/62">
              Open to internships, freelance projects, collaboration, and technical communities.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: Mail, label: "pvtabdullah99@gmail.com", href: "mailto:pvtabdullah99@gmail.com" },
                { icon: Github, label: "github.com/GlitchedPhoenix38", href: "https://github.com/GlitchedPhoenix38" },
                { icon: Linkedin, label: "linkedin.com/in/glitchedphoenix", href: "https://linkedin.com/" }
              ].map((link) => (
                <a key={link.label} href={link.href} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/6 p-4 text-white/72 transition hover:bg-white/10 hover:text-white">
                  <link.icon className="h-5 w-5 text-cyanGlow" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
          <form className="glass rounded-3xl p-7" aria-label="Contact form">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-white/72">Name</span>
                <input className="mt-2 w-full rounded-2xl border border-white/10 bg-white/7 px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-cyanGlow" placeholder="Your name" type="text" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-white/72">Email</span>
                <input className="mt-2 w-full rounded-2xl border border-white/10 bg-white/7 px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-cyanGlow" placeholder="you@example.com" type="email" />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="text-sm font-semibold text-white/72">Message</span>
              <textarea className="mt-2 min-h-40 w-full resize-none rounded-2xl border border-white/10 bg-white/7 px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-cyanGlow" placeholder="Tell me about the opportunity or idea..." />
            </label>
            <button type="button" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyanGlow to-emeraldGlow px-6 py-4 font-black text-ink transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-cyanGlow">
              Send Message <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-4 py-10 text-center text-sm text-white/48">
      <p>© 2026 GlitchedPhoenix. Designed and built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.</p>
    </footer>
  );
}
