import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function WelcomeSection({ onStartAnalysis }) {
  const [displayText, setDisplayText] = useState("");
  const fullText = "HIJABRN SKIN ANALYST";
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-pink-50/50 to-background">
      <div className="text-center max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-serif italic text-primary mb-4">Welcome</h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary min-h-[1.2em] flex items-center justify-center">
          <span className="inline-block">
            {displayText}
            {!isTypingComplete && <span className="inline-block w-1 h-[0.9em] bg-primary ml-1 animate-pulse" />}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover your skin undertone and get personalized hijab color recommendations.
        </p>
        <Button size="lg" className="rounded-full px-8 py-6 text-lg" onClick={onStartAnalysis}>
          Start Analysis
        </Button>
      </div>
    </div>
  );
}
