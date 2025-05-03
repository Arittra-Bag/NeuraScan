import React, { useState, useEffect } from 'react';
import { Menu, Brain, User, Info, FileSearch, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10 py-3 md:py-6",
      // Match temp.txt: glass effect and single bottom border
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              NeuraScan
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {["Home", "Technology", "Research", "Contact"].map((item) => (
              <a
                key={item}
                href={item === "Contact" ? "#footer" : `#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </nav>

          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu />
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden fixed inset-x-0 bg-black/80 backdrop-blur-lg transition-all duration-300 overflow-hidden backdrop-saturate-150",
          mobileMenuOpen ? "max-h-[500px] p-5 shadow-xl" : "max-h-0"
        )}>
          <div className="flex flex-col gap-2 mt-4">
            {[
              { name: 'Home', icon: <Brain className="w-4 h-4" /> },
              { name: 'Technology', icon: <Settings className="w-4 h-4" /> },
              { name: 'Research', icon: <FileSearch className="w-4 h-4" /> },
              { name: 'Contact', icon: <User className="w-4 h-4" /> }
            ].map((item) => (
              <a
                key={item.name}
                href={item.name === "Contact" ? "#footer" : `#${item.name.toLowerCase()}`}
                className="flex items-center gap-3 p-3 rounded-md text-gray-300 hover:bg-purple-500/20 hover:text-white transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
