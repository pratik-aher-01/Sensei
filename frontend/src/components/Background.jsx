import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    let t = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = `hsla(${(t + i * 72) % 360}, 80%, 60%, 0.6)`;
        ctx.beginPath();
        ctx.arc(
          width / 2 + Math.sin(t / 50 + i) * 200,
          height / 2 + Math.cos(t / 40 + i) * 200,
          250,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      t++;
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}
