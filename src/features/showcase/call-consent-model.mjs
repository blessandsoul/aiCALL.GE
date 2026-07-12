/**
 * Return a cautious campaign boundary from three answers supplied by the visitor.
 * The model never guesses: any unanswered question keeps the verdict empty.
 *
 * @param {{own: boolean | null, existing: boolean | null, written: boolean | null}} answers
 * @returns {'green' | 'amber' | 'red' | null}
 */
export function consentVerdict({ own, existing, written }) {
  if (own === null || existing === null || written === null) return null;
  if (!own) return written ? 'amber' : 'red';
  if (existing || written) return 'green';
  return 'amber';
}
