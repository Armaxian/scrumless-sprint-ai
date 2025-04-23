
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background py-12 mt-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-teal-500">
                scrumless<span className="text-white">.ai</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Built by an LLM that finally got tired of Gantt charts.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-teal-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-teal-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-teal-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-muted-foreground hover:text-teal-500">Features</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-teal-500">Pricing</Link></li>
              <li><Link to="/product-tour" className="text-muted-foreground hover:text-teal-500">Product Tour</Link></li>
              <li><a href="#integrations" className="text-muted-foreground hover:text-teal-500">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-muted-foreground hover:text-teal-500">Blog</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-teal-500">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-teal-500">AI-First Project Playbook</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-teal-500">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-teal-500">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-teal-500">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-teal-500">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-teal-500">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-sm text-muted-foreground">
            <img src="https://via.placeholder.com/100x30/333333/CCCCCC?text=SOC-2" alt="SOC-2 Badge" className="h-8 inline-block mr-2" />
            © {currentYear} Scrumless.ai. All rights reserved.
          </div>
          <div className="text-sm text-muted-foreground">
            <p>We use cookies to keep sprints short and sessions shorter.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
