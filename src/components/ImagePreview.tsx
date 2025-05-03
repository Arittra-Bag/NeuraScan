import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { Scan } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  className?: string;
}

const ImagePreview = ({ imageUrl, className }: ImagePreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Load animation
  useEffect(() => {
    if (!isLoading && containerRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.7,
          ease: "power2.out"
        }
      );
    }
  }, [isLoading]);
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "relative rounded-xl overflow-hidden bg-black/30 group",
        className
      )}
    >
      {/* Hi-tech borders and overlay effects */}
      <div className="absolute inset-0 border border-purple-500/20 z-10 pointer-events-none"></div>
      <div className="absolute inset-[1px] border border-purple-500/10 rounded-xl z-10 pointer-events-none"></div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-400/60 rounded-tl-lg z-20"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400/60 rounded-tr-lg z-20"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400/60 rounded-bl-lg z-20"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-400/60 rounded-br-lg z-20"></div>
      
      {/* Tech overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#943299_0.5px,transparent_0.5px)] [background-size:10px_10px] opacity-20 mix-blend-screen z-10 pointer-events-none"></div>
      
      {/* Scanning effect */}
      {/* <div className="scan-line absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent transform z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div> */}
      

      
      {/* MRI image */}
      <img
        ref={imageRef}
        src={imageUrl}
        alt="MRI Scan"
        className={cn(
          "w-full h-full object-contain transition-all duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
      />
      
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm z-30">
          <div className="w-16 h-16 mb-4 relative">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/30"></div>
            <div className="absolute inset-0 rounded-full border-t-4 border-purple-500 animate-spin"></div>
          </div>
          <div className="text-purple-300 animate-pulse">Loading Scan</div>
        </div>
      )}
      
      {/* Simple loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-30">
          <div className="text-purple-300">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
