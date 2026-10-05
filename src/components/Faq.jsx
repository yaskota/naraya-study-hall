import { faq } from "../data/faq";

// Native <details> keeps every answer in the page HTML (crawlable) and works without JavaScript.
export default function Faq() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <div className="mb-10 sm:mb-14">
          <h2 className="t-h2">Questions about our study hall in Sangareddy.</h2>
          <p className="t-lead mt-5 text-muted">
            Seats, timings, location and how to join. Anything else, just call or message us on WhatsApp.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faq.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-2xl border border-line bg-surface px-5 py-4 shadow-soft open:bg-wall/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg font-semibold">{q}</h3>
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-wall text-xl leading-none text-leaf transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
