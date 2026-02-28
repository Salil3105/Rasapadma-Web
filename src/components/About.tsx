import React from 'react';
import { motion } from 'motion/react';
import { Leaf, School, Award, Heart, Target, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface AboutProps {
  onBookConsultation: () => void;
}

export const About = ({ onBookConsultation }: AboutProps) => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-semibold uppercase tracking-wider text-xs sm:text-sm">Our Story</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-3">About Dr. Veda Wellness</h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300">
              Where ancient Ayurvedic wisdom meets compassionate, personalized care for modern wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dr. Ananya Sharma - Main Bio */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] max-w-md mx-auto">
                <ImageWithFallback
                  alt="Dr. Ananya Sharma"
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=800&q=80"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-surface-dark p-6 rounded-xl shadow-xl border-l-4 border-primary max-w-xs hidden sm:block">
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">Qualification</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">MD in Ayurveda</p>
                <p className="text-primary font-medium">(B.A.M.S.) Gold Medalist</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">Meet Dr. Ananya Sharma</h2>
              <p className="text-base sm:text-lg text-primary font-medium mb-4">Bridging traditional wisdom with modern lifestyle.</p>
              <div className="space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  With over 15 years of clinical experience, Dr. Ananya Sharma is a distinguished Ayurvedic practitioner dedicated to the art and science of holistic healing. Her journey began at the prestigious National Institute of Ayurveda, where she earned her BAMS degree with distinction and a gold medal.
                </p>
                <p>
                  "I believe that true health is not merely the absence of disease, but a state of vibrant balance between body, mind, and spirit. My approach combines detailed pulse diagnosis (Nadi Pariksha) with personalized diet and lifestyle plans tailored to each individual."
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start gap-2 sm:gap-3">
                  <School className="text-primary w-5 h-5 sm:w-6 sm:h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Education</h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">MD (Ayurveda), BAMS, Gold Medalist</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <Award className="text-primary w-5 h-5 sm:w-6 sm:h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Specialization</h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Panchakarma & Dietetics</p>
                  </div>
                </div>
              </div>
              <button
                onClick={onBookConsultation}
                className="mt-6 px-6 sm:px-8 py-2.5 sm:py-3.5 bg-primary text-white rounded-lg font-medium shadow-lg hover:bg-primary-dark transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                Book a Consultation <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">Our Mission & Values</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              At Dr. Veda Wellness, we are committed to making authentic Ayurveda accessible and effective for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Heart, title: 'Compassionate Care', desc: 'Every patient is unique. We listen, understand, and create personalized healing plans that respect your body and lifestyle.' },
              { icon: Leaf, title: 'Authentic Ayurveda', desc: 'We follow time-tested principles from classical texts, combined with modern understanding for safe, effective results.' },
              { icon: Target, title: 'Root Cause Healing', desc: 'We don\'t just treat symptoms—we identify and address the underlying imbalances for lasting wellness.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-700/50 dark:border-slate-600/60 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-600/60 text-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mx-auto mb-3">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Story */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Story</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
              Dr. Veda Wellness was founded with a simple vision: to bring the healing power of Ayurveda to people seeking a natural, holistic path to wellness. What started as a solo practice has grown into a trusted center for authentic Ayurvedic care in Pune, serving thousands of patients over the years.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              Today, we continue to blend ancient wisdom with modern diagnostics, offering personalized consultations, specialized treatments, and doctor-formulated wellness products—all under one roof.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
