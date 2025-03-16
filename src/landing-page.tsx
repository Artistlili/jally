"use client"

import "./index.css";
import { useEffect, useRef } from "react"; // Added missing hooks
import { NavLink } from "react-router-dom"; // Fixed router import
import { Button } from "./components/ui/button";

function LandingPage() { // Fixed component name (capitalized)
  const canvasEndDisplay = useRef<HTMLCanvasElement>(null); // Added ref declaration

  // Handle null case for localStorage data
  const frequencyData = JSON.parse(localStorage.getItem("Frequency data") || "[]");

  const drawEndDisplay = async () => {
    const canvas = canvasEndDisplay.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;
    
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const draw = () => {
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "#00FF00";
      canvasCtx.beginPath();

      for (let i = 0; i < frequencyData.length; i++) {
        const frame = frequencyData[i];
        for (let j = 0; j < frame.length; j++) {
          const x = (j / frame.length) * WIDTH;
          const y = (frame[j] / 255) * HEIGHT;
          
          if (i === 0 && j === 0) {
            canvasCtx.moveTo(x, HEIGHT / 2);
          } else {
            canvasCtx.lineTo(x, y);
          }
        }
      }
      canvasCtx.stroke();
      requestAnimationFrame(draw);
    };

    draw();
  };

  // Added useEffect to trigger drawing on mount
  useEffect(() => {
    drawEndDisplay();
  }, []);

  return (
    <div className="Column">
      <NavLink to="/NewRec" className="absolute top-14 right-4">
        <Button className="text-[20px] font-semibold" variant="outline">
          New Recording
        </Button>
      </NavLink>
      <div className="text-7xl font-bold font-serif flex grow-10 mx-6 my-4 mt-10">
        VaporMIC
      </div>
      {/* Added canvas element */}
      <canvas 
        ref={canvasEndDisplay} 
        width={800} 
        height={400}
        className="mx-auto my-4"
      />
    </div>
  );
}

export default LandingPage;