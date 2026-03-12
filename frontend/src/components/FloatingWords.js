import React, { useEffect, useState, useRef, useCallback } from 'react';
import { floatingWords } from '../data/content';

const FloatingWords = () => {
  const [words, setWords] = useState([]);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const wordsRef = useRef([]);
  const pausedWordsRef = useRef(new Set());
  const [pausedWordsState, setPausedWordsState] = useState(new Set());
  const usedWordsRef = useRef(new Set()); // Track used words to prevent repetition

  const getRandomWord = useCallback(() => {
    // Get available words (not currently in use)
    const availableWords = floatingWords.filter(
      word => !usedWordsRef.current.has(word)
    );
    
    // If all words are used, reset
    if (availableWords.length === 0) {
      usedWordsRef.current.clear();
      return floatingWords[Math.floor(Math.random() * floatingWords.length)];
    }
    
    const selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    usedWordsRef.current.add(selectedWord);
    return selectedWord;
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
      baseSize: Math.random() * 10 + 14, // Reduced from 14+16 to 10+14 for smaller words
      scale: 1,
      rotation: (Math.random() - 0.5) * 60,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      pulsePhase: Math.random() * Math.PI * 2,
    };
  }, [getRandomWord]);

  const handleWordClick = useCallback((wordId, event) => {
    event.preventDefault();
    event.stopPropagation();
    
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
    // Reduced from 25 to 18 words for less clutter
    const initialWords = Array.from({ length: 18 }, createWord);
    wordsRef.current = initialWords;
    setWords(initialWords);

    const addWordInterval = setInterval(() => {
      // Reduced max from 30 to 22 words
      if (wordsRef.current.length < 22) {
        const newWord = createWord();
        wordsRef.current = [...wordsRef.current, newWord];
        setWords([...wordsRef.current]);
      } else {
        const oldestNonPaused = wordsRef.current.find((w) => !pausedWordsRef.current.has(w.id));
        if (oldestNonPaused) {
          // Remove word from used words set when removing it
          usedWordsRef.current.delete(oldestNonPaused.text);
          wordsRef.current = wordsRef.current.filter((w) => w.id !== oldestNonPaused.id);
          wordsRef.current = [...wordsRef.current, createWord()];
          setWords([...wordsRef.current]);
        }
      }
    }, 2500);

    const animate = () => {
      wordsRef.current = wordsRef.current.map((word) => {
        if (pausedWordsRef.current.has(word.id)) {
          return word;
        }

        let { x, y, vx, vy, scale, pulsePhase, rotation, rotationSpeed } = word;

        x += vx;
        y += vy;

        if (x <= 0 || x >= 100) {
          vx = -vx * 0.98;
          x = Math.max(0, Math.min(100, x));
        }
        if (y <= 0 || y >= 100) {
          vy = -vy * 0.98;
          y = Math.max(0, Math.min(100, y));
        }

        pulsePhase += 0.02;
        scale = 1 + Math.sin(pulsePhase) * 0.15;

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
  }, [createWord]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    >
      {words.map((word) => {
        const isPaused = pausedWordsState.has(word.id);
        return (
          <div
            key={word.id}
            onClick={(e) => handleWordClick(word.id, e)}
            onTouchStart={(e) => handleWordClick(word.id, e)}
            className="absolute font-sans select-none cursor-pointer touch-manipulation pointer-events-auto"
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              fontSize: `${word.baseSize}px`,
              opacity: word.opacity, // Always use word's natural opacity
              transform: `translate(-50%, -50%) scale(${isPaused ? 1.5 : word.scale}) rotate(${word.rotation}deg)`, // Keep rotation when paused
              color: isPaused ? '#FFB800' : 'var(--color-accent)', // Warmer gold to match pink intensity
              willChange: isPaused ? 'none' : 'transform',
              textShadow: isPaused
                ? '0 0 15px rgba(255, 184, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)' // Subtle glow matching pink intensity
                : '0 2px 10px rgba(255, 145, 164, 0.3)',
              fontWeight: isPaused ? '700' : '500',
              zIndex: isPaused ? 100 : 50,
              pointerEvents: 'auto',
              filter: isPaused ? 'brightness(1.1)' : 'none', // Subtle brightness boost
              WebkitTapHighlightColor: 'transparent',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              transition: isPaused 
                ? 'color 0.3s ease-out, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                : 'opacity 0.1s ease-out',
              position: 'absolute',
            }}
            onMouseEnter={(e) => {
              if (!isPaused) {
                e.currentTarget.style.transform = `translate(-50%, -50%) scale(${word.scale * 1.1}) rotate(${word.rotation}deg)`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isPaused) {
                e.currentTarget.style.transform = `translate(-50%, -50%) scale(${word.scale}) rotate(${word.rotation}deg)`;
              }
            }}
          >
            {word.text}
          </div>
        );
      })}
      
      {/* Instruction hint */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
        style={{
          animation: 'fadeOut 2s ease-in-out 8s forwards',
          opacity: 0.6,
          zIndex: 100,
        }}
      >
        <p className="text-sm text-[var(--color-accent)] font-medium">
          ✨ Click on any word to freeze it and turn it gold ✨
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
