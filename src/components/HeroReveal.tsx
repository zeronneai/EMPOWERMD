import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';

/**
 * HeroReveal Component
 * 
 * Este componente crea una sección Hero con dos imágenes superpuestas.
 * La imagen superior (Triste) se "borra" mediante un clip-path irregular (blob)
 * para revelar la imagen inferior (Feliz).
 */
const HeroReveal: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values para la posición del cursor
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  // Springs optimizados para fluidez (especialmente en mobile)
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const trailConfig = { damping: 40, stiffness: 150, mass: 0.7 };
  
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  // Transformaciones para el clip-path principal (usando porcentajes para el SVG)
  const translateX = useTransform(smoothX, (v) => `${v - 50}%`);
  const translateY = useTransform(smoothY, (v) => `${v - 50}%`);
  
  // Transformaciones para la estela del clip-path
  const trailTranslateX = useTransform(trailX, (v) => `${v - 50}%`);
  const trailTranslateY = useTransform(trailY, (v) => `${v - 50}%`);

  // Transformaciones para los elementos visuales (usando viewport units o px para mejor rendimiento GPU)
  const visualX = useTransform(smoothX, (v) => `${v}%`);
  const visualY = useTransform(smoothY, (v) => `${v}%`);
  const visualTrailX = useTransform(trailX, (v) => `${v}%`);
  const visualTrailY = useTransform(trailY, (v) => `${v}%`);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mouseX, mouseY]);

  // Manejadores de eventos para efectos visuales (escala)
  const handlePointerEnter = () => setIsHovering(true);
  const handlePointerLeave = () => setIsHovering(false);

  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
      id="hero-reveal-container"
    >
      {/* Contenedor de las imágenes */}
      <div 
        ref={containerRef}
        className="relative w-full h-full cursor-none touch-none"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {/* Imagen A (Triste) - Fondo Base */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://res.cloudinary.com/dsprn0ew4/image/upload/v1773870186/Extreme_high-quality_studio_202603181531_bjwqzq.webp" 
            alt="Hombre Triste"
            className="w-full h-full object-cover grayscale brightness-75 blur-[3px]"
            referrerPolicy="no-referrer"
          />
          {/* Capa de gris neutro */}
          <div className="absolute inset-0 bg-gray-900/20 pointer-events-none" />
        </div>

        {/* Imagen B (Feliz) - Capa de Revelado */}
        <div 
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          style={{
            clipPath: `url(#water-drop-mask)`,
            WebkitClipPath: `url(#water-drop-mask)`,
          }}
        >
          <img 
            src="https://res.cloudinary.com/dsprn0ew4/image/upload/v1773870187/Extreme_high-quality_studio_202603181531-_1__rmvit5.webp" 
            alt="Hombre Feliz"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Definición del SVG para la máscara de "gota de agua" */}
        <svg className="absolute w-0 h-0 overflow-hidden">
          <defs>
            <clipPath id="water-drop-mask" clipPathUnits="objectBoundingBox">
              {/* Gota Principal */}
              <motion.path
                animate={{ 
                  d: [
                    "M0.5,0.05 C0.65,0.05 0.85,0.3 0.9,0.6 C0.95,0.9 0.75,0.95 0.5,0.95 C0.25,0.95 0.05,0.9 0.1,0.6 C0.15,0.3 0.35,0.05 0.5,0.05 Z",
                    "M0.5,0.1 C0.7,0.05 0.9,0.35 0.85,0.65 C0.8,0.9 0.65,0.98 0.5,0.92 C0.35,0.98 0.2,0.9 0.15,0.65 C0.1,0.35 0.3,0.05 0.5,0.1 Z",
                    "M0.5,0.05 C0.65,0.05 0.85,0.3 0.9,0.6 C0.95,0.9 0.75,0.95 0.5,0.95 C0.25,0.95 0.05,0.9 0.1,0.6 C0.15,0.3 0.35,0.05 0.5,0.05 Z"
                  ],
                  scale: isHovering ? 0.45 : 0.3
                }}
                transition={{ 
                  d: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.4 }
                }}
                style={{ 
                  x: translateX,
                  y: translateY,
                  transformOrigin: '50% 50%'
                }}
              />
              {/* Estela de la Gota */}
              <motion.path
                animate={{ 
                  d: [
                    "M0.5,0.2 C0.6,0.2 0.75,0.4 0.75,0.6 C0.75,0.8 0.65,0.85 0.5,0.85 C0.35,0.85 0.25,0.8 0.25,0.6 C0.25,0.4 0.4,0.2 0.5,0.2 Z"
                  ],
                  scale: isHovering ? 0.35 : 0.2
                }}
                style={{ 
                  x: trailTranslateX,
                  y: trailTranslateY,
                  transformOrigin: '50% 50%',
                  opacity: 0.5
                }}
              />
            </clipPath>
          </defs>
        </svg>

        {/* Elemento Visual "Estela" (Múltiples capas para efecto de rastro) */}
        <motion.div 
          className="absolute z-30 pointer-events-none will-change-transform"
          style={{
            left: 0,
            top: 0,
            x: visualX,
            y: visualY,
            translateX: '-50%',
            translateY: '-50%',
            width: '140px',
            height: '140px',
            scale: isHovering ? 1.5 : 1,
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
            border: '1px solid rgba(255,255,255,0.08)',
            filter: 'blur(8px)',
          }}
          animate={{
            borderRadius: [
              "40% 60% 70% 30% / 40% 50% 60% 50%",
              "60% 40% 30% 70% / 50% 60% 40% 60%",
              "40% 60% 70% 30% / 40% 50% 60% 50%"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute z-20 pointer-events-none opacity-50 will-change-transform"
          style={{
            left: 0,
            top: 0,
            x: visualTrailX,
            y: visualTrailY,
            translateX: '-50%',
            translateY: '-50%',
            width: '100px',
            height: '100px',
            scale: isHovering ? 1.2 : 0.8,
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(12px)',
          }}
        />
      </div>

      {/* Texto Superpuesto Centrado */}
      <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none px-4">
        <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-none text-center drop-shadow-2xl">
          TIRED OF <br className="md:hidden" /> THE PAIN?
        </h1>
        
        {/* Botón Mobile Parpadeante */}
        <div className="absolute bottom-12 md:hidden pointer-events-auto">
          <motion.button
            onClick={scrollToNext}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="px-8 py-3 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-full shadow-lg active:scale-95 transition-transform"
          >
            Yes, no more.
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroReveal;
