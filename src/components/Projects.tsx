import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { fetchProjects } from "@/services/api";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
  image: string;
  color: string;
  project_url?: string;
  github_url?: string;
}

const filters = ["All", "Cloud", "DevOps", "Backend"];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(console.error);
  }, []);

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

        {/* Grid */}
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

                {/* Hover */}
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
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        className="p-3 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        className="p-3 rounded-full bg-secondary text-foreground hover:scale-110 transition-transform"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </motion.div>
                </motion.div>

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

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">
                    Impact
                  </span>
                  <p className="text-sm mt-1">{project.impact}</p>
                </div>

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
      </div>
    </section>
  );
};

export default Projects;
