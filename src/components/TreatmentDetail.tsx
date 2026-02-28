import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Leaf, CheckCircle, Clock, Users } from 'lucide-react';
import { Treatment } from '../constants';
import { ImageWithFallback } from './ImageWithFallback';

interface TreatmentDetailProps {
  treatment: Treatment;
  onBack: () => void;
  onBookConsultation: () => void;
}

export const TreatmentDetail = ({ treatment, onBack, onBookConsultation }: TreatmentDetailProps) => {
  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-200 hover:text-primary dark:hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <ImageWithFallback
              src={treatment.image}
              alt={treatment.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{treatment.title}</h1>
              <p className="text-white/90 mt-2 text-lg">{treatment.description}</p>
            </div>
          </div>

          <div className="p-8 md:p-10">
            {/* Purpose */}
            {treatment.purpose && (
              <section className="mb-10">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white mb-4">
                  <Leaf className="w-5 h-5 text-primary" />
                  Purpose & Overview
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{treatment.purpose}</p>
              </section>
            )}

            {/* Full Description */}
            {treatment.fullDescription && (
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">What to Expect</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{treatment.fullDescription}</p>
              </section>
            )}

            {/* Benefits */}
            {treatment.benefits && treatment.benefits.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Key Benefits</h2>
                <ul className="space-y-3">
                  {treatment.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Duration & Ideal For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {treatment.duration && (
                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Duration</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">{treatment.duration}</p>
                  </div>
                </div>
              )}
              {treatment.idealFor && (
                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Ideal For</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">{treatment.idealFor}</p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={onBookConsultation}
                className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-medium rounded-lg shadow-lg hover:bg-primary-dark transition-colors"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};
