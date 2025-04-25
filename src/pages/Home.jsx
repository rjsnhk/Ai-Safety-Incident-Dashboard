import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import "./Home.css";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Hero from "../components/Hero";
import NavHome from "../components/NavHome";

const Home = () => {
  
  const { theme } = useTheme();

  useEffect(() => {
    // Create matrix rain animation
    const canvas = document.getElementById("matrix-bg");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to display
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const charArray = chars.split("");

    // Column settings
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Initialize drops at random positions
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor((Math.random() * canvas.height) / fontSize);
    }

    // Draw the matrix rain
    function draw() {
      // Set semi-transparent black background to create trail effect
      ctx.fillStyle = theme === "dark" ? "rgba(0, 0, 0, 0.05)" : "rgba(240, 240, 240, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text color and font
      ctx.fillStyle = theme === "dark" ? "#0f0" : "#006400";
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Move drop down
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    // Animation loop
    const interval = setInterval(draw, 35);

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <div className={`landing-page ${theme}`}>
      <canvas id="matrix-bg" className="matrix-background"></canvas>
      <div className="content-overlay">
      <NavHome />
       <Hero />
      <Features />
       <Footer />
      </div>
    </div>
  );
}

export default Home
