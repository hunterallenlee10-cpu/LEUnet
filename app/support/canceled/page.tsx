import Link from "next/link";

export default function SupportCanceledPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950 px-6 py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(212,175,55,0.09),transparent_70%)]" />
      </div>

      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-900/70 p-8 text-center shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Nothing was charged
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
          You canceled before completing your contribution, so no payment was
          taken. You&apos;re welcome back any time.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/support"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-b from-amber-300 to-amber-400 px-6 text-sm font-semibold text-neutral-950 transition-colors hover:from-amber-200 hover:to-amber-300"
          >
            Try again
          </Link>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-medium text-white transition-colors hover:border-amber-300/50 hover:text-amber-200"
          >
            Return to Lee Enterprises Unlimited
          </Link>
        </div>
      </div>
    </main>
  );
}
