import { LucideIcon } from 'lucide-react';

export interface Treatment {
  id: string;
  title: string;
  description: string;
  image: string;
  purpose?: string;
  fullDescription?: string;
  benefits?: string[];
  duration?: string;
  idealFor?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  tag?: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  content: string;
  image: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorTitle?: string;
  publishedAt: string;
  category: string;
  readTime?: string;
}

import doctor from './content/doctor.json';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Your Dosha: A Beginner\'s Guide to Ayurvedic Constitution',
    excerpt: 'Learn how Vata, Pitta, and Kapha influence your health and how to identify your unique constitution for better wellness.',
    content: `Ayurveda teaches that every individual has a unique constitution determined by the balance of three fundamental energies—Vata, Pitta, and Kapha.

**What are Doshas?**
- **Vata** (Air + Space): Governs movement, creativity, and nervous system.
- **Pitta** (Fire + Water): Governs metabolism, digestion, and transformation.
- **Kapha** (Earth + Water): Governs structure, stability, and lubrication.

Understanding your constitution helps you make better choices—from diet and exercise to daily routines.`,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    author: doctor.blogAuthor,
    authorTitle: 'B.A.M.S., M.D. (Ayurveda)',
    publishedAt: '2024-01-15',
    category: 'Wellness',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'The Science Behind Panchakarma: Why Detox Matters',
    excerpt: 'A deep dive into how Panchakarma removes toxins at the cellular level and restores your body\'s natural balance.',
    content: `Panchakarma is a scientifically structured detoxification protocol refined over thousands of years.

**The Five Actions**
Panchakarma includes Vamana, Virechana, Basti, Nasya, and Raktamokshana. In modern practice, we use gentler adaptations like Abhyanga, Swedana, and Shirodhara.

**Why Toxins Accumulate**
Modern lifestyle—processed foods, stress, pollution—weakens Agni (digestive fire). Undigested food and metabolic waste (Ama) accumulate in tissues.

**Who Benefits**
Those with chronic digestive issues, skin problems, joint pain, or general fatigue often see remarkable improvement.`,
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80',
    author: doctor.blogAuthor,
    authorTitle: 'B.A.M.S., M.D. (Ayurveda)',
    publishedAt: '2024-02-01',
    category: 'Detox',
    readTime: '6 min read',
  },
  {
    id: '3',
    title: 'Ashwagandha: The Adaptogen for Modern Stress',
    excerpt: 'Evidence-based insights on how Ashwagandha supports stress resilience, sleep, and cognitive function.',
    content: `Ashwagandha (Withania somnifera) is one of the most researched Ayurvedic herbs.

**Key Benefits**
- **Cortisol Reduction**: Studies show significant reduction in cortisol levels.
- **Sleep Quality**: Improves sleep onset and quality.
- **Cognitive Function**: Supports memory, focus, and reaction time.

**How to Use**
Quality matters. Choose standardized extracts from reputable brands. Dosage typically ranges from 300–600 mg daily. Consult an Ayurvedic practitioner for personalized guidance.`,
    image: 'https://images.unsplash.com/photo-1584017945366-b97b0e35a63b?auto=format&fit=crop&w=800&q=80',
    author: doctor.blogAuthor,
    authorTitle: 'B.A.M.S., M.D. (Ayurveda)',
    publishedAt: '2024-02-18',
    category: 'Herbs & Research',
    readTime: '4 min read',
  },
];

export const TREATMENTS: Treatment[] = [
  {
    id: '1',
    title: 'Panchakarma',
    description: 'Complete detoxification therapies to cleanse the body of toxins and rejuvenate tissues.',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80',
    purpose: 'Panchakarma is Ayurveda\'s most profound detoxification and rejuvenation therapy. It aims to eliminate deep-rooted toxins (Ama) from the body, restore the natural balance of Doshas, and revitalize tissues for long-term wellness.',
    fullDescription: 'Derived from Sanskrit—"Pancha" (five) and "Karma" (actions)—this therapy involves five purification procedures tailored to your unique constitution. Under expert supervision, treatments like Abhyanga (oil massage), Swedana (steam therapy), and Basti (medicated enema) work together to cleanse the body at a cellular level.',
    benefits: ['Removes accumulated toxins and metabolic waste', 'Restores digestive fire (Agni) and gut health', 'Improves energy, clarity, and mental focus', 'Enhances skin glow and overall vitality', 'Supports chronic condition management'],
    duration: '7–21 days (intensive program)',
    idealFor: 'Those seeking deep detox, recovering from chronic illness, or preparing for a lifestyle reset.',
  },
  {
    id: '2',
    title: 'Diet Consultation',
    description: 'Personalized nutrition plans based on your Dosha type to improve digestion and energy.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    purpose: 'Ayurvedic diet consultation creates a personalized eating plan aligned with your Dosha (Vata, Pitta, Kapha), digestive capacity, and lifestyle. The goal is to strengthen Agni (digestive fire), nourish tissues, and prevent disease through mindful nutrition.',
    fullDescription: 'Unlike one-size-fits-all diets, Ayurveda recognizes that each body has unique needs. Through Nadi Pariksha (pulse diagnosis) and detailed assessment, we identify your constitution and imbalances. Your plan includes food choices, meal timing, cooking methods, and spices that support your specific needs.',
    benefits: ['Improved digestion and nutrient absorption', 'Sustained energy throughout the day', 'Weight management without deprivation', 'Reduced bloating, acidity, and digestive discomfort', 'Better sleep and mental clarity'],
    duration: 'Ongoing guidance with follow-up sessions',
    idealFor: 'Anyone with digestive issues, fatigue, weight concerns, or interest in eating according to their body type.',
  },
  {
    id: '3',
    title: 'Herbal Medicine',
    description: 'Custom formulated herbal remedies targeting specific health concerns safely.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    purpose: 'Ayurvedic herbal medicine uses plant-based formulations—single herbs or combinations—to address root causes of illness. These remedies work with your body\'s natural healing mechanisms, supporting organs and systems without harsh side effects.',
    fullDescription: 'Our formulations are prepared from traditionally used herbs like Ashwagandha, Triphala, Turmeric, and Brahmi. Each prescription is customized after assessing your Prakriti (constitution), Vikriti (imbalance), and current health goals. We prioritize purity, correct sourcing, and appropriate dosage.',
    benefits: ['Targeted support for specific health concerns', 'Gentle, time-tested ingredients', 'Works in harmony with conventional care when needed', 'Supports immunity, stress, sleep, and digestion', 'No synthetic chemicals or unnecessary additives'],
    duration: 'Varies by condition; typically 4–12 weeks',
    idealFor: 'Those seeking natural alternatives for stress, immunity, digestion, skin, or chronic conditions.',
  },
  {
    id: '4',
    title: 'Lifestyle Yoga',
    description: 'Therapeutic yoga asanas and breathing techniques to support your healing journey.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    purpose: 'Lifestyle Yoga integrates therapeutic asanas (postures), Pranayama (breathing), and mindfulness practices tailored to your Dosha and health goals. It is not just exercise—it is a tool for balancing body, mind, and breath in daily life.',
    fullDescription: 'Each session is designed around your constitution and current imbalances. For example, grounding poses for Vata, cooling practices for Pitta, and invigorating flows for Kapha. We emphasize breath awareness, proper alignment, and gradual progression to avoid strain.',
    benefits: ['Improved flexibility, strength, and posture', 'Reduced stress and anxiety through breath work', 'Better sleep and mental clarity', 'Enhanced circulation and organ function', 'Sustainable daily practice you can do at home'],
    duration: 'Sessions of 45–60 minutes; ongoing practice recommended',
    idealFor: 'Anyone wanting to integrate yoga into their wellness routine in a safe, personalized way.',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Chyawanprash',
    category: 'Immunity Boosters',
    price: 34.00,
    rating: 4,
    reviews: 128,
    tag: 'Best Seller',
    description: 'Ancient formula with 40+ herbs to boost strength & stamina.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Amla_%28Hindi-_%E0%A4%86%E0%A4%AE%E0%A4%B2%E0%A4%BE%29_%284450427994%29.jpg',
  },
  {
    id: '2',
    name: 'Pure Ashwagandha',
    category: 'Stress & Sleep',
    price: 22.50,
    rating: 5,
    reviews: 450,
    description: 'Adaptogenic root extract to reduce cortisol and improve focus.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Ashwagandha_Roots.jpg',
  },
  {
    id: '3',
    name: 'Triphala Gut Balance',
    category: 'Digestive Health',
    price: 18.00,
    rating: 4.5,
    reviews: 89,
    description: 'Gentle detox and digestive support for daily wellness.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Haritaki_%28Sanskrit-_%E0%A4%B9%E0%A4%B0%E0%A5%80%E0%A4%A4%E0%A4%95%E0%A5%80%29_%283308328291%29.jpg',
  },
  {
    id: '4',
    name: 'Golden Curcumin',
    category: 'Immunity Boosters',
    price: 28.00,
    rating: 5,
    reviews: 210,
    description: 'Potent turmeric extract with 95% curcuminoids.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Lakadong_Turmeric_Powder_final_product.jpg',
  },
  {
    id: '5',
    name: 'Kumkumadi Oil',
    category: 'Skin & Hair Care',
    price: 45.00,
    rating: 5,
    reviews: 52,
    description: "The 'Miracle Elixir' for glowing, youthful skin.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Saffron-spice_adjusted.jpg',
  },
  {
    id: '6',
    name: 'Ayurvedic Pain Balm',
    category: 'Detox & Cleanse',
    price: 12.00,
    rating: 4,
    reviews: 310,
    description: 'Instant relief for headaches and muscle aches.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Tigerbalm.jpg',
  },
  {
    id: '7',
    name: 'Brahmi Brain Capsules',
    category: 'Stress & Sleep',
    price: 26.00,
    rating: 4.5,
    reviews: 95,
    description: 'Supports memory, focus and mental clarity with Brahmi extract.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Bacopa_monnieri_Brahmi_flower.jpg',
  },
  {
    id: '8',
    name: 'Tulsi Immunity Drops',
    category: 'Immunity Boosters',
    price: 16.00,
    rating: 5,
    reviews: 180,
    description: 'Holy basil extract for natural immunity and respiratory support.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Tulsi_or_Tulasi_Holy_basil.jpg',
  },
  {
    id: '9',
    name: 'Shatavari Women\'s Wellness',
    category: 'Digestive Health',
    price: 32.00,
    rating: 4.5,
    reviews: 67,
    description: 'Traditional herb for hormonal balance and digestive support.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Asparagus_racemosus.JPG',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    treatment: 'Digestive Health',
    content: doctor.testimonialsDigestive,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    treatment: 'Detoxification',
    content: "The Panchakarma therapy was an incredible experience. The clinic is so serene, and the staff is incredibly professional. Highly recommend for anyone looking for authentic Ayurveda.",
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
  },
  {
    id: '3',
    name: 'Priya Patel',
    treatment: 'Skin Care',
    content: doctor.testimonialsHerbal,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 4.5,
  },
];
