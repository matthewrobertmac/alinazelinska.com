import React, { useEffect, useState, useRef, useCallback } from 'react';
import { floatingWords } from '../data/content';

const FloatingWords = () => {
  const [words, setWords] = useState([]);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const wordsRef = useRef([]);
  const [pausedWords, setPausedWords] = useState(new Set());

  const getRandomWord = useCallback(() => {
    return floatingWords[Math.floor(Math.random() * floatingWords.length)];
  }, []);

  const createWord = useCallback(() => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      text: getRandomWord(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.05, // Increased from 0.03 to 0.05 for faster movement
      vy: (Math.random() - 0.5) * 0.05, // Increased from 0.03 to 0.05
      opacity: Math.random() * 0.3 + 0.25, // Slightly more visible
      baseSize: Math.random() * 14 + 16,
      scale: 1,
      scaleDirection: Math.random() > 0.5 ? 1 : -1,
      scaleSpeed: Math.random() * 0.003 + 0.002, // Increased for more noticeable pulse
      rotation: (Math.random() - 0.5) * 60, // -30 to +30 degrees
      rotationSpeed: (Math.random() - 0.5) * 0.15, // Slightly faster rotation
      pulsePhase: Math.random() * Math.PI * 2, // For smooth sinusoidal pulsing
    };
  }, [getRandomWord]);

  const handleWordClick = useCallback((wordId, event) => {
    // Prevent default touch behavior
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    setPausedWords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(wordId)) {
        newSet.delete(wordId);
      } else {
        newSet.add(wordId);
      }
      return newSet;
    });
  }, []);

  useEffect(() => {
    // Initialize with some words
    const initialWords = Array.from({ length: 25 }, createWord);
    wordsRef.current = initialWords;
    setWords(initialWords);

    // Add new words periodically
    const addWordInterval = setInterval(() => {
      if (wordsRef.current.length < 30) {
        const newWord = createWord();
        wordsRef.current = [...wordsRef.current, newWord];
        setWords([...wordsRef.current]);
      } else {
        // Remove oldest word and add new one
        const oldestNonPaused = wordsRef.current.find((w) => !pausedWords.has(w.id));
        if (oldestNonPaused) {
          wordsRef.current = wordsRef.current.filter((w) => w.id !== oldestNonPaused.id);
          wordsRef.current = [...wordsRef.current, createWord()];
          setWords([...wordsRef.current]);
        }
      }
    }, 2500);

    // Animation loop
    const animate = () => {
      wordsRef.current = wordsRef.current.map((word) => {
        // Skip animation if word is paused
        if (pausedWords.has(word.id)) {
          return word;
        }

        let { x, y, vx, vy, scale, pulsePhase, rotation, rotationSpeed } = word;

        // Update position with smoother interpolation
        x += vx;
        y += vy;

        // Smooth bounce off edges with damping
        if (x <= 0 || x >= 100) {
          vx = -vx * 0.98; // Slight damping for smoother bounce
          x = Math.max(0, Math.min(100, x));
        }
        if (y <= 0 || y >= 100) {
          vy = -vy * 0.98; // Slight damping
          y = Math.max(0, Math.min(100, y));
        }

        // Smooth sinusoidal pulsing effect (more natural than linear)
        pulsePhase += 0.02; // Controls pulse speed
        scale = 1 + Math.sin(pulsePhase) * 0.15; // Oscillates between 0.85 and 1.15

        // Update rotation - constrained to -30 to +30 degrees
        rotation += rotationSpeed;
        // Bounce back when reaching limits (keeps words upright)
        if (rotation >= 30 || rotation <= -30) {
          rotationSpeed = -rotationSpeed;
          rotation = Math.max(-30, Math.min(30, rotation));
        }

        return { ...word, x, y, vx, vy, scale, pulsePhase, rotation, rotationSpeed };
      });

      setWords([...wordsRef.current]);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      clearInterval(addWordInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [createWord, pausedWords]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-0"
      style={{ opacity: 0.7 }}
    >
      {words.map((word) => {
        const isPaused = pausedWords.has(word.id);
        return (
          <div
            key={word.id}
            onClick={(e) => handleWordClick(word.id, e)}
            onTouchStart={(e) => handleWordClick(word.id, e)}
            className={`absolute font-sans select-none cursor-pointer touch-manipulation ${
              isPaused ? '' : 'transition-transform duration-100 ease-out'
            }`}
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              fontSize: `${word.baseSize}px`,
              opacity: isPaused ? 1 : word.opacity,
              transform: `translate(-50%, -50%) scale(${isPaused ? 1.4 : word.scale}) rotate(${word.rotation}deg)`,
              color: isPaused ? '#FFD700' : 'var(--color-accent)',
              willChange: isPaused ? 'none' : 'transform',
              textShadow: isPaused
                ? '0 0 20px rgba(255, 215, 0, 0.9), 0 0 40px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3)'
                : '0 2px 10px rgba(255, 145, 164, 0.3)',
              fontWeight: isPaused ? '800' : '500',
              zIndex: isPaused ? 20 : 1,
              pointerEvents: 'auto',
              filter: isPaused ? 'brightness(1.3) drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' : 'none',
              WebkitTapHighlightColor: 'transparent',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              transition: isPaused 
                ? 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' // Bouncy transition when paused
                : 'opacity 0.1s ease-out',
            }}
          >
            {word.text}
          </div>
        );
      })}
      
      {/* Instruction hint - fades out after 8 seconds */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
        style={{
          animation: 'fadeOut 2s ease-in-out 8s forwards',
          opacity: 0.6,
        }}
      >
        <p className="text-sm text-[var(--color-accent)] font-medium">
          ✨ Click on any word to pause and highlight it ✨
        </p>
      </div>
      
      <style jsx>{`
        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingWords;
