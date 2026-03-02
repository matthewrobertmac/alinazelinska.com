import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { testimonials, meta } from '../data/content';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 6;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  useEffect(() => {
    document.title = `Testimonials | ${meta.title}`;
    window.scrollTo(0, 0);
  }, []);

  const getCurrentTestimonials = () => {
    const start = currentPage * testimonialsPerPage;
    const end = start + testimonialsPerPage;
    return testimonials.slice(start, end);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate a color based on the name
  const getColorFromName = (name) => {
    const colors = [
      'from-pink-400 to-rose-500',
      'from-purple-400 to-pink-500',
      'from-rose-400 to-pink-500',
      'from-fuchsia-400 to-pink-500',
      'from-pink-500 to-rose-600',
      'from-rose-500 to-pink-600',
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Get initials from name
  const getInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return parts[0][0];
  };

  return (
    <div className="page-transition pt-24 pb-16">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1
              className="text-5xl md:text-6xl font-serif font-bold mb-6"
              data-testid="testimonials-title"
            >
              Student Testimonials
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              What my students say about their learning experience
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {getCurrentTestimonials().map((testimonial, index) => {
              const initials = getInitials(testimonial.name);
              const colorClass = getColorFromName(testimonial.name);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card hover-lift flex flex-col relative overflow-hidden"
                  data-testid={`testimonial-card-${index}`}
                >
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div className={`w-full h-full bg-gradient-to-br ${colorClass} rounded-full blur-2xl transform translate-x-12 -translate-y-12`}></div>
                  </div>

                  {/* Avatar with image or initials */}
                  <div className="flex items-start gap-4 mb-4 relative z-10">
                    {testimonial.img ? (
                      <img
                        src={testimonial.img}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover shadow-lg flex-shrink-0"
                      />
                    ) : (
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0`}
                      >
                        {initials}
                      </div>
                    )}
                    <div className="flex-grow">
                      <p className="font-semibold text-[var(--color-text)] text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {testimonial.lessons}
                      </p>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]"
                      />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-[var(--color-text-secondary)] italic flex-grow leading-relaxed relative z-10">
                    "{testimonial.text}"
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center gap-4"
            >
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                data-testid="prev-page-btn"
                className={`p-3 rounded-full border-2 transition-all duration-300 touch-manipulation ${
                  currentPage === 0
                    ? 'border-gray-400 text-gray-400 cursor-not-allowed opacity-50'
                    : 'border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white active:scale-95'
                }`}
                aria-label="Previous page"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>

              <span className="text-lg font-medium" data-testid="page-indicator">
                Page {currentPage + 1} of {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                data-testid="next-page-btn"
                className={`p-3 rounded-full border-2 transition-all duration-300 touch-manipulation ${
                  currentPage === totalPages - 1
                    ? 'border-gray-400 text-gray-400 cursor-not-allowed opacity-50'
                    : 'border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white active:scale-95'
                }`}
                aria-label="Next page"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
