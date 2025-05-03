
import React from 'react';
import { cn } from '@/lib/utils';
import { Brain, AlertTriangle, CheckCircle } from 'lucide-react';

interface ClassificationResultProps {
  results: {
    class: string;
    confidence: number;
  }[];
  className?: string;
}

const ClassificationResult = ({ results, className }: ClassificationResultProps) => {
  // Determine the highest confidence result
  const highestConfidence = results.reduce((prev, current) => 
    current.confidence > prev.confidence ? current : prev, results[0]);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
          {highestConfidence.class === 'No Tumor' ? (
            <CheckCircle className="w-8 h-8 text-green-400" />
          ) : (
            <Brain className="w-8 h-8 text-purple-400" />
          )}
        </div>
        
        <h3 className="text-2xl font-semibold text-white mb-2">Analysis Results</h3>
        <div className="text-gray-400 text-sm max-w-sm">
          The AI has analyzed the MRI scan and classified the potential tumor type with confidence scores below.
        </div>
        
        <div className="mt-6 mb-2 py-3 px-6 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm">
          <div className="text-lg font-medium">
            {highestConfidence.class === 'No Tumor' ? (
              <span className="text-green-400">No Tumor Detected</span>
            ) : (
              <span>
                <span className="text-white">Primary Classification:</span>
                <span className="text-purple-300 ml-2">{highestConfidence.class}</span>
              </span>
            )}
          </div>
        </div>
        
        {highestConfidence.class !== 'No Tumor' && highestConfidence.confidence > 0.75 && (
          <div className="flex items-center gap-2 mt-2 text-amber-400 text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>High confidence tumor detection</span>
          </div>
        )}
      </div>

      <div className="space-y-4 bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10">
        {results.map((result, index) => (
          <div 
            key={result.class} 
            className="result-item space-y-2"
          >
            <div className="flex justify-between text-sm items-center">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  result.confidence > 0.5 ? "bg-purple-400" : "bg-gray-400"
                )}></div>
                <span className="text-gray-300 font-medium">{result.class}</span>
              </div>
              <span 
                className={cn(
                  "font-mono",
                  result.confidence > 0.5 ? "text-purple-400" : "text-gray-400"
                )}
              >
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
            
            <div className="h-2 bg-purple-950/50 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "progress-bar-fill h-full rounded-full",
                  result.confidence > 0.75 ? "bg-gradient-to-r from-purple-500 to-pink-500" :
                  result.confidence > 0.5 ? "bg-purple-500" : "bg-gray-600"
                )}
                style={{ width: `${result.confidence * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-500 pt-4">
        This analysis is provided for informational purposes only.
        <br />Always consult with a healthcare professional for medical diagnosis.
      </div>
    </div>
  );
};

export default ClassificationResult;
