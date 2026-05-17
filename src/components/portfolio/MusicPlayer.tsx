"use client";

const LISTENFREE_URL = "https://listenfree.in/";

export function MusicPlayer() {
  return (
    <div className="flex flex-col h-full min-h-0 -mx-1 -mt-1">
      <div className="flex items-center justify-between px-1 pb-1 shrink-0">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-pink-100/80">
          ListenFree
        </span>
        <a
          href={LISTENFREE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="font-mono text-[8px] uppercase tracking-wider text-pink-200/60 hover:text-pink-100"
        >
          Open ↗
        </a>
      </div>
      <iframe
        src={LISTENFREE_URL}
        title="ListenFree Music"
        className="flex-1 w-full min-h-[140px] border-0 rounded-sm bg-black/20"
        allow="autoplay; encrypted-media"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
