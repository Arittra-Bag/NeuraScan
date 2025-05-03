import React from 'react';
import { Brain, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="footer" className="bg-black/50 backdrop-blur-sm border-t border-purple-500/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                NeuraScan
              </span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Advanced medical imaging solutions powered by artificial intelligence to improve diagnostic accuracy.
            </p>
            <div className="flex gap-4 pt-2">
              <a 
                href="mailto:arittrabag@gmail.com" 
                className="w-10 h-10 rounded-full bg-purple-900/20 flex items-center justify-center hover:bg-purple-500/30 transition-colors"
              >
                <Mail className="w-5 h-5 text-purple-400" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://neura-scan.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  NeuraScan AI
                </a>
              </li>
              <li>
                <a href="https://dementiadreamscape.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Dementia Dreamscape
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://drive.google.com/file/d/1xFGxOmINxmZwQFLCdb-FzrlCGBpIl_Ir/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-purple-400 transition-colors">
                  API Reference (Coming Soon)
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col h-full justify-center">
            <div className="p-4 rounded-lg border-2 border-purple-500/40 bg-gradient-to-r from-purple-900/30 to-pink-900/20">
              <div className="text-lg font-bold text-purple-300 mb-1">Important Notice</div>
              <div className="text-gray-200 text-sm">
                This tool is for educational and research purposes only. It is not a substitute for professional medical diagnosis or advice.
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Arittra Bag. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
