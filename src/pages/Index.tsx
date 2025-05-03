
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import TechShowcase from '@/components/TechShowcase';
import AnalysisSection from '@/components/AnalysisSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  // Initialize global animations and scroll behaviors
  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: target,
              offsetY: 80
            },
            ease: "power3.inOut"
          });
        }
      });
    });
    
    // Parallax effect for background elements
    gsap.utils.toArray('.parallax-bg').forEach((bg: any) => {
      gsap.to(bg, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: bg.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
    
    // Fade in animations for sections
    gsap.utils.toArray('section').forEach((section: any, i) => {
      const sectionElems = section.querySelectorAll('.animate-on-scroll');
      
      if (sectionElems.length) {
        gsap.fromTo(sectionElems, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            }
          }
        );
      }
    });
    
    // Add a classy cursor effect
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.position = 'fixed';
    cursorDot.style.width = '8px';
    cursorDot.style.height = '8px';
    cursorDot.style.backgroundColor = 'rgba(168, 85, 247, 0.7)';
    cursorDot.style.borderRadius = '50%';
    cursorDot.style.pointerEvents = 'none';
    cursorDot.style.zIndex = '9999';
    cursorDot.style.transition = 'transform 0.1s ease';
    document.body.appendChild(cursorDot);
    
    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    cursorRing.style.position = 'fixed';
    cursorRing.style.width = '24px';
    cursorRing.style.height = '24px';
    cursorRing.style.border = '1px solid rgba(168, 85, 247, 0.3)';
    cursorRing.style.borderRadius = '50%';
    cursorRing.style.pointerEvents = 'none';
    cursorRing.style.zIndex = '9999';
    cursorRing.style.transition = 'width 0.2s, height 0.2s, transform 0.3s ease';
    document.body.appendChild(cursorRing);
    
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursorDot, { 
        x: e.clientX - 4, 
        y: e.clientY - 4,
        duration: 0.1
      });
      
      gsap.to(cursorRing, { 
        x: e.clientX - 12, 
        y: e.clientY - 12,
        duration: 0.3
      });
    });
    
    document.addEventListener('mousedown', () => {
      gsap.to(cursorDot, { scale: 1.5, duration: 0.2 });
      gsap.to(cursorRing, { scale: 0.8, duration: 0.2 });
    });
    
    document.addEventListener('mouseup', () => {
      gsap.to(cursorDot, { scale: 1, duration: 0.2 });
      gsap.to(cursorRing, { scale: 1, duration: 0.2 });
    });
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(cursorRing, { width: 40, height: 40, x: '-25%', y: '-25%', borderColor: 'rgba(168, 85, 247, 0.7)', duration: 0.3 });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(cursorRing, { width: 24, height: 24, x: 0, y: 0, borderColor: 'rgba(168, 85, 247, 0.3)', duration: 0.3 });
      });
    });
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', () => {});
      document.removeEventListener('mousedown', () => {});
      document.removeEventListener('mouseup', () => {});
      document.body.removeChild(cursorDot);
      document.body.removeChild(cursorRing);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <Hero />
      <Features />
      <TechShowcase />
      <AnalysisSection />
      <Footer />
      
      {/* Fixed gradient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black via-purple-950/20 to-black pointer-events-none"></div>
    </div>
  );
};

export default Index;
