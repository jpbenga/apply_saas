import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
export const CVSectionCarousel = ({
  sections,
  activeSectionId,
  onSectionChange
}) => {
  const [width, setWidth] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const carouselRef = useRef(null);
  // Calculate which slide should be active based on activeSectionId
  useEffect(() => {
    const activeIndex = sections.findIndex(section => section.id === activeSectionId);
    if (activeIndex !== -1) {
      setSlideIndex(activeIndex);
    }
  }, [activeSectionId, sections]);
  // Update carousel width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [sections]);
  // Handle navigation
  const handleNext = () => {
    if (slideIndex < sections.length - 1) {
      setSlideIndex(slideIndex + 1);
      onSectionChange(sections[slideIndex + 1].id);
    }
  };
  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
      onSectionChange(sections[slideIndex - 1].id);
    }
  };
  const handleSlideSelect = index => {
    setSlideIndex(index);
    onSectionChange(sections[index].id);
  };
  // Calculate the drag constraint based on the number of sections
  const slideWidth = carouselRef.current?.offsetWidth / Math.min(sections.length, 3);
  const dragConstraint = slideWidth ? (sections.length - 1) * slideWidth : width;
  return <div className="relative w-full mb-4 mt-2">
      <div className="overflow-hidden" aria-live="polite">
        <motion.div ref={carouselRef} className="flex cursor-grab active:cursor-grabbing" drag="x" dragConstraints={{
        right: 0,
        left: -dragConstraint
      }} dragElastic={0.1} dragTransition={{
        bounceStiffness: 300,
        bounceDamping: 20
      }} onDragEnd={(e, {
        offset,
        velocity
      }) => {
        // Detect swipe direction
        const swipe = offset.x < -50 ? 1 : offset.x > 50 ? -1 : 0;
        if (swipe === 1 && slideIndex < sections.length - 1) {
          handleNext();
        } else if (swipe === -1 && slideIndex > 0) {
          handlePrev();
        }
      }} animate={{
        x: -slideIndex * slideWidth
      }} transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}>
          {sections.map((section, index) => <div key={section.id} className={`min-w-[33.333%] flex-shrink-0 px-1 py-2 transition-all duration-300 ${index === slideIndex ? 'scale-100' : 'scale-95 opacity-70'}`} onClick={() => handleSlideSelect(index)}>
              <div className={`h-16 rounded-lg border p-3 flex items-center shadow-sm transition-all duration-200
                  ${index === slideIndex ? 'bg-gradient-to-r from-amber-50 to-build-bg border-amber-300 ring-2 ring-amber-200' : 'bg-white border-gray-200'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3
                  ${section.complete ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                  {section.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {section.title}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {section.complete ? 'Complété' : 'À compléter'}
                  </p>
                </div>
                {section.complete && <div className="ml-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>}
              </div>
            </div>)}
        </motion.div>
      </div>
      {/* Navigation arrows */}
      <button onClick={handlePrev} disabled={slideIndex === 0} className={`absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow-md z-10 transition-opacity duration-200 ${slideIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-80 hover:opacity-100'}`} aria-label="Section précédente">
        <ChevronLeftIcon className="w-5 h-5 text-amber-800" />
      </button>
      <button onClick={handleNext} disabled={slideIndex === sections.length - 1} className={`absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow-md z-10 transition-opacity duration-200 ${slideIndex === sections.length - 1 ? 'opacity-40 cursor-not-allowed' : 'opacity-80 hover:opacity-100'}`} aria-label="Section suivante">
        <ChevronRightIcon className="w-5 h-5 text-amber-800" />
      </button>
      {/* Pagination indicators */}
      <div className="flex justify-center mt-2">
        {sections.map((_, index) => <button key={index} onClick={() => handleSlideSelect(index)} className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${index === slideIndex ? 'bg-amber-500 w-4' : 'bg-amber-200'}`} aria-label={`Aller à la section ${index + 1}`} />)}
      </div>
      {/* Screen reader progress announcement */}
      <div className="sr-only" aria-live="polite">
        Section {sections[slideIndex]?.title}, étape {slideIndex + 1} sur{' '}
        {sections.length}
      </div>
    </div>;
};