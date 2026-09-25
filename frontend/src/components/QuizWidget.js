import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiRotateCcw } from 'react-icons/fi';
import { Link } from '../i18n/routing';
import { useTranslation } from 'react-i18next';
import { accent } from '../utils/text';
import './QuizWidget.css';
import { ease } from '../utils/motion';

const QuizWidget = () => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const reduce = useReducedMotion();

  const q = (id, values) => ({
    q: t(`widgets.quiz.questions.${id}.title`),
    options: values.map((value) => ({ value, label: t(`widgets.quiz.questions.${id}.options.${value}`) })),
  });
  const questions = [
    q('level', ['beginner', 'heritage', 'intermediate', 'advanced']),
    q('goal', ['family', 'travel', 'work', 'heritage', 'fun']),
    q('time', ['1hr', '3hr', '5hr']),
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
    let key = 'standard';
    if (level === 'beginner' && time === '5hr') key = 'intensive';
    else if (time === '1hr') key = 'trial';
    return {
      package: t(`widgets.quiz.packages.${key}.name`),
      reason: t(`widgets.quiz.packages.${key}.reason`),
      link: '/booking',
    };
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
                  {t('widgets.quiz.progress', { current: currentQuestion + 1, total })} · {Math.round(progress)}%
                </span>
              </div>
              <div
                className="quiz__track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                aria-label={t('widgets.quiz.progress', { current: currentQuestion + 1, total })}
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
            <p className="eyebrow quiz__result-eyebrow">{t('widgets.quiz.resultEyebrow')}</p>
            <h3 className="quiz__result-title">{accent(t('widgets.quiz.resultTitle'))}</h3>

            <p className="quiz__package" data-testid="quiz-package">
              {recommendation.package}
            </p>
            <p className="quiz__reason">{recommendation.reason}</p>

            {chosenLabels.length > 0 && (
              <ul className="quiz__answers" aria-label={t('widgets.quiz.answersLabel')}>
                {chosenLabels.map((label) => (
                  <li key={label} className="chip">{label}</li>
                ))}
              </ul>
            )}

            <div className="quiz__actions">
              <Link to={recommendation.link} className="btn-primary" data-testid="quiz-book-btn">
                {t('widgets.quiz.book')}
                <FiArrowRight aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={resetQuiz}
                className="btn-outline"
                data-testid="quiz-retake-btn"
              >
                <FiRotateCcw aria-hidden="true" />
                {t('widgets.quiz.retake')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizWidget;
