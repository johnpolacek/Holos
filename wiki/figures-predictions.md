# Figure inventory: /predictions, plus settlement-explorer, trajectory, definition

Sources read: `wiki/glossary.md`, `wiki/storyboard.md`, all of `app/_components/Predictions.tsx` (1,510 lines), `app/predictions/page.tsx`, a skim of `app/_components/SettlementExplorer.tsx`, `app/settlement-explorer/page.tsx`, `app/trajectory/page.tsx`, `app/definition/page.tsx`, and the list of built 3D scenes in `app/_components/lab/tourScenes3d.ts`. Only two 3D scenes are built so far: `introduction` (the branch tree) and `consciousness` (the bench with iris, Φ gauge and iron bar). Plates III to VIII exist only as storyboard text.

## 1. Section inventory

**The Predictions page has no figures, diagrams, animations or tables.** It is text only, with `MathDisplay` and `MathInline` for equations and `FootnoteLink` for citations. `app/predictions/page.tsx` just wraps `<Predictions />` in `PageLayout`.

| Lines | Anchor | Heading | Summary |
|---|---|---|---|
| 9-70 | `#prediction-introduction` | Predictions | Holos without collapse adds no dynamical laws, only two additions (the threshold Φ_c and Omega). The page sorts claims into three kinds: commitments, testability, speculation. |
| 73-91 | `#commitments` | Commitments | Commitments 1 and 2 are fundamental. Commitment 3 belongs to Holos without collapse. |
| 94-180 | (none) | 1. Experience is local, and physics describes it only from outside | "Local": experience happens only inside observers; unobserved branches are real as pattern. "Only from outside": the floor-plan metaphor (L121-127). Rules out panpsychism, a cosmic mind, illusionism, one kind of strict physicalism, and dualism (L134-158). Then anthropic principles (L160-166) and lived/lit/unlit (L168-179). |
| 183-250 | (none) | 2. Observerhood is thresholded | More computation is not integration. The formula Φ ≥ Φ_c (L207), PCI as a stand-in, a structural fact that is the same for everyone, an aperture opening, a copy of an observer is an observer, the twilight, and a copy of a borderline system is borderline too. |
| 253-324 | (none) | 3. Facts are relational but consistent | Structural facts vs registered facts. Incompatible registrations sit in different branches. Relativity means there is no single "first" (L287-289). Observers who compare records agree (L293-298). Born weights explain why a 50/50 experiment looks like a fair coin (L300-311). Apparent collapse (L318-323). |
| 326-331 | (none) | (bridge) | Leads into testability. |
| 336-390 | `#experimentation` | Testability and Its Limits | Presence cannot be detected directly. The unfolding argument (L360-374). What stays testable: structural preconditions (Test A, Test B, Check C, the standing bet). |
| 393-669 | `#experiment-1` | Test A: Consciousness tracks integration, not behavior | Natural experiments where integration and behavior come apart (ketamine, REM sleep, seizures, sleepwalking). Subheads: Objective (L427); The protocol, fixed in advance (L437-484: PCI with TMS and EEG, cutoff 0.31, a posterior second gauge, timing, rivals recorded); Held-out states, not the answer key (L485-519, COGITATE); Holos Prediction (L521); How Holos loses (L530-543, broken thermometer); The confound (L545-569, memory and timing); Where the evidence stands (L571-652: Bajwa 2025, Radek 2018, Aamodt 2022, Nieminen 2016, posterior cortex, maximality, Wong 2025); What this can and cannot show (L654-667). |
| 672-742 | `#minimal-neural-systems` | Test B: The twilight narrows with size | Transition hypothesis (claim 3). Curie-point analogy, DishBrain cultures, integration is the result, not the knob. Why a transition alone is not enough (L708-722, avalanches). How Holos loses (L724-733). Can/cannot show (L735-740). |
| 745-872 | `#experiment-2` | Check C: Observer-relative facts | A consistency check, not a test that singles Holos out. Wigner's friend and the 2020 Local Friendliness theorem (three assumptions); Holos gives up absoluteness (L767-800). The friends are far below Φ_c (L803-808). Toward genuine friends: an AI friend (2023 proposal), a 2026 IBM preprint (L811-827). Expectation (L829). How Holos loses (L838-851). Can/cannot show (L853-870). |
| 875-991 | `#standing-bet` | The standing bet: consciousness adds no new physics | An observer obeys the same laws as a photon; decoherence (L881-890). How Holos loses (L892-903). |
| 905-917 | `#two-versions` (on a `<p>`) | Two versions, declared now | Shared core (Axioms 1, 3, 4, 5); Holos without collapse vs Holos with collapse. |
| 919-949 | (none) | (paragraphs) | Which collapse nature shows decides what the threshold becomes (Chalmers and McQueen vs objective collapse). Declaring now is not a rescue; the core still loses through Test A. |
| 951-989 | (none) | (paragraphs) | Evidence: Pedalino 2026 (7,000+ sodium atoms interfere), Donadi 2021 at Gran Sasso. None of the systems tested was an observer; the bet is untested. |
| 994-1016 | `#speculation` | Speculation | "What if" designs, held to physical possibility. Hard limits: signal speed, noise, thermodynamics; compactness pays. |
| 1019-1099 | (none) | The Holosian Scale | Ranks by social integration (not Φ). H0 Fragmented, H1 Planetary Integration, H2 System Coherence, H3 Post-Expansion, H4 Deep Integration, H5 The Limit. Why it is plausible. |
| 1102-1120 | `#technology`, `#mesostructures` | Technology / Mesostructures | Design sketches under the Integration Hypothesis; H3 to H4 design patterns. |
| 1123-1196 | (none) | Holocore | A dense power source held by its own gravity: fusion (0.7%), accretion onto a spinning black hole (30-42%), Penrose process (up to 29%). Heat is never eliminated; it glows in the infrared. |
| 1199-1243 | (none) | Computronium Kernel | The thinking heart. May present as a Dark Node. Light delay (3 ns per meter) against heat. |
| 1246-1307 | (none) | Chrono Vault | Stores identity. The Kernel thinks, the Vault remembers. A cold Vault is the sleeping case. Aestivation and its reply. |
| 1311-1373 | `#exploration-and-communication`, `#communication` | Communication / Phase-Coherent Beam Transmission | No real-time dialogue between stars; asynchronous work; laser beams. A 10 m mirror gives a spot smaller than Earth's orbit at 10 light-years. |
| 1375-1467 | `#exploration` | Exploration / Sentinel Probes | Physical exploration is rare. Sentinel Probes: autonomous, mostly dormant, rare dense transmissions. Bracewell 1960. |
| 1470-1504 | (none) | Gravitational-Lens Observatories | The Sun's focal line lies beyond about 550 AU; NASA-funded mission study. |

**The other pages**
- **`/settlement-explorer`** (`app/settlement-explorer/page.tsx`, 32 lines, which renders `SettlementExplorer.tsx`, 1,561 lines). Unlisted: `robots: noindex`, no nav link, and nothing on the site links to it. It is a full-window, dark-themed interactive toy model of the Integration Hypothesis. A 2D canvas galaxy (GSAP, log time axis) plays settlement histories. There is a 5-step story: "A quiet galaxy", "Is settling a neighbor worth it?", "It only takes a few", "Loud or quiet?", "Check against the sky". It has question sliders, a verdict map (fits the silence / in tension / ruled out) and an Explore mode. It is highly visual, but not in the engraved style.
- **`/trajectory`** (5 lines): redirects to `/predictions#speculation`. No content.
- **`/definition`** (5 lines): redirects to `/logic#ontology`. No content.

## 2 to 4. Proposed figures

Each entry gives: where it sits, what it shows in 3D, the stage captions, the faithfulness risk and how to avoid it, and any reuse from the storyboard. Shared vocabulary from `storyboard.md` applies throughout: iris = observer, Φ gauge with a hatched twilight band, arrows only toward observers, and a status cartouche.

### Introduction

**F0. Two additions on top of physics** (beside L19-38)
- **3D:** an engraved stone plinth carved with equations, labeled PHYSICS: UNCHANGED. Two objects are set on it: a Φ gauge with its twilight band, and a small version of the whole branch tree labeled OMEGA, THE WHOLE. A cartouche row appears below: COMMITMENTS · TESTS · SPECULATION.
- **Stages:**
  1. Physics as it stands: no new laws, no changed equations.
  2. Holos adds a threshold: a point of view forms only past Φ_c.
  3. And Omega: the whole of reality is the one experiencer.
  4. Everything below is sorted three ways: commitments, tests, speculation.
- **Risk:** the plinth could read as physics "supporting" consciousness, or as Omega sitting "on top" (a ladder). **Avoid:** set both objects side by side at the same height. Label them additions, never "ingredients" or "posits".
- **Reuse:** Plate I stop 6 (gauge beside the tree). Optional; skip it if the page already feels crowded at the top.

### Commitment 1

**F1. Where experience is: local** (beside L109-119)
- **3D:** a bench landscape with a rock, a river, a thermostat, a stretch of starfield, and one person whose head carries an iris. Everything is drawn in equal detail. Two rival overlays are shown and then struck: panpsychism as stipple sparks in every particle; a cosmic mind as one large iris over the whole scene.
- **Stages:**
  1. Everything here is real structure, drawn with equal care.
  2. Panpsychism puts a flicker of experience in every particle. Holos denies it.
  3. A cosmic mind gives the universe an experience of its own. Holos denies that too.
  4. Experience occurs only inside observers: here, and nowhere else in the scene.
  5. Omega is the one experiencer, but it experiences only through observers.
- **Risk:** the struck overlays may look like empirical refutations, and a glowing iris implies a light source. **Avoid:** stamp the overlays HOLOS DENIES, not FALSE. Keep the iris unlit, with nothing flowing through it.
- **Reuse:** Plate II stop 1 (rock, river, thermostat are built in `consciousness`).

**F2. The floor plan: only from outside** (beside L121-127)
- **3D:** the text's own metaphor. An architect's floor plan lifts into an engraved cutaway house with every wall dimensioned. A duplicate house is drawn line for line beside it.
- **Stages:**
  1. A physical description can be complete, like a floor plan with every wall.
  2. Still, the plan cannot say what living in the house is like.
  3. Nothing is missing from the plan: a perfect copy has the same inside.
  4. The gap is in how the description is written, from outside, not in the world.
- **Risk:** a hidden room, a ghost figure or a glow inside the house would suggest dualism, an extra ingredient. **Avoid:** the house never gains an extra element. The copy is identical down to the dimension lines.

**F3. Five views Holos rules out** (beside the list at L134-158; could merge with F1)
- **3D:** five small engraved emblems on a shelf, turned one at a time:
  - a rock sprinkled with stipple (panpsychism)
  - one great iris over a galaxy (cosmic mind)
  - an empty iris labeled ONLY THE BELIEF (illusionism)
  - an equation sheet ending "= LIVED" (strict physicalism of one kind)
  - a brain with a ghostly second layer floating above it (dualism)
- **Stages:** one per view, using the text's one-line definitions, then:
  6. Holos: experience is local, and physics states it only from outside.
- **Risk:** it looks like a scorecard of defeated rivals. **Avoid:** label every emblem HOLOS DENIES and keep the text's framing: "a serious rival denies each one".

**F4. Lived, lit, unlit** (beside L168-179)
- **3D:** the Plate III block universe with one world line, its past light cone, an iris along the world line only, and soft ink outside the cone.
- **Stages:**
  1. Lived: where experience occurs, inside observers.
  2. Lit: the causal past an observer draws on.
  3. Unlit: structure outside every observer's causal past, real as pattern.
- **Risk:** a cone that draws itself in says lighting is an event. **Avoid:** engrave the cone in the same pass as the block and only label it (storyboard flag).
- **Reuse:** directly reuse Plate III stops 3 to 5 (not yet built).

### Commitment 2

**F5. More computing is not integration** (beside L194-204)
- **3D:** rows of server racks multiply toward the horizon while the Φ gauge needle stays near zero. Beside them, a compact network whose links close into one loop, with its needle rising to the twilight band.
- **Stages:**
  1. Processing can scale without end.
  2. A million separate processes still make no single point of view.
  3. What matters is integration: parts constraining one another as one whole.
  4. Past the twilight, with the other requirements met, experience is unavoidable.
- **Risk:** the gauge looks like a cause, and Φ looks computable today. **Avoid:** draw no arrow from the gauge to the iris. Label the gauge "Φ, a measure (stand-ins such as PCI)".
- **Reuse:** Plate II stops 1 to 4 (built: network, gauge, iris, twilight band).

**F6. The threshold is structural, and copies agree** (beside L225-249)
- **3D:** one system on a turntable with the Φ gauge. Two onlookers at different angles read the same needle. Then a copier makes a duplicate: a clear observer copied gives two open irises, and a borderline system copied gives two ghosted irises in the twilight.
- **Stages:**
  1. Whether a system crosses the threshold is a fact about its wiring.
  2. It reads the same for everyone, however they look.
  3. A physically identical copy of an observer is an observer too.
  4. A copy of a borderline system is borderline too: the twilight is fixed by structure.
- **Risk:** the ghosted iris reads as "half conscious". **Avoid:** ghost the outline only, never half-open (storyboard rule). The caption says "no exact fact of the matter".
- **Reuse:** Plate II twilight and iris; Plate V stop 4 copier.

### Commitment 3

**F7. Two kinds of facts** (beside L266-291)
- **3D:** the branch tree with one quantum event splitting into two ribbons. The fork carries an engraved weight plate (a structural fact, full ink, SAME FOR EVERYONE). An observer sits partway along each ribbon, each holding a record card, UP in one branch and DOWN in the other.
- **Stages:**
  1. Structural facts: the laws, the branches, their weights. The same for everyone.
  2. Registered facts: which outcome an observer registers, indexed to that observer.
  3. Incompatible registrations sit in different branches. They never collide.
  4. No first observer fixes the truth for everyone.
- **Risk:** observers at the fork would imply observation makes branches. **Avoid:** place irises partway along the branches, never at forks (Plate I flag).
- **Reuse:** Plate I tree (built).

**F8. No single "first"** (beside L287-289)
- **3D:** a spacetime block with two far-apart events. Two observers moving differently each have a tilted "now" slice, and the slices order the events oppositely.
- **Stages:**
  1. Two events, far apart.
  2. One observer's "now" puts A first.
  3. Another observer, moving differently, puts B first.
  4. No single first to appoint, and none is needed.
- **Risk:** low. Only make sure the events are spacelike separated.
- **Reuse:** Plate III stops 1 and 2.

**F9. Records agree when compared** (beside L293-298)
- **3D:** inside one branch, two observers in separate rooms each hold a notebook. A signal from one event travels inward to both. They meet and lay the notebooks side by side, and the pages match.
- **Stages:**
  1. Separated, their perspectives may differ.
  2. The same signals reach both.
  3. When they compare records, the records agree.
- **Risk:** a line between the two irises would read as telepathy. **Avoid:** the arrows run from the event to each observer. The agreement is shown by the notebooks, not by any link between observers.

**F10. Weights, not counts: the fair coin** (beside L300-311)
- **3D:** a 50/50 splitter with two ribbons of equal width. Then a 70/30 split with unequal widths. A coin is shown for comparison.
- **Stages:**
  1. Each branch carries a weight from physics.
  2. A 50/50 experiment gives two equal weights: from inside, a fair coin.
  3. Weights are odds of finding yourself in one branch, not amounts of experience.
- **Risk:** showing odds as counted people. **Avoid:** widths only (Plate IV flag).
- **Reuse:** Plate IV stop 6.

**F11. Apparent collapse: the click is already definite** (beside L318-323)
- **3D:** a real-looking detector (a photomultiplier and paper chart recorder) after a splitter. The world branches, and in each branch the chart tape already shows its click before anyone reads it. Then a person reads the tape in one branch. Nothing on the tape changes.
- **Stages:**
  1. A measurement seems to pick one outcome.
  2. In each branch, the detector's record is already definite.
  3. An observer reading it changes nothing on the tape.
  4. What the observer adds is not definiteness but its being lived.
- **Risk:** the reading could look like it "fixes" the result. **Avoid:** freeze every line of the tape when the observer arrives. Label the detector "records", not "registers".
- **Reuse:** the eraser scene's detector styling (the `QuantumEraserPlate` / `EraserScene3D` marks).

### Testability and its limits

**F12. Nothing extra to find** (beside L346-354)
- **3D:** a person asleep wearing an EEG cap, with a chart recorder tracing waves. Beside it stands an empty instrument case labeled PRESENCE METER with no dial inside.
- **Stages:**
  1. Every experiment is a physical measurement.
  2. An instrument records physical change, and only that.
  3. There is no meter for presence, and Holos says there cannot be.
  4. Finding nothing extra is exactly what Holos predicts.
- **Risk:** it could read as dodging testability. **Avoid:** end with a pointer caption: "What can be tested: its structural preconditions."

**F13. The unfolding argument** (beside L360-374)
- **3D:** a network with feedback loops. Its loops unroll into a long chain of feed-forward layers. Both machines are fed the same input and light the same lamp.
- **Stages:**
  1. A system with feedback loops.
  2. In principle it can be unrolled into a loop-free copy.
  3. Same inputs, same behavior.
  4. No behavioral test can tell which is conscious.
  5. Test A does not compare twins; it looks inside real brains.
- **Risk:** putting an iris on either machine would take a side the text refuses. **Avoid:** no iris on either machine; the lamp is the only output.

**F14. What can be tested: four stations** (beside L377-388)
- **3D:** one long lab bench with four stations:
  - Test A: a TMS coil and EEG cap
  - Test B: a culture dish under a microscope
  - Check C: an optical table with photon paths
  - the standing bet: a matter-wave interferometer

  Behind glass on a pedestal stands the iris, labeled PRESENCE: NOT TESTABLE.
- **Stages:**
  1. Presence itself cannot be tested.
  2. Test A: the core, and a test Holos could fail.
  3. Test B: the transition hypothesis only.
  4. Check C: a consistency check, shared with standard quantum mechanics.
  5. Beneath them all, a standing bet on physics.
- **Risk:** four equal stations imply equal weight, and the iris behind glass implies a hidden object. **Avoid:** give each station a status cartouche. Draw the pedestal empty except for its label, or with the iris in soft ink.
- **Reuse:** the stations can be thumbnails of F16, F22, F25 and F29.

### Test A

**F15. When integration and behavior come apart** (beside L403-425)
- **3D:** a floor grid with two engraved axes, RESPONSIVENESS and INTEGRATION. Small sleeper and patient figures take their places:
  - awake person: both high
  - REM or ketamine sleeper: high integration, no response
  - sleepwalker or automatism: responds, low integration
  - deep anesthesia: both low
- **Stages:**
  1. At the bedside, responding is taken as the sign of consciousness.
  2. Usually integration and responsiveness rise together.
  3. Ketamine, REM sleep, some seizures: no response, yet vivid reports later.
  4. Sleepwalkers and automatisms: movement, yet little reported.
  5. Holos bets experience follows integration when the two diverge.
- **Risk:** placing states on the integration axis looks like measured values. **Avoid:** mark the positions as "expected", drawn with dotted leaders. Anchor each figure to its later report, which is what the text states.

**F16. How PCI works: zap and listen** (beside L443-465, the primary gauge)
- **3D:** a real lab setup. A figure-eight TMS coil held over the scalp, a 60-electrode EEG cap, and a translucent head showing the cortex. After the pulse, an echo spreads across the cortex as engraved ripples.
- **Stages:**
  1. A magnetic pulse goes into the brain through the scalp.
  2. EEG records how the cortex echoes.
  3. Awake: a rich, widespread, varied echo. PCI scores high.
  4. Deep sleep: the echo stays local and dies out. PCI scores low.
  5. PCI is a stand-in for integration, not a direct measure. Published cutoff: 0.31.
- **Risk:** PCI shown as a consciousness meter, or 0.31 drawn as a sharp line. **Avoid:** the dial is labeled "stand-in". Give 0.31 a twilight band, or explicitly "cutoff for the original PCI".
- **Note:** the text says "local or uniform" echoes score low. Add a third echo, uniform (every electrode in lockstep), if there is room.

**F17. A local gauge: the posterior hot zone** (beside L466-472 and L630-638)
- **3D:** the same head. The whole-cortex gauge reads below its cutoff while a back region of cortex is outlined with its own local gauge reading above. An iris outline appears in soft ink, confined to that region.
- **Stages:**
  1. The whole brain can sit below the threshold.
  2. A region at the back can still be integrated past it.
  3. The maximality condition allows an aperture smaller than the whole cortex.
  4. Adopted after seeing the data, so only new data can count.
- **Risk:** the posterior aperture looks established. **Avoid:** give stage 4 its own status cartouche, A READING ADOPTED AFTER THE FACT, and draw the iris in soft ink or dashed lines.

**F18. Timing: measure right up to waking** (beside L473-478 and L559-563)
- **3D:** an engraved ribbon of sleep EEG running along the bench, with TMS pulse markers and an alarm bell at the awakening. A bracket window ends at the bell. Two wrong windows, a minutes-long average and one ending a minute early, are struck through. A small dream cloud forms in the last seconds before the bell.
- **Stages:**
  1. Each gauge uses the stimulation closest to waking, ending at the awakening.
  2. A report counts only if it describes what was happening just before waking.
  3. Averages over minutes do not count.
  4. A dream can form in the seconds of waking, which is why timing matters.
- **Risk:** low. Keep the dream cloud a plain mark, not an iris.

**F19. Answer key, not the exam** (beside L489-518)
- **3D:** a desk with a gauge on a calibration stand and a card file of known states (WAKING · REM · KETAMINE). A wax seal is pressed onto the cutoff dial. A second, sealed box of held-out cards opens only after the seal: NON-REM DREAMS · DEEP SEDATION · SLEEPWALKING · COMPLEX SEIZURES · PSYCHEDELICS · COVERT AWARENESS. An envelope of written predictions sits beside it (the COGITATE model).
- **Stages:**
  1. The cutoff was set on states already known from reports.
  2. Those states are the answer key and cannot confirm the test.
  3. The cutoff is frozen before any new data.
  4. Only held-out states, named in advance, count.
  5. Predictions are written down before the data arrive.
- **Risk:** low. Do not show any held-out result.

**F20. How Holos loses: two thermometers** (beside L531-543)
- **3D:** two gauges, whole-cortex and posterior, beside one sleeper. First one needle disagrees and that gauge is set aside. Then both needles sit clearly below their cutoffs while a detailed report card comes out.
- **Stages:**
  1. A broken thermometer does not prove heat is fake.
  2. If one gauge fails and the other tracks reports, the failing gauge goes.
  3. Holos loses if detailed reports keep coming when both gauges sit clearly below.
  4. A gauge proposed afterward cannot rescue results already in.
- **Risk:** the losing stage may look like it already happened. **Avoid:** caption it "the losing case", and use a cartouche: A POSSIBLE OUTCOME. Note that F24's evidence discussion says this case is "not hypothetical" in part; handle that there, not here.

**F21. The memory confound** (beside L549-567)
- **3D:** a three-stage apparatus: a sleeper, a wax-cylinder recorder (memory) and a report card. Run once with the recorder running: a report comes out. Run again with the recorder stopped: a blank card, and two question-marked possibilities above it.
- **Stages:**
  1. Reports need memory.
  2. A blank report could mean no experience, or experience never stored.
  3. So silence carries little weight either way.
  4. Positive reports escape the memory problem. Test A rests on them.
- **Risk:** implying experience did occur in the silent cases. **Avoid:** draw both branches of the question with equal ink.

**F22. Where the evidence stands: a level balance** (beside L573-651)
- **3D:** an engraved balance with labeled weights (paper stacks). On one pan: BAJWA 2025 · AAMODT 2022 (did not favor). On the other: NIEMINEN 2016 · POSTERIOR CORTEX WORK (points the other way). Tags hang on the first pan: TIMING PROBLEM and FIVE NO-EXPERIENCE REPORTS.
- **Stages:**
  1. Deep sedation still yields many reports: 82 and 84 percent in two studies.
  2. The nearest test yet run did not favor Holos.
  3. But it measured minutes ending a minute before waking.
  4. Tighter timing points the other way.
  5. Neither settles it. Only new data under the protocol can.
- **Risk:** the scale tipping reads as a verdict. **Avoid:** keep the beam level throughout, with the cartouche NOT SETTLED. Pan contents must exactly match the text's citations.
- **Note:** Wong et al. 2025 (L640-651) is text only; a picture adds nothing.

### Test B

**F23. The iron bar: steeper with size** (beside L683-691)
- **3D:** a small iron grain and a large iron block both cool past the Curie point. Their magnet arrows line up gradually in the grain and abruptly in the block. Two curves are engraved beside them. Then the same pair of curves is shown for a small and a large neural culture, dashed.
- **Stages:**
  1. A magnet loses its magnetism at a set temperature.
  2. In a tiny grain the change is blurred.
  3. In a large block it is abrupt.
  4. If the threshold is a genuine transition, its twilight should narrow as systems grow.
- **Risk:** the magnet analogy read as evidence. **Avoid:** give the neural curves a cartouche, A HYPOTHESIS (claim 3), and draw them dashed.
- **Reuse:** Plate II stop 5 (built: iron bar and two curves).

**F24. DishBrain: the cheapest place to look** (beside L691-705)
- **3D:** a real lab setup. A multi-electrode array dish on a microscope stage with neurons engraved on the electrode grid, cables running to a small Pong screen, and a dose knob (drug) or connectivity setting. An integration trace plots on a chart recorder. Small and large dishes are shown side by side.
- **Stages:**
  1. Living neurons grown on electrodes, wired to a simple game.
  2. The setup, not evidence of experience.
  3. Turn a condition: a drug dose, or connectivity.
  4. Track an integration measure fixed in advance. Integration is the result, not the knob.
  5. Small cultures should cross gradually, larger ones more steeply.
- **Risk:** the dish looks conscious. **Avoid:** never put an iris on the dish. Make the stage 2 caption mandatory.

**F25. A transition alone proves nothing** (beside L712-731)
- **3D:** a dish's activity shown as avalanche cascades (branching bursts across the electrodes). A single step curve is struck through. Then a plot of steepness against size: a rising line labeled HOLOS EXPECTS and a flat line labeled HOLOS LOSES CLAIM 3.
- **Stages:**
  1. Dishes show sudden cascades all the time.
  2. So finding one transition cannot fail, and proves nothing.
  3. What counts: does steepness grow with size?
  4. If not, Holos loses claim 3, though not its core.
- **Risk:** the rising line looks like data. **Avoid:** draw both lines dashed and labeled as outcomes, not results.

### Check C

**F26. Wigner's friend** (beside L775-779)
- **3D:** an engraved sealed lab (a riveted box) with a friend inside measuring a particle: a source, a polarizer and a detector. Outside, Wigner with an apparatus that treats the whole box as one quantum system.
- **Stages:**
  1. A friend in a sealed lab measures a particle and sees a result.
  2. Outside, Wigner treats the whole lab, friend included, as one quantum system.
  3. He runs a measurement that probes the friend's result.
  4. In real experiments so far, the friend is a photon path, not a person.
- **Risk:** the thought experiment shown as if it has been run with a person. **Avoid:** stage 4 swaps the friend for a photon path and a plain "D" detector, with no iris.
- **Reuse:** eraser-scene optics (the side plate from Plate III stop 7).

**F27. Local Friendliness: three assumptions, one must go** (beside L787-800)
- **3D:** three engraved pillars under one lintel: ABSOLUTENESS OF OBSERVED EVENTS · LOCALITY · FREEDOM OF CHOICE. Beside them, the real photonic setup (an entangled-photon source feeding two sides, each with an inner "friend" path and an outer measurement), with a meter showing the measured value past the bound. Holos's choice: the absoluteness pillar is taken out, and the lintel is re-propped by a smaller plinth labeled STRUCTURAL FACTS AND CONSISTENCY.
- **Stages:**
  1. Three reasonable assumptions, together called Local Friendliness.
  2. The theorem: they cannot all hold if the friend's result is a fact.
  3. Experiments with light break the limit, as quantum theory predicts.
  4. Something must give. Holos gives up the absoluteness of observed events.
  5. Registered facts are relative; structural facts and consistency stand.
- **Risk:** implying the experiment picked Holos's option. **Avoid:** the caption in stage 4 says "Holos chooses", and the experiment stage says "forces a choice, does not make it".

**F28. How far the friends are from Φ_c** (beside L803-826, and reusable for L979-983)
- **3D:** a long horizontal Φ gauge laid on the bench like a scale bar, with the twilight band far to the right. Tokens sit along it: PHOTON · MOLECULE · SUPERCONDUCTING CIRCUIT · AGENT ON IBM HARDWARE (2026 PREPRINT) · AI ON A QUANTUM COMPUTER (PROPOSED). All sit far left, and the band has no token.
- **Stages:**
  1. Today's friends are photons, far below the threshold.
  2. They register nothing, so the experiments constrain logic, not registration.
  3. A 2026 preprint used agent-like observers on quantum hardware. Still far below.
  4. A human-level AI friend has been proposed.
  5. No experiment has yet reached the threshold. The bet is untested.
- **Risk:** placing any token near the band suggests we are close, and the preprint may look peer reviewed. **Avoid:** show the proposed AI as a dashed outline with no fixed position. Tag the preprint NOT YET PEER REVIEWED. The scale is qualitative; say so.

**F29. How Holos loses Check C** (beside L841-849)
- **3D:** a plot of violation strength against friend size, with a decoherence baseline band. Two dashed futures: flat (EXPECTED) and falling as the friend nears Φ_c (THE BET IS LOST). Then, in a second vignette, two observers compare notebooks inside one branch, and the pages mismatch.
- **Stages:**
  1. The theorem is a proof. No violation restores absolute facts.
  2. The risk is scale.
  3. If violations fade as the friend nears a genuine observer, beyond decoherence, the bet is lost.
  4. A confirmed mismatch between communicating observers would falsify Commitment 3.
- **Risk:** the curves look like data. **Avoid:** draw them dashed with the cartouche POSSIBLE OUTCOMES.
- **Reuse:** the notebook vignette from F9.

### Standing bet and the two versions

**F30. A photon or an observer in the measuring role** (beside L881-889)
- **3D:** a Mach-Zehnder interferometer on an optical table producing fringes on a screen. A which-path "measurer" slot sits on one arm. First the slot holds a small detector and the fringes fade. Then the slot is shown with a dashed placeholder labeled AN INTEGRATED SYSTEM, and the fringes fade the same way. Environment particles are drawn as stipple entangling with the arm.
- **Stages:**
  1. Interference: the system is in several states at once.
  2. Contact with the surroundings fades it. This is decoherence.
  3. Put an integrated system in the measuring role.
  4. Holos predicts the same fading, and nothing more.
  5. Experience is the inside of the physics, doing its share.
- **Risk:** stage 3 looks like an experiment that was run. **Avoid:** the placeholder stays dashed, with the cartouche A PREDICTION, UNTESTED.

**F31. Three outcomes, declared now** (beside L893-917)
- **3D:** a three-way engraved signpost, or three small plates on a shelf, all set on one plinth carved CORE: AXIOMS 1, 3, 4, 5.
  - No deviation found: the full branch tree, labeled HOLOS WITHOUT COLLAPSE (DEFENDED).
  - Collapse of some other kind (size-based) found: one single stem, labeled HOLOS WITH COLLAPSE.
  - A consciousness-linked deviation found: Holos without collapse falsified.
  In the collapse version a lit cone still sits within the one history.
- **Stages:**
  1. Two versions share one core.
  2. Without collapse: every outcome in its own branch. The version defended here.
  3. With collapse: one history. Lived, lit and unlit apply within it.
  4. The collapse version is declared now, not invented as a rescue.
  5. Either way, the core can still lose through Test A.
- **Risk:** the single stem drawn as a pruned tree with irises at the cuts implies observers collapse it; the two plates also look equally supported. **Avoid:** no iris at any pruning point, since the collapse law is physics. Label the with-collapse plate "would have to earn its own support".
- **Reuse:** the Plate I tree (built), and the Plate III cone.

**F32. Which collapse decides the threshold** (beside L920-936)
- **3D:** two superposed systems of equal size on matching stands. One has a Φ gauge past the band; the other sits below. Three outcome rows follow:
  - only the above-threshold one collapses (CHALMERS AND McQUEEN)
  - both collapse (SIZE-BASED COLLAPSE, THRESHOLD INERT)
  - neither collapses (HOLOS'S BET)
- **Stages:**
  1. Two equally large superposed systems, one past the threshold.
  2. If only that one collapses, collapse tracks integration, the rival's reading.
  3. The threshold would become detectable: its strongest confirmation.
  4. If both collapse, collapse tracks size and the threshold gains nothing.
  5. Holos bets neither does.
- **Risk:** implying the experiment is feasible or planned. **Avoid:** use the cartouche A THOUGHT EXPERIMENT and draw the systems as abstract.

**F33. Quantum mechanics keeps holding** (beside L952-973)
- **3D:** two real setups.
  - A cluster-beam matter-wave interferometer: an oven or source, three grating stages, and a fringe pattern on the detector. Label: 7,000+ SODIUM ATOMS. Verify the apparatus against Pedalino et al. 2026 before engraving; it is likely a Vienna-style laser-grating interferometer.
  - A cutaway of a mountain with a shielded germanium detector deep under the rock at Gran Sasso, waiting for radiation that does not come.
- **Stages:**
  1. Clusters of over 7,000 atoms still interfere.
  2. Under a mountain, a detector hunted the faint glow gravity-driven collapse predicts.
  3. None came: the simplest version is ruled out.
  4. Versions with an adjustable parameter survive.
  5. None of these systems was an observer.
- **Risk:** reading these results as tests of the consciousness bet, or of all collapse views. **Avoid:** end on stage 5. Mention Penrose's own version may not predict the radiation.
- **Reuse:** the F28 scale bar for "none were observers".

### Speculation

Every speculation figure carries a SPECULATION or DESIGN SKETCH cartouche for its whole run. Draw known physics (stars, black holes, lenses, beams) in solid engraving and hypothetical engineering in dashed or blueprint-style lines. That shared convention is the main guard against showing a design as if it exists.

**F34. Light-lag: why compactness pays** (beside L1011-1016)
- **3D:** a star system with a message pulse crawling between planets (HOURS), then between stars (YEARS). A spread-out civilization's links are drawn stretching and breaking; a compact one stays connected.
- **Stages:**
  1. Across a star system, messages take hours.
  2. Across many systems, years.
  3. Spread thin, a civilization struggles to act as one.
  4. Staying coherent rewards keeping things close.
- **Risk:** low, since this is physics. Keep "rewards" as a pressure, not a law.
- **Reuse:** Plate VI stop 4 (distance breaks control).

**F35. The Holosian Scale, H0 to H5** (beside L1019-1091)
- **3D:** one engraved world. It starts sprawling and bright with a radio shell and scattered lights. It becomes a coordinated planet, then a system linked by rare narrow beams, then shrinks its footprint, and finally becomes a compact warm node glimpsed only in the infrared. H5 appears as a dashed outline only. Two dials run alongside: COORDINATION (not Φ) rising and VISIBILITY falling.
- **Stages:**
  1. H0 Fragmented: capable, uncoordinated, loud.
  2. H1: coherent at the scale of a world.
  3. H2: coherence survives light-lag. Broadcast gives way to rare, directed signals.
  4. H3: sprawl stops; exploration goes informational first.
  5. H4: minimal leakage. What remains is gravity and waste heat.
  6. H5: a limit concept, not a stage anyone reaches.
- **Risk:** it reads as a forecast every civilization follows, and it could be confused with Φ. **Avoid:** use the cartouche A MAP, NOT A FORECAST, and add a closing note: "a civilization that never coordinates stays at H0". Use no Φ gauge or iris (Plate VI flag).
- **Reuse:** Plate VI stops 2 and 3 (loud to quiet).

**F36. How big is a mesostructure?** (beside L1105-1120)
- **3D:** a scale comparison: a skyscraper, a city, a mesostructure (for example a Holocore beside a moon), and a star-enclosing megastructure drawn as a dashed sphere around a star.
- **Stages:**
  1. Far larger than any building.
  2. Far smaller than the star-enclosing megastructures of science fiction.
  3. Compact enough to stay coherent, and warm but not bright.
- **Risk:** any of them read as real. **Avoid:** draw the mesostructure and megastructure in dashed blueprint lines.

**F37. Holocore: three ways to pack energy** (beside L1126-1195)
- **3D:**
  - Baseline: a star with a few nearby collectors (dashed).
  - Fusion: a compact core. Efficiency bar: 0.7%.
  - Accretion: a spinning black hole with a regulated disk and feed lines (dashed). Bar: 30-42%.
  - Penrose process: a particle splits in the ergosphere, one piece falls in and one escapes with extra energy. Bar: up to 29% of the hole's mass.
  - Throughout, an infrared stipple halo whose brightness grows with output.
- **Stages:**
  1. Baseline: the home star, harvested by nearby collectors.
  2. Fusion turns 0.7 percent of a mass into energy.
  3. Matter falling into a spinning black hole can release 30 to 42 percent.
  4. A spinning black hole's spin can be tapped: up to 29 percent of its mass.
  5. The heat cannot be eliminated. More power means a brighter infrared glow.
- **Risk:** the engineering drawn as if built, and the Penrose "29%" mislabeled (it is the hole's rotational energy, not the infalling mass). **Avoid:** use solid lines for the black hole physics and dashed lines for feed systems, with a DESIGN SKETCH cartouche. Copy the exact wording "up to 29 percent of its mass".

**F38. Computronium Kernel: where delay and heat balance** (beside L1203-1242)
- **3D:** an engraved cube that shrinks. A signal crossing it (3 NS PER METER) gets shorter as heat-flux hatching grows denser on its faces, with a radiator fin area shown. The cube settles where the two balance. It then darkens to a faint infrared stipple labeled MAY PRESENT AS A DARK NODE.
- **Stages:**
  1. Light crosses a meter in about three nanoseconds: smaller thinks faster.
  2. But power packed too densely cannot be cooled.
  3. The Kernel sits where the two balance, as today's chips already do.
  4. Seen from afar it might look like a Dark Node: dark, faintly warm.
- **Risk:** implying the Kernel explains real Dark Node candidates. **Avoid:** show one node, never a swarm. The caption says "appearance, not purpose".
- **Reuse:** Plate VII stops 5 and 6 (radiator, Dark Node).

**F39. Chrono Vault: thinks vs remembers** (beside L1250-1306)
- **3D:** two objects side by side. The Kernel is warm, with an infrared stipple and inflowing power. The Vault is a stack of etched durable plates (like the Rosetta Disk), layered VALUES · DECISIONS · JUSTIFICATIONS. The Vault cools to near-invisibility over an engraved time bar of 100,000 years, then a small restart mark appears.
- **Stages:**
  1. The Kernel thinks: active, warm.
  2. The Vault remembers: values, decisions, and the reasons for them.
  3. A Vault that stops computing goes cold: compact, dark, nearly undetectable.
  4. After dormancy, collapse or fragmentation, a way back.
- **Risk:** the aestivation motive looks settled, and a cold object looks detectable. **Avoid:** the caption notes the motive to pause is the speculative part. Draw the cold Vault faint.
- **Reuse:** the Plate VII stop 7 "sleeping node".

**F40. A beam, not a broadcast** (beside L1316-1372)
- **3D:** a broadcast sphere thinning in every direction beside a 10 m mirror firing a narrow cone. At 10 light-years the beam's spot sits inside a dashed ring of Earth's orbit, with a dimension line. An off-axis observer sees nothing. The payload unstacks as layered plates: MATHEMATICS · PHYSICAL CONSTANTS · REFERENCE FRAMES · COMPRESSION · MODELS.
- **Stages:**
  1. Broadcasting spreads power thin in every direction.
  2. A laser from a ten-meter mirror stays narrow.
  3. Ten light-years out, its spot is smaller than Earth's orbit.
  4. Anyone outside the cone sees nothing.
  5. The package explains itself, starting from mathematics.
- **Risk:** low, since the optics are real; I checked that the diffraction spot is about 0.16 AU across at 1 µm. **Avoid:** mark the civilizations' use as speculation. Note that optical SETI searches for these beams and has found nothing.

**F41. Sentinel Probes: watch, not arrive** (beside L1379-1466)
- **3D:** a remote map first (a star system drawn from afar), then one small dark probe parked in orbit like a trail camera. A timeline shows long dormant stretches, brief activity blips and a rare dense transmission.
- **Stages:**
  1. Most structure is mapped from afar.
  2. A probe goes only where inference breaks down.
  3. It waits, mostly dormant, for decades or longer.
  4. Brief activity, then one rare, information-dense report.
  5. Bracewell proposed this in 1960; our own spacecraft already run for decades.
- **Risk:** implying probes are watching us. **Avoid:** place the probe at a generic star, not the Sun. Keep the SPECULATION cartouche.
- **Reuse:** Plate VI stop 6 (trail camera).

**F42. The Sun as a telescope lens** (beside L1470-1503)
- **3D:** real physics. Light from a distant exoplanet passes the Sun and bends. The rays converge on a focal line starting past 550 AU (a dimension line), with a spacecraft string placed along it. An Einstein ring forms in its detector.
- **Stages:**
  1. A star's gravity bends passing light.
  2. The Sun brings distant light to a focus beyond about 550 times Earth's distance.
  3. Instruments along that line collect for a long time.
  4. Patience traded for sharpness.
  5. NASA-funded studies have designed a mission. It has not flown.
- **Risk:** the mission looks launched. **Avoid:** draw the craft dashed and make the stage 5 caption mandatory.

## Places where a picture adds little (skip)

- Anthropic principles (L160-166).
- The Objective paragraph (L427-435) and Holos Prediction (L521-528). Covered by F15.
- The Wong 2025 database (L639-651).
- The qubit-readouts caveat (L865-869). Covered by F28.
- "Declaring the second version is not a rescue" (L939-948). Covered by F31, stage 4.
- The sceptic note (L976-988). Covered by F28 and F33.
- The Purpose and Design lists under Holocore, Kernel and Vault.
- Asynchronous collaboration (L1322-1327). Optional: a single package arriving centuries later could be folded into F40.

## Reuse summary

**Built scenes you can use now:**
- `consciousness` 3D scene (Plate II): F1 (rock, river, thermostat), F5, F6, F23.
- `introduction` 3D tree (Plate I): F0, F7, F31.

**Storyboard plates not yet built:**
- Plate III block and cone: F4, F8, F31 (the cone in the collapse version).
- Plate III side plate (eraser optics, `EraserScene3D`): F11, F26.
- Plate IV stop 6 (ribbon widths): F10.
- Plate V stop 4 (copier): F6.
- Plate VI stops 2-4 and 6: F34, F35, F41.
- Plate VII stops 5-7: F38, F39.

**Shared within this set:**
- The F9 notebook vignette is reused in F29.
- F28's scale bar is reused in F33.
- F16, F22, F25 and F29 supply thumbnails for F14.

**Pages outside Predictions:**
- `/settlement-explorer` already covers the settlement tree and the loud-vs-quiet dynamics. It is unlisted and styled dark rather than engraved. An engraved F35 could close with a "try the toy model" link if John wants to surface it.
- `/trajectory` and `/definition` are redirects, so nothing needs adding there.

## Cross-cutting faithfulness notes for this page

1. **Status cartouches matter more here than anywhere else on the site.** The page is organized by status: commitment, a test Holos could fail, consistency check, bet, speculation. Every figure should carry the matching cartouche.
2. **Draw possible outcomes (F20, F25, F29, F32) dashed and labeled.** They should never read as results. Only F22 and F33 show actual findings, and F22 must stay level.
3. **Nothing below Φ_c gets an iris.** That covers the dish, the photon friends, the AI proposal and qubit readouts. Instruments "record"; only observers "register".
4. **Don't let the Holosian Scale's social "integration" share marks with Φ.** No gauge and no iris in the speculation figures.
5. **No em dashes in captions.** The captions above were drafted to follow that and the glossary terms (Holos without collapse, apparent collapse, observer requirements, maximality condition, Going Quiet, Dark Node).
