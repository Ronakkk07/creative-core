import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Senior Full-Stack Developer",
    company: "TechCorp Innovation",
    period: "2022 - Present",
    description: "Leading development of enterprise SaaS products. Architecting scalable solutions serving 100K+ users.",
    highlights: ["Led team of 5 developers", "Reduced load time by 60%", "Implemented CI/CD pipelines"],
  },
  {
    type: "work",
    title: "Full-Stack Developer",
    company: "Digital Agency Co",
    period: "2020 - 2022",
    description: "Built custom web applications for Fortune 500 clients. Specialized in React and Django integration.",
    highlights: ["Delivered 20+ projects", "Mentored junior developers", "Established code standards"],
  },
  {
    type: "award",
    title: "Best Innovation Award",
    company: "Tech Summit 2021",
    period: "2021",
    description: "Recognized for developing an AI-powered accessibility tool that improved web navigation for visually impaired users.",
    highlights: [],
  },
  {
    type: "work",
    title: "Frontend Developer",
    company: "StartupHub",
    period: "2019 - 2020",
    description: "Early-stage startup focused on fintech solutions. Built responsive interfaces and real-time data visualizations.",
    highlights: ["First engineering hire", "Built MVP in 3 months", "Raised Series A"],
  },
  {
    type: "education",
    title: "B.S. Computer Science",
    company: "University of Technology",
    period: "2015 - 2019",
    description: "Focused on software engineering and human-computer interaction. Graduated with honors.",
    highlights: ["Dean's List", "Senior Thesis: Web Performance", "Teaching Assistant"],
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "work":
      return Briefcase;
    case "education":
      return GraduationCap;
    case "award":
      return Award;
    default:
      return Briefcase;
  }
};

const Experience = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <section id="experience" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-mono text-primary tracking-wider uppercase block mb-4"
          >
            My Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Experience & <span className="text-gradient-accent">Growth</span>
          </motion.h2>
        </div>
        
        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          {/* Animated line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border">
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary"
              style={{ height: lineHeight }}
            />
          </div>
          
          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const Icon = getIcon(exp.type);
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={`${exp.title}-${exp.period}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-start gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />
                  
                  {/* Content card */}
                  <div className={`flex-1 ml-16 md:ml-0 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="p-6 rounded-2xl bg-card border border-border card-hover">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{exp.title}</h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                          <span className="text-sm text-muted-foreground font-mono">
                            {exp.period}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4">
                        {exp.description}
                      </p>
                      
                      {exp.highlights.length > 0 && (
                        <ul className="flex flex-wrap gap-2">
                          {exp.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground"
                            >
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;