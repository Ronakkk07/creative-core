import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import { fetchExperience } from "@/services/api";

interface ExperienceItem {
  id: number;
  type: string;
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

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

  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    fetchExperience()
      .then(setExperiences)
      .catch(console.error);
  }, []);

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
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border">
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary"
              style={{ height: lineHeight }}
            />
          </div>

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
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

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

                      {exp.highlights?.length > 0 && (
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
