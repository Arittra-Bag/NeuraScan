
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import App from './App.tsx';
import './index.css';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Add a loading animation before rendering the app
const renderApp = () => {
  createRoot(document.getElementById("root")!).render(<App />);
};

// Simulate a brief loading sequence
document.addEventListener('DOMContentLoaded', () => {
  // Create loading overlay
  const loadingOverlay = document.createElement('div');
  loadingOverlay.style.position = 'fixed';
  loadingOverlay.style.inset = '0';
  loadingOverlay.style.backgroundColor = 'black';
  loadingOverlay.style.display = 'flex';
  loadingOverlay.style.flexDirection = 'column';
  loadingOverlay.style.alignItems = 'center';
  loadingOverlay.style.justifyContent = 'center';
  loadingOverlay.style.zIndex = '9999';
  loadingOverlay.id = 'loading-overlay';
  
  // Create logo element
  const logo = document.createElement('div');
  logo.innerHTML = `<svg viewBox="0 0 24 24" width="80" height="80" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44l-.54-2.72a2.5 2.5 0 0 0-2.04-1.97l-1.89-.31A2.5 2.5 0 0 1 .5 12.5V12a2.5 2.5 0 0 1 2.45-2.5 2.5 2.5 0 0 0 2.45-2.96L5 5A2.5 2.5 0 0 1 7.5 2h2z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44l.54-2.72a2.5 2.5 0 0 1 2.04-1.97l1.89-.31A2.5 2.5 0 0 0 23.5 12.5V12a2.5 2.5 0 0 0-2.45-2.5 2.5 2.5 0 0 1-2.45-2.96L19 5A2.5 2.5 0 0 0 16.5 2h-2z"></path></svg>`;
  logo.style.color = '#a855f7';
  logo.style.marginBottom = '2rem';
  
  // Create loading text
  const loadingText = document.createElement('div');
  loadingText.textContent = 'NeuraScan';
  loadingText.style.fontSize = '24px';
  loadingText.style.fontWeight = '700';
  loadingText.style.color = 'white';
  loadingText.style.marginBottom = '1rem';
  
  // Create loading progress
  const loadingProgress = document.createElement('div');
  loadingProgress.style.width = '200px';
  loadingProgress.style.height = '2px';
  loadingProgress.style.backgroundColor = 'rgba(168, 85, 247, 0.3)';
  loadingProgress.style.position = 'relative';
  loadingProgress.style.overflow = 'hidden';
  
  const progressBar = document.createElement('div');
  progressBar.style.position = 'absolute';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.height = '100%';
  progressBar.style.width = '0%';
  progressBar.style.backgroundColor = '#a855f7';
  loadingProgress.appendChild(progressBar);
  
  // Add elements to overlay
  loadingOverlay.appendChild(logo);
  loadingOverlay.appendChild(loadingText);
  loadingOverlay.appendChild(loadingProgress);
  document.body.appendChild(loadingOverlay);
  
  // Animate progress bar
  gsap.to(progressBar, {
    width: '100%',
    duration: 1.5,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.to(loadingOverlay, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          document.body.removeChild(loadingOverlay);
          renderApp();
        }
      });
    }
  });
  
  // Animate logo
  gsap.to(logo, {
    scale: 1.1,
    duration: 1,
    repeat: 1,
    yoyo: true,
    ease: 'power2.inOut'
  });
});
