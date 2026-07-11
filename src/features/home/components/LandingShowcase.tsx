'use client';

import { CallHearGeorgian } from '@/features/showcase/CallHearGeorgian';
import { CallConsentGate } from '@/features/showcase/CallConsentGate';
import { CallOutcomeBoard } from '@/features/showcase/CallOutcomeBoard';
import { CallBargeIn } from '@/features/showcase/CallBargeIn';
import { CallCostSlider } from '@/features/showcase/CallCostSlider';

/* =========================================================================
   LandingShowcase: the aiCALL product slot.

   The order is the argument:
     1. Hear it, because nobody believes Georgian voice AI until they do.
     2. Can we legally call this list, because the honest answer is sometimes no,
        and saying so first is what earns the clinic's trust.
     3. What you are buying is a sheet, not a robot.
     4. Interrupt it, because that is the difference from a robocall.
     5. What does it cost you today, in your own numbers.
   ========================================================================= */

export function LandingShowcase() {
  return (
    <div id="showcase" className="landing-showcase">
      <CallHearGeorgian />
      <CallConsentGate />
      <CallOutcomeBoard />
      <CallBargeIn />
      <CallCostSlider />
    </div>
  );
}
