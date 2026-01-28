import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });
  
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="container-custom px-6 md:px-12 lg:px-24">
          <div
            className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 ${
              isScrolled ? "glass" : ""
            }`}
          >
            {/* Logo */}
            <motion.a
              href="#"
              className="text-xl font-bold font-display"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-gradient-accent">JD</span>
            </motion.a>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* CTA Button */}
            <motion.a
              href="#contact"
              className="hidden md:inline-flex px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Talk
            </motion.a>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-foreground"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { x: 0 } : { x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 md:hidden"
      >
        <div className="absolute inset-0 bg-background">
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-12">
              <span className="text-xl font-bold font-display text-gradient-accent">JD</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-1">
              <ul className="space-y-6">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-3xl font-bold hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            
            <motion.a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="w-full py-4 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-center"
            >
              Let's Talk
            </motion.a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;