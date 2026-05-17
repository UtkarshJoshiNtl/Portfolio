"use client";

import { useEffect, useRef, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
}

const WEEKS_TO_SHOW = 24;

export function GitHubCalendar() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch("/api/github/contributions");
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setContributions(data.contributions ?? []);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  useEffect(() => {
    if (!loading && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading, contributions]);

  if (loading) {
    return (
      <div className="flex h-full flex-col justify-between gap-2">
        <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/50">GitHub</div>
        <div className="flex gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-3 w-3 animate-pulse rounded-sm bg-white/15" />
          ))}
        </div>
      </div>
    );
  }

  if (error || contributions.length === 0) {
    return (
      <div className="flex h-full flex-col justify-between">
        <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/50">GitHub</div>
        <div className="text-xs text-white/60">Activity unavailable</div>
      </div>
    );
  }

  const contributionMap = new Map(contributions.map((c) => [c.date, c.count]));
  const totalContributions = contributions.reduce((sum, d) => sum + d.count, 0);
  const maxContributions = Math.max(...contributions.map((d) => d.count), 1);

  const today = new Date();
  const weeks: { date: string; count: number }[][] = [];
  let currentWeek: { date: string; count: number }[] = [];

  for (let i = WEEKS_TO_SHOW * 7 - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    currentWeek.push({ date: dateStr, count: contributionMap.get(dateStr) ?? 0 });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const getColor = (count: number) => {
    if (count === 0) return "bg-white/10";
    const intensity = count / maxContributions;
    if (intensity < 0.25) return "bg-green-900/50";
    if (intensity < 0.5) return "bg-green-700/70";
    if (intensity < 0.75) return "bg-green-600/85";
    return "bg-green-500";
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/60">Contributions</span>
        <span className="text-sm font-semibold text-white tabular-nums">{totalContributions}</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-x-auto overflow-y-hidden min-h-0">
        <div className="flex gap-0.5 min-w-fit h-full items-end pb-1">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-0.5">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`w-3 h-3 rounded-sm shrink-0 ${getColor(day.count)}`}
                  title={`${day.count} on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
