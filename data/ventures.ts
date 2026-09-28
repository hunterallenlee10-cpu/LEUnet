import { Venture } from "@/types";

/**
 * The ventures this site lists. One now, Lee Systems Co. (Lee Marketing Mastery
 * until 2026-09-25): Thread T-Shirts came off this site on
 * 2026-09-25 after moving to its own (docs/THREAD.md), as H1 Performance did on
 * 2026-09-03 (docs/H1.md). LEU Business Mastery is the flagship program rather
 * than a venture, so it is not in this list; MainFooter and the nav give it an
 * entry of its own.
 */
export const ventures: Venture[] = [
  {
    // `lmm` is the venture's id from when it was Lee Marketing Mastery. It is
    // kept because Stripe invoices are tagged with it
    // (app/api/stripe/invoice/route.ts); only the names people see changed.
    id: "lmm",
    name: "Lee Systems Co.",
  },
];
