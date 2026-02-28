import React from 'react';
import { motion } from 'motion/react';
import { Leaf, ArrowRight } from 'lucide-react';
import { TREATMENTS } from '../constants';
import { ImageWithFallback } from './ImageWithFallback';

interface ServicesProps {
  onTreatmentClick: (treatmentId: string) => void;
  onBookConsultation: () => void;
}

export const Services = ({ onTreatmentClick, onBookConsultation }: ServicesProps) => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/60 dark:to-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-semibold uppercase tracking-wider text-xs sm:text-sm">What We Offer</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-3">Our Specialized Treatments</h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300">
              Customized care plans for your unique constitution (Dosha). Each treatment is tailored to restore balance and promote lasting wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Approach Intro */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-start gap-4 p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-600"
          >
            <div className="p-3 rounded-xl bg-primary/10 dark:bg-slate-700/80">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Personalized to Your Dosha</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Before any treatment, we assess your unique constitution (Vata, Pitta, Kapha) through Nadi Pariksha (pulse diagnosis) and detailed consultation. This ensures every therapy and recommendation is aligned with your body's natural needs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-10 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TREATMENTS.map((treatment, i) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => onTreatmentClick(treatment.id)}
                className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-slate-100 dark:border-slate-700 hover:border-primary/30 dark:hover:border-primary/40"
              >
                <div className="h-52 overflow-hidden relative">
                  <ImageWithFallback
                    alt={treatment.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={treatment.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl">{treatment.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{treatment.description}</p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary rounded-2xl p-6 sm:p-8 md:p-12 lg:p-14 shadow-xl dark:bg-slate-800 dark:border dark:border-primary/40 dark:shadow-2xl dark:shadow-primary/5"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white dark:text-white mb-3">Ready to Begin Your Healing Journey?</h2>
            <p className="text-white/90 dark:text-slate-300 mb-6 text-sm sm:text-base max-w-xl mx-auto">
              Book a consultation with Dr. Ananya Sharma and discover a personalized wellness plan designed just for you.
            </p>
            <button
              onClick={onBookConsultation}
              className="px-8 py-3.5 bg-white text-primary font-bold rounded-lg shadow-lg hover:bg-slate-50 transition-colors dark:bg-primary dark:text-white dark:hover:bg-primary-dark"
            >
              Book Consultation
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
