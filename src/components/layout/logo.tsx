export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className ?? ""}`}>
      <svg aria-hidden viewBox="0 0 40 36" className="h-8 w-9">
        <path
          d="M20 34 C 8 25, 1 18, 1 10.5 C 1 5, 5 1, 10.5 1 C 14.5 1, 18 3.5, 20 7 C 22 3.5, 25.5 1, 29.5 1 C 35 1, 39 5, 39 10.5 C 39 18, 32 25, 20 34 Z"
          fill="#F04452"
        />
        <path
          d="M4 17 H13 L16 11 L20 24 L23 15 L25 17 H36"
          fill="none"
          stroke="#071426"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-xl font-extrabold uppercase leading-none tracking-wide">
        Young<span className="text-cyan">Heartz</span>
      </span>
    </span>
  );
}
