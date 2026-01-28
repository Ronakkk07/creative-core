import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="section-padding pt-12 pb-8 border-t border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold font-display text-gradient-accent">JD</span>
            <p className="text-sm text-muted-foreground">
              © {currentYear} All rights reserved.
            </p>
          </div>
          
          {/* Made with love */}
          <motion.p
            className="flex items-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Crafted with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </motion.span>{" "}
            and lots of coffee
          </motion.p>
          
          {/* Back to top */}
          <motion.a
            href="#"
            className="px-4 py-2 rounded-full bg-secondary text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ y: -2 }}
          >
            Back to top ↑
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;