
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-md' : ''}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-teal-500">
              scrumless<span className="text-white">.ai</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-foreground/80 hover:text-teal-500 transition-colors">Features</Link>
            <Link to="/product-tour" className="text-foreground/80 hover:text-teal-500 transition-colors">Product Tour</Link>
            <Link to="/pricing" className="text-foreground/80 hover:text-teal-500 transition-colors">Pricing</Link>
            <Link to="/blog" className="text-foreground/80 hover:text-teal-500 transition-colors">Resources</Link>
            <Link to="/login">
              <Button variant="ghost" className="text-foreground hover:bg-teal-500/20 border border-transparent hover:border-teal-500/50">
                Login
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-teal-500 hover:bg-teal-400 text-black font-medium neon-glow">
                Try Free
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/features" className="py-2 text-foreground/80" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
            <Link to="/product-tour" className="py-2 text-foreground/80" onClick={() => setIsMobileMenuOpen(false)}>Product Tour</Link>
            <Link to="/pricing" className="py-2 text-foreground/80" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
            <Link to="/blog" className="py-2 text-foreground/80" onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-teal-500 hover:bg-teal-400 text-black font-medium">
                Try Free
              </Button>
            </Link>
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full border-teal-500/50 text-foreground">
                Login
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
