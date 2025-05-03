import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const TechShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current && modelRef.current) {
      // Animate the 3D model container
      gsap.fromTo(
        modelRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
      
      // Create rotating brain network animation
      gsap.to(".brain-model", {
        rotateY: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
      
      // Pulse animation for connection points
      gsap.to(".connection-point", {
        scale: 1.3,
        opacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "sine.inOut"
      });
      
      // Animate lines
      gsap.to(".connection-line", {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative bg-black overflow-hidden"
      id="research"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-600/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-pink-600/5 blur-[100px] rounded-full"></div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#943299_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm mb-4">
              <div className="w-1 h-1 rounded-full bg-purple-400 mr-2"></div>
              EfficientNet Architecture
            </div>
            
            <h2 className="text-4xl font-bold mb-6 px-2 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 leading-[1.15] overflow-visible">
              Advanced Neural Network for Medical Imaging
            </h2>
            
            <div className="space-y-6 text-gray-300">
              <p>
                Our brain tumor classification system leverages the power of EfficientNet, a revolutionary 
                neural network architecture that balances model depth, width, and resolution to achieve 
                superior accuracy while maintaining computational efficiency.
              </p>
              
              <div className="grid grid-cols-2 gap-4 py-4">
                {[
                  { label: "Classification Accuracy", value: "99.62%" },
                  { label: "Training Dataset Size", value: "10,000+" },
                  { label: "Model Parameters", value: "4.05M" },
                  { label: "Inference Time", value: "0.5s" }
                ].map((stat, i) => (
                  <div key={i} className="bg-purple-900/20 border border-purple-500/10 p-4 rounded-lg">
                    <div className="text-sm text-purple-300">{stat.label}</div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>
              
              <p>
                Trained on over 10K+ MRI scans across various demographic groups, our model 
                excels at identifying and differentiating between gliomas, meningiomas, pituitary tumors,
                and non-tumor conditions with minimal false positives.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://drive.google.com/file/d/1xFGxOmINxmZwQFLCdb-FzrlCGBpIl_Ir/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90">
                    Technical Documentation
                  </Button>
                </a>
              </div>
            </div>
          </div>
          
          {/* 3D Model visualization */}
          <div ref={modelRef} className="relative">
            <div className="aspect-square max-w-[500px] mx-auto relative">
              {/* Brain model container */}
              <div className="brain-model absolute inset-0 perspective-1000">
                {/* Brain outline */}
                <div className="absolute inset-0 border-[2px] border-purple-400/30 rounded-full"></div>
                <div className="absolute inset-[15%] border-[2px] border-purple-400/20 rounded-full"></div>
                <div className="absolute inset-[30%] border-[2px] border-purple-400/10 rounded-full"></div>
                
                {/* Connection points */}
                {[...Array(20)].map((_, i) => {
                  const angle = (Math.PI * 2 / 20) * i;
                  const radius = 45 + Math.random() * 30;
                  const x = 50 + Math.cos(angle) * radius;
                  const y = 50 + Math.sin(angle) * radius;
                  const size = 3 + Math.random() * 5;
                  
                  return (
                    <div
                      key={i}
                      className="connection-point absolute rounded-full bg-purple-400"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${x}%`,
                        top: `${y}%`,
                        boxShadow: `0 0 10px 2px rgba(156, 39, 176, 0.5)`,
                      }}
                    ></div>
                  );
                })}
                
                {/* SVG connections */}
                <svg width="100%" height="100%" className="absolute inset-0">
                  {[...Array(15)].map((_, i) => {
                    const startPoint = {
                      x: 50 + (Math.cos(Math.PI * 2 * (i / 15)) * 40),
                      y: 50 + (Math.sin(Math.PI * 2 * (i / 15)) * 40)
                    };
                    
                    const endPoint = {
                      x: 50 + (Math.cos(Math.PI * 2 * ((i + 7) / 15)) * 40),
                      y: 50 + (Math.sin(Math.PI * 2 * ((i + 7) / 15)) * 40)
                    };
                    
                    const pathLength = Math.sqrt(
                      Math.pow(endPoint.x - startPoint.x, 2) + 
                      Math.pow(endPoint.y - startPoint.y, 2)
                    );
                    
                    return (
                      <path
                        key={i}
                        d={`M${startPoint.x}% ${startPoint.y}% Q50% 50%, ${endPoint.x}% ${endPoint.y}%`}
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="1"
                        className="connection-line"
                        style={{
                          strokeDasharray: pathLength,
                          strokeDashoffset: pathLength
                        }}
                      />
                    );
                  })}
                  
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9C27B0" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#E91E63" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#9C27B0" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Center brain representation */}
                <div className="absolute inset-[35%] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-2/3 h-2/3 bg-purple-400/20 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-[50px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;
