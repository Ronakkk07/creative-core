import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Send, Mail, MapPin, Linkedin, Github } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { fetchContactInfo, sendContactMessage } from "@/services/api";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [info, setInfo] = useState<any>(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchContactInfo().then(setInfo).catch(console.error);
  }, []);

  // Auto-dismiss feedback
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      await sendContactMessage(formState); // send form data to backend
      setFormState({ name: "", email: "", message: "" });
      setFeedback({ type: "success", message: "Message sent successfully!" });
    } catch (err) {
      console.error(err);
      setFeedback({ type: "error", message: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* LEFT: Contact Info */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-sm font-mono text-primary tracking-wider uppercase block mb-4"
            >
              Get In Touch
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Let's build something{" "}
              <span className="text-gradient-accent">amazing together</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg mb-12"
            >
              Need help with cloud architecture or scaling infrastructure? Let's talk.
            </motion.p>

            {/* Contact Info */}
            {info && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4 mb-12"
              >
                <a
                  href={`mailto:${info.email}`}
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span>{info.email}</span>
                </a>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span>{info.location}</span>
                </div>
              </motion.div>
            )}

            {/* Socials */}
            {info && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-4"
              >
                {[
                  { icon: Github, href: info.github },
                  { icon: Linkedin, href: info.linkedin },
                  { icon: SiLeetcode, href: info.leetcode },
                ].map(({ icon: Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            )}
          </div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl bg-card border border-border space-y-4"
            >
              <input
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border"
              />
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border"
              />
              <textarea
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Message"
                required
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border"
              />

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground flex justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4" />
              </motion.button>

              {/* Animated Feedback */}
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className={`p-4 mt-2 rounded-lg text-white text-center font-medium ${
                    feedback.type === "success" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {feedback.message}
                </motion.div>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
