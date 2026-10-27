// Plans scripted rounds (tests/native/journey.play) from the rules: the player
// never moves and, in every council, votes "skip" after the automata have
// voted (the script waits for them), so the round's course is the same
// whatever the frame timing. Prints the councils and the ending a script must
// wait for.
//   node tools/gen-plays.mjs [stage id, default journey-2]
import { JOURNEY } from '../src/content.js';
import { SoloSession, setSessionTimers } from '../src/session.js';

const id = process.argv[2] || 'journey-2';
const stage = JOURNEY.find((x) => x.id === id);
let pending = null;
setSessionTimers({ set: (fn) => { pending = fn; return 1; }, clear: () => { pending = null; } });
let over = null;
const s = new SoloSession(stage, { onEnd: (r) => { over = r; } });
let meetings = 0;
s.scheduleAi();
for (let i = 0; i < 20000 && !over; i++) {
  const st = s.state;
  if (st.phase === 'meeting' && st.players.every((p) => !p.ai || !p.alive || p.id in st.meeting.votes)) {
    if (s.legal().some((a) => a.type === 'vote')) { meetings++; s.act({ type: 'vote', choice: 'skip' }); continue; }
  }
  const fn = pending; pending = null;
  if (!fn) break;
  fn();
}
console.log(JSON.stringify({ stage: id, name: stage.name, meetings, winner: over?.winner, reason: over?.winReason, playerWon: over?.playerWon, alive: s.state.players[0].alive, ticks: s.state.tick }));
