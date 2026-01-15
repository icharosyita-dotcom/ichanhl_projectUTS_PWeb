import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CameraSection({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setCameraError("");
    } catch (err) {
      setCameraError('Camera access denied or not available.');
    }
  };

  const captureAndAnalyze = () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsCapturing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let totalR = 0, totalG = 0, totalB = 0, count = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      totalR += data[i];
      totalG += data[i + 1];
      totalB += data[i + 2];
      count++;
    }
    
    const avgR = Math.round(totalR / count);
    const avgG = Math.round(totalG / count);
    const avgB = Math.round(totalB / count);

    setTimeout(() => {
      setIsCapturing(false);
      onCapture(imageData, { r: avgR, g: avgG, b: avgB });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold">Take Your Picture</h2>
        <p className="text-muted-foreground">Position your face in the camera frame</p>
        
        {cameraError ? (
          <Card className="p-8 bg-destructive/10">
            <p className="text-destructive">{cameraError}</p>
            <Button onClick={startCamera} className="mt-4">Try Again</Button>
          </Card>
        ) : (
          <>
            <div className="relative max-w-md mx-auto">
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-2xl shadow-2xl border-2 border-primary/20" />
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <Button size="lg" className="rounded-full px-8 py-6 text-lg" onClick={captureAndAnalyze} disabled={isCapturing}>
              {isCapturing ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Analyzing...</>
              ) : (
                <><Camera className="mr-2 h-5 w-5" />Take Picture & Analyze</>
              )}
            </Button>
            <p className="text-sm text-muted-foreground">Your photo is processed locally and never stored</p>
          </>
        )}
      </div>
    </div>
  );
}
