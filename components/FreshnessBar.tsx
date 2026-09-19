'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCw, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function FreshnessBar() {
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  const [secondsAgo, setSecondsAgo] = useState<number>(60);
  const [nextPullCountdown, setNextPullCountdown] = useState<number>(900);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Checked just now — up to date');
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const cooldownRef = useRef<number>(0);
  const lastHiddenRef = useRef<number>(Date.now());

  const refreshNow = useCallback(async (forced: boolean = false) => {
    const now = Date.now();
    if (!forced && now - cooldownRef.current < 30000) return;
    cooldownRef.current = now;
    setIsRefreshing(true);
    setStatusMessage('Checking customs gazettes…');

    try {
      const res = await fetch('/api/measures');
      if (res.ok) {
        setLastChecked(new Date());
        setSecondsAgo(0);
        setNextPullCountdown(900);
        setStatusMessage('Checked just now — up to date');
      }
    } catch {
      setStatusMessage('Showing cached legal instruments');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const handleVis = () => {
      if (document.visibilityState === 'hidden') {
        lastHiddenRef.current = Date.now();
      } else {
        if (Date.now() - lastHiddenRef.current > 300000) refreshNow(true);
        else refreshNow(false);
      }
    };
    window.addEventListener('visibilitychange', handleVis);
    return () => window.removeEventListener('visibilitychange', handleVis);
  }, [refreshNow]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsAgo((p) => p + 1);
      setNextPullCountdown((p) => (p > 0 ? p - 1 : 900));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isGreen = secondsAgo <= 1800; // Trade policy moves daily/hourly: 30m
  const isAmber = secondsAgo > 1800 && secondsAgo <= 10800; // 3h
  const timeUtc = lastChecked.toISOString().substring(11, 19);

  return (
    <div className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#E4E9F0] px-4 py-2 text-xs font-mono shadow-xs" aria-live="polite">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-[#0B1220]">
            <span className={`w-2.5 h-2.5 rounded-full ${isGreen ? 'bg-[#0BA360] animate-pulse' : isAmber ? 'bg-[#8A6100]' : 'bg-[#B42318]'}`} />
            {isGreen ? 'INSTRUMENT SYNC' : 'DELAYED'}
          </span>
          <span className="text-[#5B6779]">|</span>
          <span className="text-[#24303F]">
            DATA CHECKED <strong>{timeUtc} UTC</strong> · NEXT SCHEDULED PULL in <strong className="text-[#0E63C4]">{Math.floor(nextPullCountdown / 60)}m</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#5B6779] hidden md:inline">{statusMessage}</span>
          <button
            type="button"
            onClick={() => refreshNow(false)}
            disabled={isRefreshing}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#F6F8FB] border border-[#E4E9F0] hover:bg-[#EBF3FD] text-[#0B1220] transition"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#0E63C4]' : 'text-[#5B6779]'}`} />
            <span>{isRefreshing ? 'Checking…' : 'Check now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
