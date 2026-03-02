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
      vx: (Math.random() - 0.5) * 0.03,
      vy: (Math.random() - 0.5) * 0.03,
      opacity: Math.random() * 0.3 + 0.2,
      baseSize: Math.random() * 14 + 16,
      scale: 1,
      scaleDirection: Math.random() > 0.5 ? 1 : -1,
      scaleSpeed: Math.random() * 0.002 + 0.001,
      // Rotation limited to -30 to +30 degrees (always upright)
      rotation: (Math.random() - 0.5) * 60, // -30 to +30
      rotationSpeed: (Math.random() - 0.5) * 0.1,
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

        let { x, y, vx, vy, scale, scaleDirection, scaleSpeed, rotation, rotationSpeed } = word;

        // Update position
        x += vx;
        y += vy;

        // Bounce off edges
        if (x <= 0 || x >= 100) {
          vx = -vx;
          x = Math.max(0, Math.min(100, x));
        }
        if (y <= 0 || y >= 100) {
          vy = -vy;
          y = Math.max(0, Math.min(100, y));
        }

        // Update scale (pulsing effect)
        scale += scaleDirection * scaleSpeed;
        if (scale >= 1.3 || scale <= 0.7) {
          scaleDirection = -scaleDirection;
        }

        // Update rotation - constrained to -30 to +30 degrees
        rotation += rotationSpeed;
        // Bounce back when reaching limits (keeps words upright)
        if (rotation >= 30 || rotation <= -30) {
          rotationSpeed = -rotationSpeed;
          rotation = Math.max(-30, Math.min(30, rotation));
        }

        return { ...word, x, y, vx, vy, scale, scaleDirection, rotation };
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
            className={`absolute font-sans select-none transition-all duration-300 cursor-pointer hover:scale-110 touch-manipulation active:scale-95 ${
              isPaused ? 'animate-pulse' : ''
            }`}
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              fontSize: `${word.baseSize}px`,
              opacity: isPaused ? 1 : word.opacity,
              transform: `translate(-50%, -50%) scale(${isPaused ? 1.2 : word.scale}) rotate(${word.rotation}deg)`,
              color: isPaused ? '#FFD700' : 'var(--color-accent)',
              willChange: 'transform, opacity',
              textShadow: isPaused
                ? '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.2)'
                : '0 2px 10px rgba(255, 145, 164, 0.3)',
              fontWeight: isPaused ? '700' : '500',
              zIndex: isPaused ? 10 : 1,
              pointerEvents: 'auto',
              filter: isPaused ? 'brightness(1.2)' : 'none',
              mixBlendMode: isPaused ? 'screen' : 'normal',
              WebkitTapHighlightColor: 'transparent',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
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
