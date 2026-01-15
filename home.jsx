import { useState } from "react";
import WelcomeSection from "@/components/WelcomeSection";
import CameraSection from "@/components/CameraSection";
import ResultsSection from "@/components/ResultsSection";
import ShoppingCart from "@/components/ShoppingCart";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { classifyUndertone, findClosestMatch, getRecommendations, type HijabRecommendation } from "@/lib/skinAnalysis";
import type { Undertone } from "@shared/schema";

type AppState = 'welcome' | 'camera' | 'results' | 'cart';

export default function Home() {
  const [state, setState] = useState<AppState>('welcome');
  const [undertone, setUndertone] = useState<Undertone>('Neutral');
  const [recommendations, setRecommendations] = useState<HijabRecommendation[]>([]);
  const [cartItems, setCartItems] = useState<HijabRecommendation[]>([]);

  const handleStartAnalysis = () => {
    setState('camera');
  };

  const handleCapture = (imageData: ImageData, avgRGB: { r: number; g: number; b: number }) => {
    const detectedUndertone = classifyUndertone(avgRGB.r, avgRGB.g, avgRGB.b);
    const closestMatch = findClosestMatch(avgRGB.r, avgRGB.g, avgRGB.b, detectedUndertone);
    const recs = getRecommendations(closestMatch);
    
    setUndertone(detectedUndertone);
    setRecommendations(recs);
    setState('results');
  };

  const handleAddToCart = (recommendation: HijabRecommendation) => {
    if (!cartItems.find(item => item.id === recommendation.id)) {
      setCartItems([...cartItems, recommendation]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    const searchQuery = cartItems.map(item => item.colorName).join(' ');
    window.open(`https://shopee.com/search?keyword=hijab ${encodeURIComponent(searchQuery)}`, '_blank');
  };

  const handleBackToStart = () => {
    setState('welcome');
    setCartItems([]);
  };

  return (
    <div className="min-h-screen">
      {(state === 'camera' || state === 'results' || state === 'cart') && (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Button variant="ghost" onClick={handleBackToStart}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Start Over
            </Button>
            
            <h1 className="font-serif italic text-xl md:text-2xl text-primary">
              Hijabrn Skin Analyst
            </h1>
            
            <Button variant="ghost" className="relative" onClick={() => setState('cart')}>
              <ShoppingCartIcon className="h-5 w-5" />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
          </div>
        </header>
      )}

      {state === 'welcome' && <WelcomeSection onStartAnalysis={handleStartAnalysis} />}
      {state === 'camera' && <CameraSection onCapture={handleCapture} />}
      {state === 'results' && (
        <ResultsSection undertone={undertone} recommendations={recommendations} onAddToCart={handleAddToCart} />
      )}
      {state === 'cart' && (
        <ShoppingCart items={cartItems} onRemoveItem={handleRemoveFromCart} onCheckout={handleCheckout} />
      )}
    </div>
  );
}
