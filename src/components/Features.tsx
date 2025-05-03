import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, Activity, FileSearch, Database, 
  Shield, BarChart, Clock, Cloud
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      const features = sectionRef.current.querySelectorAll('.feature-card');
      
      gsap.fromTo(features, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Advanced AI Model",
      description: "Utilizes state-of-the-art deep learning architecture for accurate detection and classification of brain tumors."
    },
    {
      icon: Activity,
      title: "Real-time Analysis",
      description: "Process MRI scans instantly with our high-performance computing infrastructure for immediate results."
    },
    {
      icon: Clock,
      title: "Time Efficiency",
      description: "Reduce diagnosis time from hours to seconds, helping medical professionals make faster decisions."
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "All data is processed with end-to-end encryption and in compliance with medical data regulations."
    },
    {
      icon: FileSearch,
      title: "Multiple Format Support",
      description: "Compatible with various imaging formats including JPEG, PNG and more specialized medical formats."
    },
    {
      icon: BarChart,
      title: "Detailed Reports",
      description: "Generate comprehensive, easy-to-understand reports with confidence scores and visualizations."
    },
    {
      icon: Cloud,
      title: "Cloud Integration (Proposed)",
      description: "Seamlessly integrate with existing hospital information systems and cloud storage solutions."
    },
    {
      icon: Database,
      title: "Continuous Learning (Proposed)",
      description: "I hope to continuously improve my model through federated learning with anonymized data."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-black relative z-10"
      id="technology"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm mb-4">
            <div className="w-1 h-1 rounded-full bg-purple-400 mr-2"></div>
            Advanced Features
          </div>
          <h2 className="text-4xl font-bold mb-6 px-2 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 leading-[1.15] overflow-visible">
            Emerging Technology
          </h2>
          <p className="text-gray-400 text-lg">
            Our platform combines the latest advancements in artificial intelligence and 
            medical imaging to deliver unparalleled accuracy in brain tumor classification.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 rounded-lg bg-purple-900/50 flex items-center justify-center mb-5 relative z-10 group-hover:bg-purple-800/50 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 relative z-10">
                {feature.description}
              </p>
              
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-500/5 rounded-tl-full transform translate-y-1/2 translate-x-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
