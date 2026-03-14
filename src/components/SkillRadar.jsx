import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const radarPoints = (values, size) => {
  const count = values.length;
  const angleStep = (Math.PI * 2) / count;
  return values.map((value, idx) => {
    const angle = angleStep * idx - Math.PI / 2;
    const radius = value * (size / 2);
    return [
      size / 2 + Math.cos(angle) * radius,
      size / 2 + Math.sin(angle) * radius,
    ];
  });
};

export default function SkillRadar({ categories, isScrolling = false, paused = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -120px 0px' });
  const size = 230;

  const values = categories.map((cat) => {
    // infer a score based on number of skills
    const base = Math.min(1, cat.skills.length / 6);
    return Math.max(0.45, base);
  });

  const points = radarPoints(values, size);
  const path = points.map(([x, y], idx) => `${idx === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ') + ' Z';

  return (
    <div ref={ref} className="w-full max-w-[260px] mx-auto lg:mx-0">
      <div className="relative">
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="mx-auto">
          <defs>
            <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {[4, 3, 2, 1].map((n) => (
            <circle
              key={n}
              cx={size / 2}
              cy={size / 2}
              r={(size / 2) * (n / 4)}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          ))}

          {categories.map((cat, idx) => {
            const angle = (2 * Math.PI * idx) / categories.length - Math.PI / 2;
            const x = size / 2 + Math.cos(angle) * (size / 2 + 10);
            const y = size / 2 + Math.sin(angle) * (size / 2 + 10);
            return (
              <text
                key={cat.title}
                x={x}
                y={y}
                textAnchor={x > size / 2 ? 'start' : 'end'}
                dominantBaseline="middle"
                className="text-[10px] font-bold text-white"
              >
                {cat.title}
              </text>
            );
          })}

          <motion.path
            d={path}
            fill="url(#radarGradient)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0.6, pathLength: 0 }}
            animate={inView && !paused ? { opacity: 1, scale: 1, pathLength: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Animated Active Radar Scanner */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2.5}
            fill="none"
            stroke="url(#radarGradient)"
            strokeWidth="2"
            strokeDasharray="4 12"
            animate={!isScrolling && !paused ? { rotate: 360, scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{ originX: '50%', originY: '50%' }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs font-bold text-white tracking-widest">
            Skills
          </div>
        </div>
      </div>
    </div>
  );
}
