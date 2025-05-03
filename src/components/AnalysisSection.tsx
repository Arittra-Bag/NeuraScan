import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ImagePreview from '@/components/ImagePreview';
import ClassificationResult from '@/components/ClassificationResult';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Brain, FileSearch, Scan, X, ArrowRight } from 'lucide-react';
import { analyzeMRIScan } from '@/lib/api';
import AIInsights from './AIInsights';

interface AnalysisResult {
  class: string;
  confidence: number;
}

const AnalysisSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [insightsKey, setInsightsKey] = useState(0);
  const [clearTrigger, setClearTrigger] = useState(0);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setResults(null);
      setError(null);
      
      toast({
        title: "Image uploaded successfully",
        description: "Your MRI scan is ready for analysis.",
        className: "bg-purple-900 border-purple-500 text-white",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);
    
    try {
      const analysisResults = await analyzeMRIScan(selectedImage);
      setResults(analysisResults);
      
      toast({
        title: "Analysis Complete",
        description: "The MRI scan has been successfully analyzed.",
        className: "bg-purple-900 border-purple-500 text-white",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      
      toast({
        title: "Analysis Failed",
        description: err instanceof Error ? err.message : 'An unexpected error occurred',
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setResults(null);
    setError(null);
    setClearTrigger(t => t + 1);
  };

  return (
    <div 
      className="py-20 bg-black relative z-10 min-h-screen flex items-center"
      id="analyze"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-pink-600/10 blur-[100px] rounded-full"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm mb-4">
            <div className="w-1 h-1 rounded-full bg-purple-400 mr-2"></div>
            AI Analysis Tool
          </div>
          <h2 className="text-4xl font-bold mb-6 px-2 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 leading-[1.15] overflow-visible">
            Analyze Your MRI Scan
          </h2>
          <p className="text-gray-400 text-lg">
            Upload your brain MRI scan and get instant, AI-powered classification results.
            Our system is trained to identify various types of brain tumors with high accuracy.
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <div className="space-y-6">
            {!selectedImage ? (
              <div className="animate-fade-in">
                <FileUpload onFileSelect={handleFileSelect} />
              </div>
            ) : (
              <div className="space-y-5">
                <div className="relative">
                  <ImagePreview 
                    imageUrl={selectedImage} 
                    className="aspect-square bg-black/40 rounded-xl"
                  />
                  <Button
                    onClick={handleClearImage}
                    className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-black/50"
                    variant="ghost"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex">
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing...
                      </>
                    ) : results ? (
                      <>
                        <Scan className="mr-2" />
                        Re-analyze
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2" />
                        Analyze Image
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-purple-500/10 relative overflow-hidden">
            {/* Tech overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            
            {results ? (
              <ClassificationResult results={results} />
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-gray-400 text-center p-6 relative z-10">
                <div className="w-24 h-24 mb-6 rounded-full flex items-center justify-center bg-purple-900/20 border border-purple-500/10">
                  <FileSearch className="w-12 h-12 text-purple-400/50" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-3">
                  {isAnalyzing ? "Analyzing Image..." : "No Analysis Yet"}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                  {isAnalyzing ? (
                    <>
                      <div className="flex justify-center mb-4">
                        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      Our AI model is currently analyzing your MRI scan. This typically takes a few seconds.
                    </>
                  ) : error ? (
                    <div className="text-red-400">{error}</div>
                  ) : (
                    "Upload and analyze an MRI scan to see the classification results. The system will identify potential brain tumors and provide confidence scores."
                  )}
                </p>
              </div>
            )}
            
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-purple-500/20"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-purple-500/20"></div>
          </div>
        </div>
        {/* AI Insights Section */}
        <div className="mt-12">
          {results && results.length > 0 ? (
            <AIInsights
              predictedClass={results[0].class}
              confidences={Object.fromEntries(results.map(r => [r.class, r.confidence]))}
              clearTrigger={clearTrigger}
            />
          ) : (
            <AIInsights predictedClass="" confidences={{}} clearTrigger={clearTrigger} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;
