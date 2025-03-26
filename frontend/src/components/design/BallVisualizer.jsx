import React, { useRef, useEffect, useState } from 'react';

const BallVisualizer = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const activityLevelRef = useRef(0);
  const smoothedActivityLevel = useRef(0);
  const [activityLevel, setActivityLevel] = useState(0);
  
  // Start visualization automatically
  const [isStarted, setIsStarted] = useState(true);

  // Microphone setup and audio processing
  useEffect(() => {
    if (!isStarted) return;

    let audioContext;
    let analyser;
    let microphone;
    let rafId;

    const handleSuccess = (stream) => {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const processAudio = () => {
        analyser.getByteTimeDomainData(dataArray);
        let sum = 0;
        
        // Calculate RMS (root mean square) of audio samples
        for (let i = 0; i < bufferLength; i++) {
          const value = (dataArray[i] - 128) / 128; // Normalize to [-1, 1]
          sum += value * value;
        }
        
        const rms = Math.sqrt(sum / bufferLength);
        // Increased sensitivity by scaling the factor from 200 to 300
        const newLevel = Math.min(rms * 300, 100); // Scale to 0-100 range with higher sensitivity
        setActivityLevel(newLevel);
        activityLevelRef.current = newLevel;
        rafId = requestAnimationFrame(processAudio);
      };

      rafId = requestAnimationFrame(processAudio);
    };

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(handleSuccess)
      .catch(error => {
        console.error('Microphone access error:', error);
        setIsStarted(false);
      });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (microphone) microphone.disconnect();
      if (audioContext) audioContext.close();
    };
  }, [isStarted]);

  // Canvas sizing and animation setup
  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  };

  const drawPurpleBall = (ctx, centerX, centerY, radius, activity) => {
    // Create main gradient for the ball - removed white shine
    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius
    );
    
    // Removed white highlight, keeping only purples
    gradient.addColorStop(0, 'rgba(150, 0, 255, 0.9)');
    gradient.addColorStop(0.6, 'rgba(120, 50, 220, 0.8)');
    gradient.addColorStop(1, 'rgba(75, 0, 130, 0.7)');

    // Dynamic glow effect based on activity
    ctx.shadowColor = 'rgba(150, 0, 255, 0.7)';
    ctx.shadowBlur = 100 + activity * 0.5;
    
    // Main ball
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw rings
    drawRings(ctx, centerX, centerY, radius, activity);
  };
  
  const drawRings = (ctx, centerX, centerY, radius, activity) => {
    // Number of rings based on activity level
    const numRings = 3 + Math.floor(activity / 20);
    
    for (let i = 0; i < numRings; i++) {
      const ringRadius = radius + 15 + (i * 15) + (activity * 0.2);
      const pulseEffect = Math.sin(Date.now() * 0.002 + i) * 5;
      
      ctx.beginPath();
      ctx.strokeStyle = `rgba(150, 0, 255, ${0.7 - (i * 0.1)})`;
      ctx.lineWidth = 3 + (activity * 0.05);
      ctx.arc(centerX, centerY, ringRadius + pulseEffect, 0, Math.PI * 2);
      ctx.stroke();
      
      // Add subtle glow to rings
      ctx.beginPath();
      ctx.strokeStyle = `rgba(200, 100, 255, ${0.3 - (i * 0.05)})`;
      ctx.lineWidth = 4 + (activity * 0.1);
      ctx.arc(centerX, centerY, ringRadius + pulseEffect + 2, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Smoothing algorithm (exponential moving average)
    smoothedActivityLevel.current += 
      (activityLevelRef.current - smoothedActivityLevel.current) * 0.1;

    ctx.clearRect(0, 0, width, height);
    
    const baseRadius = 50;
    const currentRadius = baseRadius + smoothedActivityLevel.current * 0.5;
    
    drawPurpleBall(
      ctx,
      width / 2,
      height / 2,
      currentRadius,
      smoothedActivityLevel.current
    );

    animationRef.current = requestAnimationFrame(animate);
  };

  // Lifecycle management
  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    if (isStarted) animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isStarted]);

  return (
    <div ref={containerRef} style={{ 
      height: '400px', 
      width: '100%', 
      position: 'relative'
    }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
};

export default BallVisualizer;