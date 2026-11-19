
export default function Loading() {
  return (
    <main
      role="status"
      aria-label="Loading DiseTo"
      className="fixed inset-0 z-[99999] flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground"
    >
      <div className="flex w-full max-w-sm flex-col items-center px-8">
        <p className="animate-[disetoEnter_1s_cubic-bezier(0.22,1,0.36,1)_both] font-sans text-5xl font-semibold tracking-[-0.085em]">
          DISETO<span className="opacity-40">.</span>
        </p>

        <div className="mt-10 h-[2px] w-48 overflow-hidden rounded-full bg-current/10">
          <div className="h-full w-[35%] animate-[disetoSlide_1.7s_ease-in-out_infinite] rounded-full bg-current" />
        </div>

          
          <span className="animate-pulse text-[9px] font-medium uppercase tracking-[0.22em] text-current/45">
            Loading
          </span>
        </div>
    </main>
  );
}
