import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Django", level: 90 },
      { name: "Python", level: 92 },
      { name: "PostgreSQL", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 75 },
    ],
  },
  {
    name: "DevOps",
    skills: [
      { name: "Docker", level: 85 },
      { name: "GitHub Actions", level: 80 },
      { name: "AWS", level: 70 },
      { name: "Linux", level: 75 },
      { name: "Nginx", level: 70 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", level: 95 },
      { name: "Figma", level: 80 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 85 },
      { name: "Jira", level: 80 },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("Frontend");
  
  const activeSkills = skillCategories.find((c) => c.name === activeCategory)?.skills || [];
  
  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-mono text-primary tracking-wider uppercase block mb-4"
          >
            Technical Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Skills & <span className="text-gradient-accent">Technologies</span>
          </motion.h2>
        </div>
        
        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category.name
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>
        
        {/* Skills visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="space-y-6">
            {activeSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Tech stack visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 p-8 rounded-3xl glass text-center"
        >
          <p className="text-muted-foreground mb-6">
            My preferred stack for building modern applications
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["React", "TypeScript", "Django", "PostgreSQL", "Docker", "GitHub Actions"].map(
              (tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 font-medium text-primary cursor-default"
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;