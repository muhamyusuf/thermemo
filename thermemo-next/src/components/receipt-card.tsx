import { cn } from "@/lib/utils";

const toneGradients: Record<string, string> = {
  g1: 'linear-gradient(160deg, #b0aba2, #3b3631)',
  g2: 'linear-gradient(200deg, #d4cfc6, #2a2622)',
  g3: 'linear-gradient(135deg, #9b9690, #545049)',
  g4: 'linear-gradient(180deg, #cac4ba, #6a625a)',
  g5: 'linear-gradient(220deg, #88847e, #1a1816)',
  g6: 'linear-gradient(160deg, #d8d3ca, #4a443e)',
};

type Props = {
  date: string;
  num: string;
  cat: string;
  cap: string;
  side: string;
  tone: string;
  className?: string;
  onClick?: () => void;
};

export function ReceiptCard({ date, num, cap, side, tone, className, onClick }: Props) {
  return (
    <div
      className={cn(
        "bg-card border relative flex-shrink-0 w-[190px] p-4 pb-0 receipt-torn cursor-default transition-transform hover:scale-[1.02]",
        className,
      )}
      style={{
        borderRadius: '2px',
        fontFamily: 'var(--font-mono, monospace)',
        boxShadow: 'var(--shadow-receipt, 0 12px 30px -22px rgba(17,17,17,0.5))',
      }}
      onClick={onClick}
    >
      <div className="flex justify-between text-[9px] tracking-[0.2em] font-semibold uppercase pb-2 border-b border-dashed text-foreground/80">
        <span>thermemo</span><span>{date}</span>
      </div>
      <div
        className="my-3 aspect-[3/4] grayscale relative overflow-hidden"
        style={{ background: toneGradients[tone] ?? toneGradients.g1 }}
      />
      <p
        className="text-center text-sm py-1 italic"
        style={{ fontFamily: 'var(--font-accent, cursive)', color: 'var(--primary)' }}
      >
        {cap}
      </p>
      <div className="flex justify-between text-[9px] tracking-[0.18em] text-muted-foreground pb-4">
        <span>NO. {num}</span><span>SESI</span>
      </div>
      <div
        className="absolute right-[-14px] top-1/2 -translate-y-1/2 rotate-90 text-[10px] tracking-[0.1em] whitespace-nowrap"
        style={{ fontFamily: 'var(--font-jp, serif)', color: 'var(--primary)' }}
      >
        {side}
      </div>
    </div>
  );
}
