import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, Leaf, ExternalLink } from 'lucide-react';

const CLINIC_ADDRESS = '9 Avenues Commercial Building, Neel 9, Above CCD, 2nd Floor, Wakad, Pune 411057';
const CLINIC_EMAIL = 'info@drwellness.com';
const CLINIC_PHONE = '+91 7397826833';
const CLINIC_MAP_LINK = 'https://maps.app.goo.gl/PSgtkBo1DucpkPAT8';
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(CLINIC_ADDRESS)}&output=embed&z=17`;

export const Contact = () => {
  return (
    <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Find Us</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3">Our Clinic</h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            Visit us for personalized Ayurvedic consultations. We're here to guide you on your wellness journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-6"
          >
            <a
              href={CLINIC_MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Address</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{CLINIC_ADDRESS}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-2 group-hover:underline">
                    View on map <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </a>

            <a
              href={`mailto:${CLINIC_EMAIL}`}
              className="block p-6 rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Email</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{CLINIC_EMAIL}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-2 group-hover:underline">
                    Send email <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </a>

            <a
              href={`tel:${CLINIC_PHONE.replace(/\s/g, '')}`}
              className="block p-6 rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Phone</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{CLINIC_PHONE}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-2 group-hover:underline">
                    Call now <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-lg h-[400px] lg:h-[500px] relative">
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dr. Veda Wellness Clinic Location"
                className="absolute inset-0"
              />
              <a
                href={CLINIC_MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 px-4 py-2 bg-white dark:bg-surface-dark rounded-lg shadow-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
              >
                View larger map <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
