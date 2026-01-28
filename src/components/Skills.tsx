import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const skillCategories = [
  {
    name: "Cloud Platforms",
    skills: [
      { name: "AWS", level: 95 },
      { name: "Azure", level: 88 },
      { name: "Google Cloud", level: 82 },
      { name: "DigitalOcean", level: 85 },
      { name: "Cloudflare", level: 80 },
    ],
  },
  {
    name: "DevOps & Infrastructure",
    skills: [
      { name: "Kubernetes", level: 92 },
      { name: "Docker", level: 95 },
      { name: "Terraform", level: 90 },
      { name: "Ansible", level: 85 },
      { name: "CI/CD Pipelines", level: 92 },
    ],
  },
  {
    name: "Development",
    skills: [
      { name: "Python", level: 92 },
      { name: "Go", level: 85 },
      { name: "TypeScript", level: 88 },
      { name: "Node.js", level: 85 },
      { name: "React", level: 82 },
    ],
  },
  {
    name: "Databases & Tools",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 88 },
      { name: "Elasticsearch", level: 80 },
      { name: "Git", level: 95 },
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
            My preferred stack for cloud-native applications
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["AWS", "Kubernetes", "Terraform", "Python", "Docker", "PostgreSQL"].map(
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