import React, { useEffect, useRef } from 'react';
import { floatElement, animateNeurons } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { Brain, ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      // Create neurons animation
      for (let i = 0; i < 12; i++) {
        const neuron = document.createElement('div');
        neuron.className = 'neuron';
        neuron.style.position = 'absolute';
        neuron.style.width = `${Math.random() * 12 + 5}px`;
        neuron.style.height = neuron.style.width;
        neuron.style.borderRadius = '50%';
        neuron.style.backgroundColor = `rgba(${Math.floor(Math.random() * 100 + 156)}, ${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 100 + 156)}, ${Math.random() * 0.6 + 0.2})`;
        neuron.style.top = `${Math.random() * 90}%`;
        neuron.style.left = `${Math.random() * 90}%`;
        neuron.style.boxShadow = `0 0 10px 2px rgba(${Math.floor(Math.random() * 100 + 156)}, ${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 100 + 156)}, 0.5)`;
        containerRef.current.appendChild(neuron);
      }
      
      // Start animations
      animateNeurons('.hero-container');
      floatElement('.brain-icon');
    }
  }, []);

  return (
    <div 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      id="home"
    >
      {/* Gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-purple-950 to-black z-0"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-600/10 blur-[100px] rounded-full z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-pink-600/10 blur-[100px] rounded-full z-0"></div>
      
      {/* Animated background elements */}
      <div ref={containerRef} className="hero-container absolute inset-0 z-0"></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              Next-Gen Medical Imaging Analysis
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Advanced
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Brain Tumor
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Classification
              </span>
            </h1>
            
            <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
              Experience unmatched precision in neurological diagnosis through our AI-powered
              classification system, designed for medical professionals seeking accurate and rapid analysis.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity text-lg py-6 px-8"
                onClick={() => {
                  const analyzeSection = document.getElementById('analyze');
                  if (analyzeSection) {
                    analyzeSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { value: '99.62%', label: 'Accuracy' },
                { value: '0.5s', label: 'Processing Time' },
                { value: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-3 rounded-xl bg-purple-900/20 border border-purple-500/10 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-purple-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative h-[200px] sm:h-[400px] lg:h-[500px] flex items-center justify-center w-full mb-8 lg:mb-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-[100px] rounded-full"></div>
            <div className="relative z-10 w-full h-full max-w-[250px] sm:max-w-[400px] max-h-[200px] sm:max-h-[400px]">
              <Brain className="brain-icon w-full h-full text-purple-400/80" />
            </div>
            {/* Connecting lines animation */}
            <div className="absolute inset-0 brain-network">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-[2px] h-[100px] bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0"
                  style={{
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${Math.random() * 3 + 3}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-black/50 w-full">
          <path fill="currentColor" fillOpacity="1" d="M0,128L48,138.7C96,149,192,171,288,176C384,181,480,171,576,144C672,117,768,75,864,80C960,85,1056,139,1152,149.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
