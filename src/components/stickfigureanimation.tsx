import React, { useRef, useEffect } from 'react';

interface StickFigureAnimationProps {
  weatherCondition: string;
}

const StickFigureAnimation: React.FC<StickFigureAnimationProps> = ({ weatherCondition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const stickFigureWithUmbrella = new Image();
    const stickFigureWithoutUmbrella = new Image();
    const grass = new Image();

    stickFigureWithUmbrella.src = '/stick_figure_with_umbrella.png';
    stickFigureWithoutUmbrella.src = '/stick_figure_without_umbrella.png';
    grass.src = '/grass.png';

    let imagesLoaded = 0;
    const checkImagesLoaded = () => {
      imagesLoaded += 1;
      if (imagesLoaded === 3) {
        render();
      }
    };

    stickFigureWithUmbrella.onload = checkImagesLoaded;
    stickFigureWithoutUmbrella.onload = checkImagesLoaded;
    grass.onload = checkImagesLoaded;

    let frame = 0;
    let animationId: number;

    const render = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = '#bfdbfe'; // TailwindCSS bg-blue-50
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grass at the bottom (make it smaller)
      const grassHeight = 70;
      ctx.drawImage(grass, 0, canvas.height - grassHeight, canvas.width, grassHeight);

      // Select the correct stick figure based on weather condition
      const stickFigure = (weatherCondition.includes('sunny') || weatherCondition.includes('rain') || weatherCondition.includes('haze') || weatherCondition.includes('drizzle'))
        ? stickFigureWithUmbrella
        : stickFigureWithoutUmbrella;

      // Draw stick figure (scaled down)
      const scaleFactor = 0.4; // Scale down by 50%
      const stickFigureWidth = stickFigure.width * scaleFactor;
      const stickFigureHeight = stickFigure.height * scaleFactor;
      const xPos = (frame % (canvas.width + stickFigureWidth)) - stickFigureWidth;
      const yPos = canvas.height - grassHeight - stickFigureHeight;
      ctx.drawImage(stickFigure, xPos, yPos, stickFigureWidth, stickFigureHeight);

      // Draw comic dialog cloud
      const dialogText = (weatherCondition.includes('sunny') || weatherCondition.includes('rain') || weatherCondition.includes('haze') || weatherCondition.includes('drizzle'))
        ? "Yes, you need an umbrella!"
        : "Oh, you don't need an umbrella today.";

      const dialogWidth = ctx.measureText(dialogText).width + 20;
      const dialogHeight = 40;
      const dialogX = xPos + stickFigureWidth / 2 - dialogWidth / 2;
      const dialogY = yPos - dialogHeight - 10;

      // Draw dialog bubble
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(dialogX + 10, dialogY);
      ctx.lineTo(dialogX + dialogWidth - 10, dialogY);
      ctx.quadraticCurveTo(dialogX + dialogWidth, dialogY, dialogX + dialogWidth, dialogY + 10);
      ctx.lineTo(dialogX + dialogWidth, dialogY + dialogHeight - 10);
      ctx.quadraticCurveTo(dialogX + dialogWidth, dialogY + dialogHeight, dialogX + dialogWidth - 10, dialogY + dialogHeight);
      ctx.lineTo(dialogX + 10, dialogY + dialogHeight);
      ctx.quadraticCurveTo(dialogX, dialogY + dialogHeight, dialogX, dialogY + dialogHeight - 10);
      ctx.lineTo(dialogX, dialogY + 10);
      ctx.quadraticCurveTo(dialogX, dialogY, dialogX + 10, dialogY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw dialog text
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.fillText(dialogText, dialogX + 10, dialogY + 25);

      frame++;
      animationId = requestAnimationFrame(render);
    };

    return () => cancelAnimationFrame(animationId);
  }, [weatherCondition]);

  return <canvas ref={canvasRef} width={800} height={600} className="w-full h-full"/>;
};

export default StickFigureAnimation;
