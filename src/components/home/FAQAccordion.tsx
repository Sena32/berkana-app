'use client';
import React, { useState, useRef } from 'react';
import { mockFaq } from '@/mocks/faq-mock';

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto py-12 px-6 flex flex-col items-center">
      <span className="text-[#2447F9] font-normal text-sm">Berkana responde</span>
      <h2 className="text-2xl md:text-4xl font-bold text-[#34364A] mb-8">Perguntas frequentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockFaq.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="bg-white rounded-2xl shadow p-6 flex flex-col">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpenIndex(isOpen ? null : i)}>
                <span className="font-normal text-[#1B2B4B]">{faq.question}</span>
                <span className={isOpen ? 'text-yellow-400 rotate-45 transition-transform' : 'text-yellow-400 transition-transform'}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
              </div>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 mt-4' : 'max-h-0'}`}
                style={{
                  // maxHeight: isOpen ? '160px' : '0px',
                }}
              >
                <div className="text-[#4B587C] text-base animate-fade-in">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQAccordion; 