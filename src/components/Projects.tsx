import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Full-Stack",
    description: "A high-performance e-commerce solution handling 10K+ daily transactions with real-time inventory management.",
    problem: "Legacy system couldn't scale during peak traffic",
    solution: "Rebuilt with React, Django, and Redis caching",
    impact: "300% improvement in page load speed, 50% reduction in cart abandonment",
    tags: ["React", "Django", "PostgreSQL", "Redis"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    color: "from-primary/20 to-violet-500/20",
  },
  {
    id: 2,
    title: "Analytics Dashboard",
    category: "Frontend",
    description: "Real-time data visualization platform for enterprise clients with customizable widgets and reporting.",
    problem: "Complex data was difficult for stakeholders to interpret",
    solution: "Intuitive dashboard with interactive charts and automated insights",
    impact: "Reduced decision-making time by 60%, adopted by 200+ teams",
    tags: ["React", "D3.js", "TypeScript", "WebSocket"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Healthcare Portal",
    category: "Full-Stack",
    description: "HIPAA-compliant patient management system with telemedicine integration.",
    problem: "Fragmented systems causing delays in patient care",
    solution: "Unified platform with secure video calls and EHR integration",
    impact: "40% faster patient onboarding, 95% satisfaction rate",
    tags: ["React", "Django", "PostgreSQL", "WebRTC"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 4,
    title: "AI Content Studio",
    category: "Full-Stack",
    description: "Generative AI platform for creating marketing content at scale with brand consistency.",
    problem: "Manual content creation bottleneck for marketing teams",
    solution: "AI-powered generation with brand voice training and approval workflows",
    impact: "10x content output, 70% cost reduction",
    tags: ["React", "Python", "OpenAI", "Docker"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    color: "from-amber-500/20 to-orange-500/20",
  },
];

const filters = ["All", "Full-Stack", "Frontend", "Backend"];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const filteredProjects = projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );
  
  return (
    <section id="projects" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-sm font-mono text-primary tracking-wider uppercase block mb-4"
            >
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              Projects that{" "}
              <span className="text-gradient-accent">made an impact</span>
            </motion.h2>
          </div>
          
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-2"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative rounded-3xl overflow-hidden bg-card border border-border card-hover"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} z-10`} />
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredProject === project.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm z-20 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: hoveredProject === project.id ? 1 : 0.8 }}
                    className="flex gap-4"
                  >
                    <button className="p-3 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-full bg-secondary text-foreground hover:scale-110 transition-transform">
                      <Github className="w-5 h-5" />
                    </button>
                  </motion.div>
                </motion.div>
                
                {/* Category badge */}
                <span className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                  {project.category}
                </span>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                
                <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Impact highlight */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">Impact</span>
                  <p className="text-sm mt-1">{project.impact}</p>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-medium link-underline"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;