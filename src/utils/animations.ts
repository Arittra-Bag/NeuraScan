
import { gsap } from "gsap";

// Animation presets for motion elements
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.4 }
};

export const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5 }
};

// GSAP animation utilities
export const animateNeurons = (container: string) => {
  const neurons = document.querySelectorAll(`${container} .neuron`);
  
  gsap.to(neurons, {
    scale: 1.2,
    opacity: 0.8,
    duration: 2,
    stagger: 0.1,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });
};

export const animateWaves = (element: string) => {
  gsap.to(element, {
    backgroundPosition: '200% 50%',
    duration: 15,
    repeat: -1,
    ease: "none"
  });
};

export const pulseElement = (element: string) => {
  gsap.to(element, {
    scale: 1.05,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });
};

export const floatElement = (element: string) => {
  gsap.to(element, {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
};

export const animateProgress = (element: string, delay: number = 0) => {
  gsap.fromTo(
    element,
    { width: "0%" },
    { 
      width: "100%", 
      duration: 1.5, 
      delay, 
      ease: "power3.out" 
    }
  );
};
