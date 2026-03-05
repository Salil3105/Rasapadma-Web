import React from 'react';
import { motion } from 'motion/react';
import {
  Leaf,
  Stethoscope,
  FlaskConical,
  Verified,
  School,
  Award,
  ArrowRight,
  Star,
  PlayCircle,
} from 'lucide-react';
import { TREATMENTS, TESTIMONIALS } from '../constants';
import { ImageWithFallback } from './ImageWithFallback';

interface HomeProps {
  onStartJourney: () => void;
  onExploreShop?: () => void;
  onViewServices?: () => void;
  onTreatmentClick?: (treatmentId: string) => void;
}

export const Home = ({
  onStartJourney,
  onExploreShop,
  onViewServices,
  onTreatmentClick,
}: HomeProps) => {
  return (
    <div className='pt-14 min-[375px]:pt-16 sm:pt-20'>
      {/* Hero Section */}
      <section className='relative py-12 min-[375px]:py-16 sm:py-20 lg:py-32 overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl'></div>
          <div className='absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl'></div>
        </div>
        <div className='max-w-7xl mx-auto px-3 min-[375px]:px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 min-[375px]:gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='space-y-5 min-[375px]:space-y-6 sm:space-y-8 text-center lg:text-left'
            >
              <div className='inline-flex items-center px-2.5 min-[375px]:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs min-[375px]:text-sm font-medium mb-2'>
                <span className='w-1.5 min-[375px]:w-2 h-1.5 min-[375px]:h-2 rounded-full bg-primary mr-1.5 min-[375px]:mr-2'></span>
                Certified Ayurvedic Practitioner
              </div>
              <h1 className='text-2xl min-[375px]:text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight'>
                Restoring Balance, <br />
                <span className='text-primary italic font-serif'>
                  Naturally.
                </span>
              </h1>
              <p className='text-base min-[375px]:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0'>
                Experience holistic healing with Dr. Ananya Sharma, MD (BAMS).
                Bridging ancient Vedic wisdom with modern medical understanding
                for your complete well-being.
              </p>
              <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 min-[375px]:gap-4'>
                <button
                  onClick={onStartJourney}
                  className='w-full sm:w-auto px-5 min-[375px]:px-6 sm:px-8 py-2.5 min-[375px]:py-3 sm:py-3.5 text-sm min-[375px]:text-base bg-primary text-white rounded-lg font-medium shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all'
                >
                  Start Your Journey
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById('about')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className='w-full sm:w-auto px-5 min-[375px]:px-6 sm:px-8 py-2.5 min-[375px]:py-3 sm:py-3.5 text-sm min-[375px]:text-base bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2'
                >
                  <PlayCircle className='text-primary w-4 h-4 min-[375px]:w-5 min-[375px]:h-5' />
                  Watch Introduction
                </button>
              </div>
              <div className='pt-5 min-[375px]:pt-6 sm:pt-8 flex items-center justify-center lg:justify-start gap-4 min-[375px]:gap-6 sm:gap-8 opacity-80'>
                <div className='text-center lg:text-left'>
                  <p className='text-xl min-[375px]:text-2xl font-bold text-slate-900 dark:text-white'>
                    15+
                  </p>
                  <p className='text-xs min-[375px]:text-sm text-slate-500 dark:text-slate-400'>
                    Years Experience
                  </p>
                </div>
                <div className='w-px h-8 min-[375px]:h-10 bg-slate-200 dark:bg-slate-600'></div>
                <div className='text-center lg:text-left'>
                  <p className='text-xl min-[375px]:text-2xl font-bold text-slate-900 dark:text-white'>
                    5k+
                  </p>
                  <p className='text-xs min-[375px]:text-sm text-slate-500 dark:text-slate-400'>
                    Happy Patients
                  </p>
                </div>
                <div className='w-px h-8 min-[375px]:h-10 bg-slate-200 dark:bg-slate-600'></div>
                <div className='text-center lg:text-left'>
                  <p className='text-xl min-[375px]:text-2xl font-bold text-slate-900 dark:text-white'>
                    100%
                  </p>
                  <p className='text-sm text-slate-500 dark:text-slate-400'>
                    Natural Herbs
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='relative flex items-center justify-center'
            >
              <div className='relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl'>
                <ImageWithFallback
                  alt='Ayurvedic Practitioner'
                  className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-700'
                  src='https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>
                <div className='absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-surface-dark/95 backdrop-blur p-4 rounded-xl shadow-lg border border-white/20 dark:border-slate-600/30'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-primary/10 rounded-full text-primary'>
                      <Verified className='w-5 h-5' />
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-slate-900 dark:text-white'>
                        Authentic Ayurveda
                      </p>
                      <p className='text-xs text-slate-500 dark:text-slate-400'>
                        Licensed & Certified Practice
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-12 sm:py-16 lg:py-20 bg-white dark:bg-slate-800/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center max-w-3xl mx-auto mb-10 sm:mb-12'>
            <h2 className='text-primary font-medium tracking-wide uppercase text-xs sm:text-sm mb-2'>
              Why Choose Ayurveda?
            </h2>
            <h3 className='text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3'>
              Holistic Healing for Modern Living
            </h3>
            <p className='text-slate-600 dark:text-slate-300'>
              We don't just treat the symptoms; we address the root cause of
              your ailment to restore your body's natural rhythm.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='group p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors border border-slate-100 dark:border-slate-600/50 hover:border-primary/30'>
              <div className='w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform'>
                <Leaf className='w-8 h-8' />
              </div>
              <h4 className='text-xl font-bold text-slate-900 dark:text-white mb-3'>
                100% Natural Therapies
              </h4>
              <p className='text-slate-600 dark:text-slate-300 leading-relaxed'>
                Treatments derived purely from nature using herbs, oils, and
                minerals, free from synthetic chemicals and side effects.
              </p>
            </div>
            <div className='group p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors border border-slate-100 dark:border-slate-600/50 hover:border-primary/30'>
              <div className='w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform'>
                <Stethoscope className='w-8 h-8' />
              </div>
              <h4 className='text-xl font-bold text-slate-900 dark:text-white mb-3'>
                Expert MD (BAMS) Care
              </h4>
              <p className='text-slate-600 dark:text-slate-300 leading-relaxed'>
                Consultations by a qualified Ayurvedic doctor with a Bachelor of
                Ayurvedic Medicine and Surgery degree.
              </p>
            </div>
            <div className='group p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors border border-slate-100 dark:border-slate-600/50 hover:border-primary/30'>
              <div className='w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform'>
                <FlaskConical className='w-8 h-8' />
              </div>
              <h4 className='text-xl font-bold text-slate-900 dark:text-white mb-3'>
                Lab-Tested Products
              </h4>
              <p className='text-slate-600 dark:text-slate-300 leading-relaxed'>
                Our wellness formulations are rigorously tested for purity,
                potency, and safety to ensure the best results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className='py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30'
        id='about'
      >
        <div className='absolute right-0 top-1/4 w-1/3 h-full bg-primary/5 dark:bg-slate-800/30 rounded-l-3xl -z-10'></div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16'>
            <div className='w-full lg:w-1/2 relative'>
              <div className='relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] max-w-md mx-auto'>
                <ImageWithFallback
                  alt='Dr. Ananya Sharma'
                  className='w-full h-full object-cover'
                  src='https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=800&q=80'
                />
              </div>
              <div className='absolute -bottom-6 -right-6 bg-white dark:bg-surface-dark p-6 rounded-xl shadow-xl border-l-4 border-primary max-w-xs hidden sm:block'>
                <p className='text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1'>
                  Qualification
                </p>
                <p className='text-xl font-bold text-slate-900 dark:text-white'>
                  MD in Ayurveda
                </p>
                <p className='text-primary font-medium'>
                  (B.A.M.S.) Gold Medalist
                </p>
              </div>
            </div>
            <div className='w-full lg:w-1/2'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4'>
                Meet Dr. Ananya Sharma
              </h2>
              <h3 className='text-base sm:text-lg text-primary font-medium mb-4'>
                Bridging the gap between traditional wisdom and modern
                lifestyle.
              </h3>
              <div className='space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300'>
                <p>
                  With over 15 years of clinical experience, Dr. Sharma is a
                  distinguished practitioner dedicated to the art and science of
                  Ayurveda. Her journey began at the prestigious National
                  Institute of Ayurveda, where she earned her BAMS degree with
                  distinction.
                </p>
                <p>
                  "I believe that true health is not merely the absence of
                  disease, but a state of vibrant balance between body, mind,
                  and spirit. My approach combines detailed pulse diagnosis
                  (Nadi Pariksha) with personalized diet and lifestyle plans."
                </p>
              </div>
              <div className='mt-6 grid grid-cols-2 gap-4 sm:gap-6'>
                <div className='flex items-start gap-2 sm:gap-3'>
                  <School className='text-primary w-5 h-5 sm:w-6 sm:h-6 mt-0.5 shrink-0' />
                  <div>
                    <h4 className='font-bold text-slate-900 dark:text-white text-sm sm:text-base'>
                      Education
                    </h4>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                      MD (Ayurveda), BAMS
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <Award className='text-primary w-5 h-5 sm:w-6 sm:h-6 mt-0.5 shrink-0' />
                  <div>
                    <h4 className='font-bold text-slate-900 dark:text-white text-sm sm:text-base'>
                      Specialization
                    </h4>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                      Panchakarma & Dietetics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Our Specialized Treatments */}
      <section
        className='py-12 sm:py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/50'
        id='services'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 sm:mb-10'>
            <div>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2'>
                Our Specialized Treatments
              </h2>
              <p className='text-slate-600 dark:text-slate-300'>
                Customized care plans for your unique constitution (Dosha).
              </p>
            </div>
            <button
              onClick={onViewServices}
              className='flex items-center text-primary font-semibold hover:text-primary-dark transition-colors w-fit'
            >
              View all services <ArrowRight className='ml-1 w-4 h-4' />
            </button>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {TREATMENTS.map((treatment) => (
              <div
                key={treatment.id}
                onClick={() => onTreatmentClick?.(treatment.id)}
                className='bg-white dark:bg-slate-800/80 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-slate-200/60 dark:border-slate-600/60'
              >
                <div className='h-48 overflow-hidden relative'>
                  <ImageWithFallback
                    alt={treatment.title}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    src={treatment.image}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex items-end'>
                    <h3 className='text-white font-semibold text-lg drop-shadow-sm'>
                      {treatment.title}
                    </h3>
                  </div>
                </div>
                <div className='p-5'>
                  <p className='text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2'>
                    {treatment.description}
                  </p>
                  <span className='text-primary text-sm font-semibold hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all'>
                    Learn more <ArrowRight className='w-3.5 h-3.5' />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-10 sm:py-12 lg:py-16 bg-background-light dark:bg-background-dark'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-5 sm:mb-6'>
            <span className='text-primary font-medium tracking-wider uppercase text-[11px] sm:text-xs'>
              Testimonials
            </span>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1'>
              Healing Stories
            </h2>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5'>
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className='bg-white dark:bg-surface-dark p-4 sm:p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 relative pl-5 sm:pl-6 border-l-4 border-l-primary/50'
              >
                <div className='flex text-yellow-400 mb-2'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < Math.floor(testimonial.rating) ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                <p className='text-slate-600 dark:text-slate-300 mb-3 text-sm italic leading-snug'>
                  "{testimonial.content}"
                </p>
                <div className='flex items-center gap-3'>
                  <ImageWithFallback
                    alt={testimonial.name}
                    className='w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shrink-0'
                    src={testimonial.image}
                  />
                  <div className='min-w-0'>
                    <p className='font-semibold text-slate-900 dark:text-white text-sm truncate'>
                      {testimonial.name}
                    </p>
                    <p className='text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate'>
                      {testimonial.treatment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-12 sm:py-16 lg:py-20'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='relative bg-primary rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden text-center shadow-2xl dark:bg-slate-800 dark:border dark:border-primary/40 dark:shadow-2xl dark:shadow-primary/5'>
            <div className='absolute top-0 left-0 -mt-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-2xl dark:bg-primary/10'></div>
            <div className='absolute bottom-0 right-0 -mb-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl dark:bg-primary/10'></div>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white dark:text-white mb-4 relative z-10'>
              Ready to restore your natural balance?
            </h2>
            <p className='text-white/80 dark:text-slate-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto relative z-10'>
              Book your consultation today and take the first step towards a
              healthier, more holistic lifestyle.
            </p>
            <div className='flex flex-col sm:flex-row justify-center gap-4 relative z-10'>
              <button
                onClick={onStartJourney}
                className='px-8 py-3.5 bg-white text-primary font-bold rounded-lg shadow-lg hover:bg-slate-50 transition-colors dark:bg-primary dark:text-white dark:hover:bg-primary-dark'
              >
                Book Appointment
              </button>
              <button
                onClick={onExploreShop}
                className='px-8 py-3.5 bg-primary-dark text-white font-medium border border-white/30 rounded-lg hover:bg-white/10 transition-colors dark:bg-transparent dark:border-primary dark:text-primary dark:hover:bg-primary/20'
              >
                Explore Products
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
