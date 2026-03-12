import React, { useEffect, useState, useRef, useCallback } from 'react';
import { floatingWords } from '../data/content';

const FloatingWords = () => {
  const [words, setWords] = useState([]);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const wordsRef = useRef([]);
  const pausedWordsRef = useRef(new Set()); // Use ref instead of state for animation loop
  const [pausedWordsState, setPausedWordsState] = useState(new Set()); // Keep state for re-renders

  const getRandomWord = useCallback(() => {
    return floatingWords[Math.floor(Math.random() * floatingWords.length)];
  }, []);

  const createWord = useCallback(() => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      text: getRandomWord(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.05,
      vy: (Math.random() - 0.5) * 0.05,
      opacity: Math.random() * 0.3 + 0.25,
      baseSize: Math.random() * 14 + 16,
      scale: 1,
      rotation: (Math.random() - 0.5) * 60,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      pulsePhase: Math.random() * Math.PI * 2,
    };
  }, [getRandomWord]);

  const handleWordClick = useCallback((wordId, event) => {
    // Prevent default behavior and stop propagation
    event.preventDefault();
    event.stopPropagation();
    
    // Update both ref and state
    const newSet = new Set(pausedWordsRef.current);
    if (newSet.has(wordId)) {
      newSet.delete(wordId);
    } else {
      newSet.add(wordId);
    }
    pausedWordsRef.current = newSet;
    setPausedWordsState(new Set(newSet));
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
        // Remove oldest word that isn't paused and add new one
        const oldestNonPaused = wordsRef.current.find((w) => !pausedWordsRef.current.has(w.id));
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
        // Skip animation if word is paused (frozen)
        if (pausedWordsRef.current.has(word.id)) {
          return word;
        }

        let { x, y, vx, vy, scale, pulsePhase, rotation, rotationSpeed } = word;

        // Update position with smoother interpolation
        x += vx;
        y += vy;

        // Smooth bounce off edges with damping
        if (x <= 0 || x >= 100) {
          vx = -vx * 0.98;
          x = Math.max(0, Math.min(100, x));
        }
        if (y <= 0 || y >= 100) {
          vy = -vy * 0.98;
          y = Math.max(0, Math.min(100, y));
        }

        // Smooth sinusoidal pulsing effect
        pulsePhase += 0.02;
        scale = 1 + Math.sin(pulsePhase) * 0.15;

        // Update rotation
        rotation += rotationSpeed;
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
  }, [createWord]); // Remove pausedWords from dependencies

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
