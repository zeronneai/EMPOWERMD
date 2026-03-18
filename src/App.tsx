/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, ArrowRight, Menu, X, MapPin, Phone, Mail, Check, Video } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroReveal from "./components/HeroReveal";

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ onOpenServices, onOpenStory, onOpenWhatIs }: { onOpenServices: () => void; onOpenStory: () => void; onOpenWhatIs: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (callback: () => void) => {
    callback();
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-6 z-50 w-[90%] max-w-5xl mx-auto mb-12">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card py-4 px-6 md:px-8 flex justify-between items-center rounded-[40px] relative"
      >
        <div className="text-lg md:text-xl font-bold tracking-tighter shrink-0">
          EMPOWER <span className="text-purple-400">MD</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-light">
          <button 
            onClick={onOpenServices}
            className="hover:text-purple-400 transition cursor-pointer uppercase tracking-widest text-sm"
          >
            SERVICES
          </button>
          <button 
            onClick={onOpenStory}
            className="hover:text-purple-400 transition cursor-pointer uppercase tracking-widest text-sm"
          >
            THE STORY
          </button>
          <button 
            onClick={onOpenWhatIs}
            className="hover:text-purple-400 transition cursor-pointer uppercase tracking-widest text-sm"
          >
            WHAT IS?
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <a 
            href="https://empowermd.sigmamd.com/signup/membership2?step=enroll-members"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block bg-white text-black px-4 md:px-6 py-2 rounded-full text-[10px] md:text-sm font-bold hover:bg-purple-400 transition cursor-pointer whitespace-nowrap"
          >
            JOIN NOW
          </a>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-4 glass-card p-8 rounded-[30px] flex flex-col gap-8 md:hidden border border-white/10 z-[60] shadow-2xl"
            >
              <button 
                onClick={() => handleNavClick(onOpenServices)}
                className="text-left text-white hover:text-purple-400 transition uppercase tracking-[0.2em] text-sm font-bold border-b border-white/5 pb-4"
              >
                SERVICES
              </button>
              <button 
                onClick={() => handleNavClick(onOpenStory)}
                className="text-left text-white hover:text-purple-400 transition uppercase tracking-[0.2em] text-sm font-bold border-b border-white/5 pb-4"
              >
                THE STORY
              </button>
              <button 
                onClick={() => handleNavClick(onOpenWhatIs)}
                className="text-left text-white hover:text-purple-400 transition uppercase tracking-[0.2em] text-sm font-bold border-b border-white/5 pb-4"
              >
                WHAT IS?
              </button>
              <a 
                href="https://empowermd.sigmamd.com/signup/membership2?step=enroll-members"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden bg-purple-500 text-white px-6 py-4 rounded-2xl text-center text-sm font-bold hover:bg-purple-600 transition"
              >
                JOIN NOW
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

const FAQModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const faqs = [
    {
      question: "What is Direct Primary Care (DPC)?",
      answer: "Direct Primary Care is a membership-based healthcare model that puts you first. Instead of navigating insurance companies and copays, you pay a simple, flat monthly fee for unlimited access to comprehensive primary care. You get direct access to Dr. Nevarez via phone, text, or email whenever you need her—no waiting rooms, no rushed appointments, and no insurance approvals. With DPC, you're not just a patient number; you're part of a small practice where your doctor knows you, listens to you, and has the time to truly care for you. It's healthcare the way it should be."
    },
    {
      question: "How does DPC differ from traditional insurance?",
      answer: "Traditional insurance involves copays, deductibles, limited appointment times, and insurance company approval for treatments. DPC eliminates these barriers. You pay a predictable monthly fee and get unlimited visits, direct doctor access, and no insurance approvals needed. DPC focuses on prevention and wellness rather than just treating illness. You can still carry catastrophic insurance for major medical events."
    },
    {
      question: "What services are included in my DPC membership?",
      answer: "Your membership includes unlimited primary care visits (in-person or virtual), direct text and phone access to Dr. Nevarez, women's health services, men's health services, mental health care, chronic disease management, preventive medicine, urgent care, and lifestyle wellness counseling. You also receive transparent pricing on labs, imaging, and medications with significant discounts."
    },
    {
      question: "How much does DPC cost?",
      answer: "Our Founder's pricing is: Individual Membership - $79/month, Couple Membership - $139/month, Family Membership (up to 4 people) - $237/month, and additional children (ages 4-17) - $49/month. These are our founding member rates and are limited to our first 100 members. There are no hidden fees or surprise charges."
    },
    {
      question: "Can I still use my insurance with DPC?",
      answer: "Yes! DPC works alongside insurance. Many members use DPC as their primary care and maintain catastrophic or high-deductible health insurance for major medical events, surgeries, or hospitalizations. DPC is not insurance—it's a membership for primary care services. This combination gives you the best of both worlds: affordable, accessible primary care through DPC and financial protection for major medical events through insurance."
    },
    {
      question: "How quickly can I get an appointment?",
      answer: "One of the biggest advantages of DPC is access. Most members get same-day or next-day appointments. For urgent issues, you can text or call Dr. Nevarez directly. There are no waiting rooms or rushed 10-minute visits. Appointments are typically 30-60 minutes, giving Dr. Nevarez time to truly understand your health concerns."
    },
    {
      question: "What if I need to see a specialist?",
      answer: "While DPC focuses on primary care, Dr. Nevarez can refer you to trusted specialists in the El Paso area when needed. Dr. Nevarez will coordinate your care to ensure continuity. Many lab tests and imaging can be done at discounted rates through our network."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col rounded-[40px] border-white/10"
          >
            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-3xl font-bold tracking-tighter uppercase">Frequently Asked Questions</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="space-y-8">
                {faqs.map((faq, i) => (
                  <div key={i} className="space-y-3">
                    <h3 className="text-xl font-bold text-purple-400 tracking-tight">{faq.question}</h3>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border-t border-white/10 bg-white/5 text-center">
              <p className="text-gray-500 text-xs uppercase tracking-widest">Empower MD • Personalized Healthcare Excellence</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const WhatIsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const steps = [
    {
      number: "1",
      title: "Choose Your Plan",
      description: "Select a membership plan that fits your needs and budget"
    },
    {
      number: "2",
      title: "Become a Member",
      description: "Complete your membership enrollment and get immediate access"
    },
    {
      number: "3",
      title: "Access Your Doctor",
      description: "Contact us anytime via phone, email, or in-person appointments"
    },
    {
      number: "4",
      title: "Enjoy Quality Care",
      description: "Receive personalized, comprehensive primary care without insurance delays"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col rounded-[40px] border-white/10"
          >
            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-3xl font-bold tracking-tighter uppercase">What is Direct Primary Care?</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="space-y-12">
                <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                  <p>
                    Direct Primary Care is a healthcare delivery model where patients pay a monthly or annual membership fee to have direct access to their primary care physician. This model eliminates the insurance company as a middleman, allowing doctors to focus on patient care rather than administrative tasks.
                  </p>
                  <p>
                    At EmpowerMD, we believe this approach provides better healthcare outcomes, lower costs, and a stronger doctor-patient relationship.
                  </p>
                </div>

                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-center uppercase tracking-widest text-white">How It Works</h3>
                  <div className="space-y-4">
                    {steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-6 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xl border border-purple-500/30 group-hover:bg-purple-500 group-hover:text-white transition-all">
                          {step.number}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1 tracking-tight">{step.title}</h4>
                          <p className="text-gray-400 text-sm">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-white/10 bg-white/5 text-center">
              <p className="text-gray-500 text-xs uppercase tracking-widest">Empower MD • Personalized Healthcare Excellence</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const StoryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col rounded-[40px] border-white/10"
          >
            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-3xl font-bold tracking-tighter uppercase">My Story</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                <p>
                  I'm a proud El Paso native and Socorro High School graduate with deep roots in this community. As a board-certified family physician, my journey has been shaped by a commitment to excellence and service. I earned my degrees at UTEP, completed medical school through Texas Tech, and trained right here in El Paso—where I was honored to serve as Chief Resident during my Family Medicine residency. This foundation gave me not just medical knowledge, but a profound understanding of the families and communities I serve.
                </p>
                <p>
                  Throughout my career, I've had the privilege of caring for families across our region—from serving the Fabens community to leading a diabetes care clinic and working as Medical Director for a school district employee health clinic. Each role reinforced a fundamental truth: healthcare is about relationships, not just transactions. I've witnessed firsthand how personalized, attentive care transforms lives and empowers people to take charge of their health.
                </p>
                <p>
                  This is why I founded EmpowerMD Primary Care & Family Medicine – El Paso. I created this practice to deliver the kind of accessible, relationship-based care that modern medicine often overlooks. Through our Direct Primary Care model, we focus on what matters most: prevention, trust, and empowering you to take control of your health. Here, you're not just a patient—you're a partner in your own wellness journey.
                </p>
              </div>
            </div>

            <div className="p-8 border-t border-white/10 bg-white/5 text-center">
              <p className="text-gray-500 text-xs uppercase tracking-widest">Empower MD • Personalized Healthcare Excellence</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ServicesModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const categories = [
    {
      title: "1. Primary Care",
      items: [
        "Annual physical exams",
        "Diabetes",
        "Hypertension",
        "Preventive care",
        "Blood pressure monitoring",
        "Cholesterol testing",
        "Weight management",
        "Lab testing & blood work",
        "Specialist coordination",
        "Sports Physicals"
      ]
    },
    {
      title: "2. Women's & Men's Health",
      items: [
        "Pap smears",
        "Contraceptive counseling",
        "Breast exams",
        "Mammogram referrals",
        "Menopause management",
        "Hormone therapy",
        "Erectile dysfunction",
        "STI testing",
        "Pelvic exams"
      ]
    },
    {
      title: "3. Urgent Care",
      items: [
        "Cuts and lacerations",
        "Sprains and strains",
        "Respiratory infections",
        "Ear infections",
        "Strep throat",
        "Sinus infections",
        "Urinary tract infection (UTI)",
        "Gastrointestinal issues",
        "Rashes & allergic reactions",
        "Abscess drainage",
        "Skin infections",
        "Rapid strep tests",
        "Rapid Flu (extra cost for materials)",
        "Rapid Covid (extra cost for materials)"
      ]
    },
    {
      title: "4. Mental Health",
      items: [
        "Depression Management",
        "Anxiety management",
        "Stress management",
        "ADHD management",
        "Counseling referrals",
        "Medication management",
        "Sleep disorder assessment",
        "Substance abuse support"
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-card w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col rounded-[40px] border-white/10"
          >
            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-3xl font-bold tracking-tighter uppercase">Our Services</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((cat, idx) => (
                  <div key={idx} className="space-y-6">
                    <h3 className="text-purple-400 font-bold text-xl border-b border-purple-500/30 pb-2">
                      {cat.title}
                    </h3>
                    <ul className="space-y-3">
                      {cat.items.map((item, i) => (
                        <li key={i} className="text-gray-400 text-sm flex items-start gap-2 leading-tight">
                          <span className="text-purple-500 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border-t border-white/10 bg-white/5 text-center">
              <p className="text-gray-500 text-xs uppercase tracking-widest">Empower MD • Personalized Healthcare Excellence</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Services = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean; setIsModalOpen: (open: boolean) => void }) => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <ServicesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        <motion.div 
          whileHover={{ y: -10 }}
          className="md:col-span-8 glass-card p-12 min-h-[450px] flex flex-col justify-end relative overflow-hidden group rounded-[40px]"
        >
          <h3 className="text-4xl font-bold mb-4">Healthcare Was Never Meant To Feel This Rushed.</h3>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            At EmpowerMD, Dr. Alba Nevarez offers Direct Primary Care in El Paso with longer visits, direct access to your doctor, and personalized care through a simple monthly membership.
            <br /><br />
            Members save up to 95% on items like lab work, enjoy same-day or next-day visits with no wait times, and get direct access to their doctor via text, phone, or email. You get personal, high-touch care without the hassle of traditional insurance.
          </p>
          <div className="mt-8 h-1 w-20 bg-purple-500"></div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -10 }}
          className="md:col-span-4 glass-card p-8 flex flex-col justify-center items-start bg-purple-600/10 border-purple-500/20 rounded-[40px]"
        >
          <h3 className="text-2xl font-bold mb-6 text-purple-400">INCLUDES:</h3>
          <ul className="text-left space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-2">✓ Urgent care</li>
            <li className="flex items-center gap-2">✓ Men's health</li>
            <li className="flex items-center gap-2">✓ Mental health care</li>
            <li className="flex items-center gap-2">✓ Primary care</li>
            <li className="flex items-center gap-2">✓ Women's health</li>
            <li className="flex items-center gap-2">✓ Chronic conditions</li>
          </ul>
        </motion.div>

        <motion.div 
          whileHover={{ y: -10 }}
          className="md:col-span-4 glass-card p-8 flex flex-col justify-between group rounded-[40px]"
        >
          <h3 className="text-2xl font-bold">VIEW OUR <br /> SERVICES</h3>
          <p className="text-sm text-gray-400">Comprehensive care tailored to your needs, from primary care to urgent and mental health support.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-purple-400 mt-6 flex items-center gap-2 group-hover:translate-x-2 transition-transform cursor-pointer"
          >
            SEE MORE <ArrowRight size={16} />
          </button>
        </motion.div>

        <motion.div 
          className="md:col-span-8 glass-card p-12 bg-white/5 border-dashed border-white/20 flex items-center justify-center rounded-[40px]"
        >
          <div className="text-center">
            <h2 className="text-3xl font-light italic text-white/80">
              "At EmpowerMD, we replace insurance hassles with personalized care that makes you feel heard."
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const HealthcareComparison = ({ onOpenFAQ }: { onOpenFAQ: () => void }) => (
  <section className="py-24 px-6 max-w-7xl mx-auto relative">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-white">
        Why Patients Are Frustrated With Healthcare Today
      </h2>
      <p className="text-gray-400 max-w-4xl mx-auto leading-relaxed text-lg">
        Most patients today feel stuck in a healthcare system that moves too fast.
        Appointments are often rushed. Doctors are expected to see 25-35 patients
        per day, leaving little time to truly listen or understand a patient's health
        concerns. Many people wait weeks for an appointment only to spend just a
        few minutes with their provider. Patients deserve more than rushed visits and
        confusing insurance systems. They deserve a doctor who has time for them.
      </p>
      <div className="w-full h-px bg-white/10 mt-16 max-w-3xl mx-auto"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {/* Traditional Healthcare */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card p-10 rounded-[40px] border-red-500/10 bg-red-500/5"
      >
        <h3 className="text-2xl font-bold mb-8 text-red-400 uppercase tracking-widest">Traditional Healthcare</h3>
        <ul className="space-y-6">
          {[
            "Limited appointment times",
            "Insurance approval required",
            "Copays and hidden fees",
            "Rushed consultations"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-4 text-gray-400">
              <X className="text-red-500/50 shrink-0" size={18} />
              <span className="text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Direct Primary Care */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card p-10 rounded-[40px] border-emerald-500/10 bg-emerald-500/5"
      >
        <h3 className="text-2xl font-bold mb-8 text-emerald-400 uppercase tracking-widest">Direct Primary Care</h3>
        <ul className="space-y-6">
          {[
            "Unlimited visits and consultations",
            "Direct access to your doctor",
            "No copays or hidden fees",
            "Extended appointment times"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-4 text-gray-400">
              <Check className="text-emerald-500 shrink-0" size={18} />
              <span className="text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>

    <div className="text-center">
      <button 
        onClick={onOpenFAQ}
        className="bg-emerald-500/20 text-emerald-400 px-8 py-3 rounded-full text-sm font-bold hover:bg-emerald-500/30 transition-all border border-emerald-500/30 uppercase tracking-widest cursor-pointer"
      >
        View Frequently Asked Questions
      </button>
    </div>
  </section>
);

const Founder = () => (
  <section className="py-32 bg-white/5 backdrop-blur-3xl border-y border-white/10">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
      <div className="w-64 h-64 md:w-80 md:h-96 glass-card rounded-[40px] overflow-hidden border-2 border-purple-500/30">
        <img 
          src="https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto/v1773767420/Genera_esta_imagen_con_la_doctora_sonriendo_sin_te_delpmaspu_hltfcn.jpg" 
          alt="Dr. Alba Nidia Nevarez"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex-1">
        <span className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-4 block">Founder & Visionary</span>
        <h2 className="text-4xl font-bold mb-6">DR. ALBA NIDIA NEVAREZ</h2>
        <div className="space-y-6 text-gray-400 leading-relaxed">
          <p>
            Dr. Alba Nevarez founded EmpowerMD to restore the kind of doctor-patient relationship that many people feel has been lost in modern healthcare. After training at Texas Tech University Health Sciences Center, Dr. Nevarez returned home to El Paso with a mission to serve the community that shaped her.
          </p>
          <p>
            But working within the traditional healthcare system, she saw firsthand how difficult it was for physicians to give patients the time and attention they truly deserved. Doctors were forced to rush from room to room, while patients were left feeling unheard. That experience inspired Dr. Nevarez to create EmpowerMD, a new model of care focused on access, trust, and long-term health.
          </p>
          <div className="pt-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-3">My Philosophy</h4>
            <p className="italic text-lg text-purple-200">
              "I believe healthcare should be about healing relationships, not insurance hassles. At EmpowerMD, we're returning to the fundamentals of medicine; listening, caring, and healing."
            </p>
          </div>
        </div>
        <div className="h-[1px] w-32 bg-purple-500/50 my-8"></div>
        <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Empower MD Founder</p>
      </div>
    </div>
  </section>
);

const Pricing = () => {
  const plans = [
    {
      name: "Individual Membership",
      price: "$79",
      target: "For individual",
      note: "(Children ages 4-17 may be added to membership $49/Child)",
      features: "Unlimited visits, direct access to Dr. Nevarez via text or call, same-day or next-day appointments, no copays or hidden fees, and comprehensive preventive care.",
      buttonText: "Join Individual Plan",
      popular: false
    },
    {
      name: "Couple Membership",
      price: "$139",
      target: "For couples",
      note: "(Children ages 4-17 may be added to membership $49/Child)",
      features: "All benefits of the Individual plan for two adults. Enjoy personalized care, direct communication with your doctor, and transparent pricing for you and your partner.",
      buttonText: "Enroll as a Couple",
      popular: true
    },
    {
      name: "Family Membership",
      price: "$237",
      target: "For families up to 4 people",
      note: "(Children ages 4-17 may be added to membership $49/Child)",
      features: "Comprehensive DPC care for up to 4 family members (2 adults, 2 children). Includes unlimited visits, direct doctor access, and all the benefits of DPC for your entire family.",
      buttonText: "Start Family Care",
      popular: false
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-block bg-purple-600/20 text-purple-400 text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1 rounded-full mb-4 border border-purple-500/30">
          Founder's Pricing • Limited Availability
        </div>
        <h2 className="text-5xl font-bold mb-4 hero-text uppercase tracking-tighter">Your Health, Your Way</h2>
        <p className="text-gray-400 uppercase tracking-[0.3em] text-xs">No hidden fees. No insurance hassles. Just care.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className={`glass-card p-10 rounded-[40px] flex flex-col items-center text-center relative ${
              plan.popular ? 'border-purple-500/50 bg-purple-500/5' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                Most Popular
              </div>
            )}
            
            <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight">{plan.name}</h3>
            
            <div className="mb-6">
              <span className="text-5xl font-bold text-purple-400">{plan.price}</span>
              <span className="text-gray-500 text-sm">/month</span>
            </div>

            <p className="text-purple-300/80 text-sm font-medium mb-2">{plan.target}</p>
            <p className="text-gray-500 text-[10px] italic mb-8 leading-tight">{plan.note}</p>

            <div className="flex-1 mb-10">
              <p className="text-gray-400 text-sm leading-relaxed">
                {plan.features}
              </p>
            </div>

            <a
              href="https://empowermd.sigmamd.com/signup/membership2?step=enroll-members"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-4 rounded-full font-bold transition-all duration-300 text-sm uppercase tracking-widest ${
                plan.popular 
                ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}
            >
              {plan.buttonText}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ContactForm = () => (
  <section className="py-24 px-6 max-w-4xl mx-auto relative">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white uppercase">
        Is Direct Primary Care Right for You?
      </h2>
      <div className="h-1 w-20 bg-purple-500 mx-auto"></div>
    </div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-8 md:p-12 rounded-[40px] border-white/10 bg-white/5"
    >
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6 border border-purple-500/30">
          <Video className="text-purple-400" size={32} />
        </div>
        <h3 className="text-3xl font-bold mb-4 tracking-tight">Request a Video Call</h3>
        <p className="text-gray-400 max-w-lg leading-relaxed">
          Let Dr. Nevarez know you're interested in scheduling a complimentary 10 minute video meet and greet. We'll reach out to confirm your appointment.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Full Name</label>
            <input 
              type="text" 
              placeholder="Your Full Name"
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Email</label>
            <input 
              type="email" 
              placeholder="your@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Phone</label>
            <input 
              type="tel" 
              placeholder="(915) 123-4567"
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Membership Interest</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer">
              <option className="bg-[#0a0a0a]">Individual Membership</option>
              <option className="bg-[#0a0a0a]">Couple Membership</option>
              <option className="bg-[#0a0a0a]">Family Membership</option>
            </select>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-5 rounded-full transition-all duration-300 uppercase tracking-[0.2em] text-sm mt-4 shadow-lg shadow-purple-600/20"
        >
          Request Callback
        </button>
      </form>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="py-20 px-6 border-t border-white/10 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-[150px] -z-10"></div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
      <div>
        <h3 className="text-2xl font-bold mb-6">EMPOWER MD</h3>
        <p className="text-gray-500 text-sm leading-relaxed">Redefining healthcare in El Paso through personalized medicine and cutting-edge technology.</p>
      </div>
      <div>
        <h4 className="text-xs font-bold tracking-[0.3em] uppercase mb-8 text-purple-400">CONTACT</h4>
        <div className="space-y-6">
          <div className="flex gap-4">
            <MapPin className="text-purple-400 shrink-0" size={20} />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">Address</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                1265 Joe Battle Blvd, Suite 102B<br />
                El Paso, TX 79936
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone className="text-purple-400 shrink-0" size={20} />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">Phone</p>
              <p className="text-sm text-gray-500">915.235.3768</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail className="text-purple-400 shrink-0" size={20} />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">Email</p>
              <p className="text-sm text-gray-500">membership@empowermdelpaso.com</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold tracking-[0.3em] uppercase mb-6 text-purple-400">Newsletter</h4>
        <div className="relative">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-transparent border-b border-white/20 py-2 focus:border-purple-500 outline-none transition"
          />
          <button className="absolute right-0 top-2 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-purple-400 transition">
            Join
          </button>
        </div>
      </div>
    </div>
    <div className="mt-20 text-center text-[10px] tracking-widest text-gray-600 uppercase">
      © {new Date().getFullYear()} Empower MD • Engineering Human Potential
    </div>
  </footer>
);

export default function App() {
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  const [isWhatIsModalOpen, setIsWhatIsModalOpen] = useState(false);

  return (
    <div className="bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="mesh-gradient absolute inset-0 animate-mesh" />
      </div>

      <div className="relative z-10">
        <HeroReveal />
        <Navbar 
          onOpenServices={() => setIsServicesModalOpen(true)} 
          onOpenStory={() => setIsStoryModalOpen(true)} 
          onOpenWhatIs={() => setIsWhatIsModalOpen(true)}
        />
        <StoryModal isOpen={isStoryModalOpen} onClose={() => setIsStoryModalOpen(false)} />
        <WhatIsModal isOpen={isWhatIsModalOpen} onClose={() => setIsWhatIsModalOpen(false)} />
        <FAQModal isOpen={isFAQModalOpen} onClose={() => setIsFAQModalOpen(false)} />
        <Services isModalOpen={isServicesModalOpen} setIsModalOpen={setIsServicesModalOpen} />
        <HealthcareComparison onOpenFAQ={() => setIsFAQModalOpen(true)} />
        <Founder />
        <Pricing />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}
