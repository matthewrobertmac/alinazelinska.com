import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const QuizWidget = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: "What's your current level?",
      options: [
        { value: "beginner", label: "Complete beginner", icon: "🌱" },
        { value: "heritage", label: "Heritage speaker (understand but can't speak)", icon: "🏠" },
        { value: "intermediate", label: "I can have basic conversations", icon: "🚀" },
        { value: "advanced", label: "Pretty fluent, want to polish", icon: "✨" }
      ]
    },
    {
      q: "What's your main goal?",
      options: [
        { value: "family", label: "Connect with family", icon: "👨‍👩‍👧‍👦" },
        { value: "travel", label: "Travel & cultural exploration", icon: "✈️" },
        { value: "work", label: "Professional / Business", icon: "💼" },
        { value: "heritage", label: "Reconnect with my roots", icon: "🌿" },
        { value: "fun", label: "Personal interest / fun!", icon: "🎉" }
      ]
    },
    {
      q: "How much time can you dedicate per week?",
      options: [
        { value: "1hr", label: "1-2 hours (1 lesson)", icon: "⏰" },
        { value: "3hr", label: "3-4 hours (2 lessons + practice)", icon: "📚" },
        { value: "5hr", label: "5+ hours (intensive learning)", icon: "🔥" }
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

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card p-8"
          >
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-[var(--color-text-secondary)] mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-[var(--color-accent)] to-pink-600"
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question */}
            <h3 className="text-2xl font-serif font-bold mb-6">
              {questions[currentQuestion].q}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 text-left rounded-lg border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all flex items-center gap-3"
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="flex-grow">{option.label}</span>
                  {answers[currentQuestion] === option.value && (
                    <FiCheck className="w-5 h-5 text-[var(--color-accent)]" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-8 text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-accent)] to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎯</span>
            </div>
            <h3 className="text-3xl font-serif font-bold mb-4">
              Perfect! Here's What I Recommend:
            </h3>
            <div className="mb-6">
              <p className="text-2xl font-bold text-[var(--color-accent)] mb-3">
                {getRecommendation().package}
              </p>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                {getRecommendation().reason}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={getRecommendation().link}
                className="btn-primary inline-flex items-center gap-2"
              >
                Book This Package
              </Link>
              <button
                onClick={resetQuiz}
                className="btn-outline inline-flex items-center gap-2"
              >
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
