# Georgian voice samples for the hero showcase

`src/features/showcase/CallHearGeorgian.tsx` plays four recordings. They are not in the
repo yet. Until they are, the component detects the failed load and falls back to a
silent, timed transcript replay, and it tells the visitor that the recording is being
made. It never pretends to play audio it does not have.

## The four files

| File | Scenario | Script (Georgian, verbatim, already in the component) |
| --- | --- | --- |
| `clinic.mp3` | Clinic reminder | Agent: "გამარჯობა, ეს AI აგენტია კლინიკიდან. ხვალ ორ საათზე გელოდებით. დაადასტურებთ?" / Customer: "დიახ, ვიქნები." / Agent: "მადლობა. ხვალ გნახავთ." |
| `delivery.mp3` | Delivery confirmation | Agent: "გამარჯობა, AI აგენტი გწერთ მიწოდებაზე. ამანათი ხვალ მოგივათ. სახლში იქნებით?" / Customer: "ხვალ არა. ორშაბათს." / Agent: "გავიგე. ორშაბათზე გადავიტანე." |
| `payment.mp3` | Payment reminder | Agent: "გამარჯობა, AI აგენტი ვარ. შენატანი პარასკევს იწურება. გახსოვთ?" / Customer: "კი, გადავიხდი." / Agent: "მადლობა. კარგ დღეს გისურვებთ." |
| `missed.mp3` | Missed-call callback | Agent: "გამარჯობა, AI აგენტი ვარ. თქვენ დაგვირეკეთ, ვერ ვუპასუხეთ. რით დაგეხმაროთ?" / Customer: "ჩაწერა მინდა." / Agent: "ვაკავშირებ ადმინისტრატორთან." |

## How to record them

Georgian text-to-speech is the part of the stack that actually works. Eleven v3 ships
Georgian, and Cartesia Sonic ships Georgian with a low-latency claim. Generate the agent
lines with the production voice, record or generate the customer lines with a different
voice so the two are distinguishable, and mix them into one clip per scenario.

Keep each clip under about 9.5 seconds, which is the `CLIP_END` constant in the component.

## After you drop the files in

Re-time the `words` arrays in `CallHearGeorgian.tsx` against the real audio. The timings
in there now are estimates, and the highlight will drift against the voice until they are
measured. The shape of the data does not change, only the numbers.

## What we do not do

The agent says it is an AI agent in the first sentence of every recording, and every
script above does. That is not decoration. The EU AI Act makes the disclosure mandatory
from August 2026 and Georgia is moving the same way, and a page that demos a call which
hides it would be selling the wrong product.
