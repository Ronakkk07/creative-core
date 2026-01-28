import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Palette, Zap, Users } from "lucide-react";

const values = [
  {
    icon: Code,
    title: "Infrastructure as Code",
    description: "Automating everything. Reproducible, version-controlled infrastructure.",
  },
  {
    icon: Palette,
    title: "Cloud-Native Design",
    description: "Building for scale from day one with containerized, distributed systems.",
  },
  {
    icon: Zap,
    title: "Reliability",
    description: "99.99% uptime is the baseline. Resilient systems that self-heal.",
  },
  {
    icon: Users,
    title: "DevOps Culture",
    description: "Breaking silos. Empowering teams with self-service platforms.",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column - Bio */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-sm font-mono text-primary tracking-wider uppercase block mb-4"
            >
              About Me
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
            >
              Building the web,{" "}
              <span className="text-gradient-accent">one experience</span> at a time.
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-muted-foreground leading-relaxed"
            >
              <p>
                I'm a cloud engineer and software developer with 5+ years of experience 
                designing and implementing scalable infrastructure. My journey started 
                with curiosity about distributed systems and evolved into a passion for 
                building resilient, cloud-native architectures.
              </p>
              <p>
                Currently focused on Kubernetes, AWS, and infrastructure automation, 
                I believe in treating infrastructure as code and empowering development 
                teams with self-service platforms. Every system I build prioritizes 
                reliability, security, and operational excellence.
              </p>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border"
            >
              {[
                { value: "5+", label: "Years Experience" },
                { value: "50+", label: "Projects Delivered" },
                { value: "30+", label: "Happy Clients" },
              ].map((stat, index) => (
                <div key={stat.label}>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-gradient-accent block"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Right column - Values */}
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-border card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;