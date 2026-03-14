import { useEffect, useState } from 'react';
import { Settings2, Activity, Zap } from 'lucide-react';

export default function StatusWidget({ performanceMode, setPerformanceMode }) {
  const [time, setTime] = useState('00:00');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed right-6 bottom-6 z-50 w-64 md:w-72 p-4 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl text-white">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          <span className="text-xs uppercase tracking-widest text-gray-300">Status</span>
        </div>
        <span className="text-xs font-semibold text-gray-200">{time}</span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[12px] text-gray-200 font-semibold">Mode</span>
          <span className="text-[12px] uppercase tracking-wider text-blue-200 font-bold">{performanceMode}</span>
        </div>

        <button
          onClick={() => setPerformanceMode(performanceMode === 'low' ? 'high' : 'low')}
          className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-2xl bg-white/10 border border-white/10 text-xs font-semibold text-white hover:bg-white/15 transition"
        >
          <Settings2 className="w-4 h-4" />
          {performanceMode === 'low' ? 'Boost Performance' : 'Power Mode'}
        </button>

        <div className="flex items-center justify-between text-[11px] text-gray-300">
          <span className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-300" />
            Tip
          </span>
          <span className="text-right">{performanceMode === 'low' ? 'Smooth experience' : 'Max visuals'}</span>
        </div>
      </div>
    </div>
  );
}
