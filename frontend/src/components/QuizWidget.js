import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiRotateCcw } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './QuizWidget.css';
import { ease } from '../utils/motion';

const QuizWidget = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const reduce = useReducedMotion();

  const questions = [
    {
      q: "What's your current level?",
      options: [
        { value: "beginner", label: "Complete beginner" },
        { value: "heritage", label: "Heritage speaker (understand but can't speak)" },
        { value: "intermediate", label: "I can have basic conversations" },
        { value: "advanced", label: "Pretty fluent, want to polish" }
      ]
    },
    {
      q: "What's your main goal?",
      options: [
        { value: "family", label: "Connect with family" },
        { value: "travel", label: "Travel & cultural exploration" },
        { value: "work", label: "Professional / Business" },
        { value: "heritage", label: "Reconnect with my roots" },
        { value: "fun", label: "Personal interest / fun!" }
      ]
    },
    {
      q: "How much time can you dedicate per week?",
      options: [
        { value: "1hr", label: "1-2 hours (1 lesson)" },
        { value: "3hr", label: "3-4 hours (2 lessons + practice)" },
        { value: "5hr", label: "5+ hours (intensive learning)" }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 300);
    }
  };

  const getRecommendation = () => {
    const level = answers[0];
    const time = answers[2];

    if (level === "beginner" && time === "5hr") {
      return {
        package: "Intensive Pack",
        reason: "You're starting fresh and ready to commit! The Intensive Pack will give you momentum and structure.",
        link: "/booking"
      };
    } else if (time === "1hr") {
      return {
        package: "Trial Lesson",
        reason: "Perfect for dipping your toes in! Let's start with a trial to see how you learn best.",
        link: "/booking"
      };
    } else {
      return {
        package: "Standard Lesson",
        reason: "The sweet spot! Regular lessons with practice time — most students see great progress with this rhythm.",
        link: "/booking"
      };
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const total = questions.length;
  const pad = (n) => String(n).padStart(2, '0');
  const letters = 'ABCDEFGH';
  const progress = ((currentQuestion + 1) / total) * 100;
  const recommendation = showResult ? getRecommendation() : null;
  const chosenLabels = questions
    .map((q, i) => q.options.find((o) => o.value === answers[i]))
    .filter(Boolean)
    .map((o) => o.label);

  return (
    <div className="quiz" data-testid="quiz-widget">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: reduce ? 0 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : -16 }}
            transition={{ duration: reduce ? 0.15 : 0.45, ease }}
            className="quiz__panel"
          >
            {/* Progress */}
            <div className="quiz__progress">
              <div className="quiz__meta">
                <span className="quiz__step">
                  <span className="num">{pad(currentQuestion + 1)}</span>
                  <span className="quiz__of">/ {pad(total)}</span>
                </span>
                <span className="quiz__pct">
                  Question {currentQuestion + 1} of {total} · {Math.round(progress)}%
                </span>
              </div>
              <div
                className="quiz__track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                aria-label={`Question ${currentQuestion + 1} of ${total}`}
              >
                <motion.div
                  className="quiz__fill"
                  initial={{ width: `${(currentQuestion / total) * 100}%` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: reduce ? 0 : 0.8, ease }}
                />
              </div>
            </div>

            {/* Question */}
            <h3 className="quiz__question" id={`quiz-q-${currentQuestion}`}>
              {questions[currentQuestion].q}
            </h3>

            {/* Options */}
            <ul className="quiz__options" role="list" aria-labelledby={`quiz-q-${currentQuestion}`}>
              {questions[currentQuestion].options.map((option, index) => {
                const selected = answers[currentQuestion] === option.value;
                return (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => handleAnswer(option.value)}
                      className={`quiz__option ${selected ? 'is-selected' : ''}`}
                      aria-pressed={selected}
                      data-testid={`quiz-option-${option.value}`}
                    >
                      <span className="quiz__letter" aria-hidden="true">{letters[index]}</span>
                      <span className="quiz__label">{option.label}</span>
                      <span className="quiz__check" aria-hidden="true">
                        {selected ? <FiCheck /> : <FiArrowRight />}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.7, ease }}
            className="quiz__panel quiz__result"
            data-testid="quiz-result"
            aria-live="polite"
          >
            <p className="eyebrow quiz__result-eyebrow">Your recommendation</p>
            <h3 className="quiz__result-title">
              Perfect! Here&rsquo;s what I <em className="display-italic">recommend</em>
            </h3>

            <p className="quiz__package" data-testid="quiz-package">
              {recommendation.package}
            </p>
            <p className="quiz__reason">{recommendation.reason}</p>

            {chosenLabels.length > 0 && (
              <ul className="quiz__answers" aria-label="Your answers">
                {chosenLabels.map((label) => (
                  <li key={label} className="chip">{label}</li>
                ))}
              </ul>
            )}

            <div className="quiz__actions">
              <Link to={recommendation.link} className="btn-primary" data-testid="quiz-book-btn">
                Book This Package
                <FiArrowRight aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={resetQuiz}
                className="btn-outline"
                data-testid="quiz-retake-btn"
              >
                <FiRotateCcw aria-hidden="true" />
                Retake Quiz
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizWidget;
