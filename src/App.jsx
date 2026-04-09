import React, { useState, useEffect, useRef } from "react";
import "./Birthday.css";

export default function UltraBirthdayApp() {
  const [name, setName] = useState("");
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const canvasRef = useRef(null);

  const capitalizeFirstLetter = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const message = `Happy Birthday ${capitalizeFirstLetter(name)} ❤️

Enjoy your day 🎉
May all your dreams comes true ✨`;

  // ✨ Typing effect
  useEffect(() => {
    if (step === 2) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(message.slice(0, i));
        i++;
        if (i > message.length) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [step, message]);

  // 🎆 Fireworks
  useEffect(() => {
    if (step !== 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function createFirework() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height / 2;

      for (let i = 0; i < 60; i++) {
        particles.push({
          x,
          y,
          angle: Math.random() * 2 * Math.PI,
          speed: Math.random() * 4 + 2,
          radius: 2
        });
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.speed *= 0.96;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${Math.random() * 360},100%,60%)`;
        ctx.fill();

        if (p.speed < 0.5) particles.splice(i, 1);
      });

      requestAnimationFrame(animate);
    }

    const interval = setInterval(createFirework, 800);
    animate();

    return () => clearInterval(interval);
  }, [step]);

  const handleUnlock = () => {
    if (name.trim() === "") {
      alert("Enter your name ❤️");
      return;
    }
    setStep(2);
  };

  return (
    <div className="container">

      {/* 🎆 Fireworks */}
      <canvas ref={canvasRef} className="fireworks"></canvas>

      {/* ❤️ Floating Hearts */}
      {step === 2 && (
        <div className="hearts">
          {[...Array(20)].map((_, i) => (
            <span key={i}>❤️</span>
          ))}
        </div>
      )}

      {/* STEP 0 */}
      {step === 0 && (
        <div className="input-section">
          <h1>
            💖 <span>Enter Your Name</span> 💖
          </h1>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
          />

          <button onClick={handleUnlock}>Unlock 💌</button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="message-section">

          {/* 📸 Image Scroll (FIXED WITH TOUCH) */}
          <div className="images">
  <div className={`images-track ${isPaused ? "paused" : ""}`}>
    {[
      "img1.jpeg","img2.jpeg","img3.jpeg","img4.jpeg","img5.jpeg",
      "img6.jpeg","img7.jpeg","img8.jpeg","img9.jpeg","img10.jpeg",

      // duplicate for smooth infinite scroll
      "img1.jpeg","img2.jpeg","img3.jpeg","img4.jpeg","img5.jpeg",
      "img6.jpeg","img7.jpeg","img8.jpeg","img9.jpeg","img10.jpeg"
    ].map((img, i) => (
      <img
        key={i}
        src={`/Deepikaimages/${img}`}   // ✅ correct path
        alt=""
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      />
    ))}
  </div>
</div>

          {/* ✨ Message */}
          <pre className="typed-text">{typedText}</pre>
        </div>
      )}
    </div>
  );
}