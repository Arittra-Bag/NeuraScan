import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import gsap from 'gsap';

interface AIInsightsProps {
  predictedClass: string;
  confidences: Record<string, number>;
  clearTrigger: number;
}

const AIInsights: React.FC<AIInsightsProps> = ({ predictedClass, confidences, clearTrigger }) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const prevPredictedClass = useRef<string | null>(null);
  const prevConfidences = useRef<Record<string, number> | null>(null);
  const animRef = useRef<HTMLDivElement>(null);

  // Reset state when clearTrigger changes
  useEffect(() => {
    setInsights(null);
    setLoading(false);
    setError(null);
    setExpanded(false);
  }, [clearTrigger]);

  useEffect(() => {
    const confidencesChanged =
      JSON.stringify(confidences) !== JSON.stringify(prevConfidences.current);
    if (
      !predictedClass ||
      !confidences ||
      (predictedClass === prevPredictedClass.current && !confidencesChanged)
    ) {
      return;
    }
    setLoading(true);
    setError(null);
    setInsights(null);
    prevPredictedClass.current = predictedClass;
    prevConfidences.current = confidences;
    fetch('https://cortex-visual-insight.onrender.com/api/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ predicted_class: predictedClass, confidences }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch AI insights');
        return res.json();
      })
      .then(data => setInsights(data.insights))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [predictedClass, confidences]);

  // GSAP animation for loading
  useEffect(() => {
    if (loading && animRef.current) {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(animRef.current, { scale: 1.2, opacity: 0.7, duration: 0.5, ease: 'power1.inOut' })
        .to(animRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'power1.inOut' });
      return () => { tl.kill(); };
    }
  }, [loading]);

  // Helper to get preview lines
  const getPreview = (text: string, lines: number) => {
    const split = text.split(/\r?\n/);
    if (split.length <= lines) return text;
    return split.slice(0, lines).join('\n') + '\n...';
  };

  // Helper to render lines with purple headings inside a <pre>
  const renderPreWithHeadings = (text: string) => {
    const lines = text.split(/\r?\n/);
    return (
      <pre className="whitespace-pre-wrap text-gray-200 mt-2 transition-all duration-300">
        {lines.map((line, idx) => {
          const isHeading =
            /^\d+\./.test(line.trim()) ||
            line.trim() === 'MRI Brain Scan Analysis Report' ||
            (line.trim() && line.trim() === line.trim().toUpperCase() && line.trim().length > 5);
          return isHeading ? (
            <span key={idx} className="text-purple-400 font-semibold">{line + '\n'}</span>
          ) : (
            <span key={idx}>{line + '\n'}</span>
          );
        })}
      </pre>
    );
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-purple-500/10 relative overflow-hidden min-h-[200px]">
      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500">AI Insights</h2>
      {loading && (
        <div className="flex flex-col items-center justify-center py-8">
          <div ref={animRef} className="mb-2">
            <Sparkles className="w-10 h-10 text-purple-400" />
          </div>
          <div className="text-purple-400 font-medium">Generating AI insights...</div>
        </div>
      )}
      {error && <div className="text-red-400">{error}</div>}
      {insights && (
        <>
          {expanded ? renderPreWithHeadings(insights) : renderPreWithHeadings(getPreview(insights, 5))}
          <button
            className="flex items-center gap-1 mt-4 text-purple-400 hover:text-purple-200 transition-colors text-sm font-medium focus:outline-none"
            onClick={() => setExpanded(e => !e)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Show more'}
            {expanded ? <ChevronUp className="w-4 h-4 transition-transform" /> : <ChevronDown className="w-4 h-4 transition-transform" />}
          </button>
        </>
      )}
      {!loading && !error && !insights && (
        <div className="text-gray-400">Upload an MRI image to generate AI insights</div>
      )}
    </div>
  );
};

export default AIInsights; 