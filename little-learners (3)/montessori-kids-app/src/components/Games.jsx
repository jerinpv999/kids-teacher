import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Tiles from './Tiles.jsx';
import {
  itemsFor, levelOf, CHEERS, NUMBERS, LETTERS, CVC_WORDS, OPPOSITES,
} from '../data/curriculum.js';
import { say } from '../utils/speech.js';
import useSwipe from '../utils/useSwipe.js';
import { colorItems, pickOptions, shuffle, pick, sayOf } from '../utils/helpers.js';

const cheer = () => pick(CHEERS);

/* ───────────── Learn: browse items one by one ───────────── */
export function Learn({ subject, level }) {
  const items = useMemo(() => itemsFor(subject, level), [subject, level]);
  const [i, setI] = useState(0);
  const d = items[i];
  useEffect(() => setI(0), [subject, level]);
  const speak = useCallback(() => say(sayOf(d)), [d]);
  const counting = subject.id === 'numbers';

  const go = (step) => {
    const next = (i + step + items.length) % items.length;
    setI(next);
    say(sayOf(items[next]));
  };
  const swipe = useSwipe({ onLeft: () => go(1), onRight: () => go(-1) });

  return (
    <div className="stage" ref={swipe}>
      <div className="prompt">👈 Swipe for more 👉</div>
      <Tiles
        items={colorItems([d])}
        onPick={speak}
        count={counting ? d.n : 0}
        emo={d.emo}
      />
      <div className="big">{subject.id === 'letters' ? d.label + d.small : d.name}</div>
      {d.kind && (
        <div className={'badge ' + d.kind}>{d.kind === 'good' ? '👍 Good habit' : '👎 Not a good habit'}</div>
      )}
      <div className="word">{d.line}</div>
      <div className="row">
        <button className="btn" aria-label="Previous" onClick={() => go(-1)}>⬅️</button>
        <button className="btn on" onClick={speak}>🔊 Listen</button>
        <button className="btn" aria-label="Next" onClick={() => go(1)}>➡️</button>
      </div>
      {items.length <= 14 ? (
        <div className="dots" aria-label={`${i + 1} of ${items.length}`}>
          {items.map((_, k) => <span key={k} className={'dot' + (k === i ? ' on' : '')} />)}
        </div>
      ) : (
        <div className="counter">{i + 1} of {items.length}</div>
      )}
    </div>
  );
}

/* ───────────── Find: pick the right block ───────────── */
export function Find({ subject, level, addStar }) {
  const pool = useMemo(() => itemsFor(subject, level), [subject, level]);
  const nOpts = levelOf(level).opts;
  const [q, setQ] = useState(null);
  const [msg, setMsg] = useState('');

  const askText = (t) => (subject.ask ? subject.ask(t) : `Find the ${t.name.toLowerCase()}`);

  const next = useCallback(() => {
    const target = pick(pool);
    setQ({ target, options: pickOptions(pool, nOpts, target) });
    setMsg('');
    setTimeout(() => say(askText(target)), 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, nOpts]);

  useEffect(() => { next(); }, [subject, level]); // eslint-disable-line
  const swipe = useSwipe({ onLeft: next, onRight: next });
  if (!q) return null;

  const choose = (i) => {
    const o = q.options[i];
    if (o === q.target) {
      const m = cheer();
      setMsg(`${m} ${o.name}`);
      addStar(1);
      say(`${m} ${sayOf(o)}`);
      setTimeout(next, 4200);
    } else {
      setMsg('Try again 💪');
      say(`That is ${o.name}. Try again`);
    }
  };

  return (
    <div className="stage" ref={swipe}>
      <div className="prompt">{askText(q.target)}</div>
      <Tiles items={colorItems(q.options)} onPick={choose} />
      <div className="msg" role="status">{msg}</div>
      <button className="btn" onClick={() => say(askText(q.target))}>🔊 Hear again</button>
    </div>
  );
}

/* ───────────── Count: how many objects? ───────────── */
export function Count({ level, addStar }) {
  const max = levelOf(level).count;
  const pool = NUMBERS.slice(0, max);
  const nOpts = levelOf(level).opts;
  const [q, setQ] = useState(null);
  const [msg, setMsg] = useState('');

  const next = useCallback(() => {
    const target = pick(pool);
    setQ({ target, options: pickOptions(pool, nOpts, target) });
    setMsg('');
    setTimeout(() => say('How many can you count?'), 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max, nOpts]);

  useEffect(() => { next(); }, [level]); // eslint-disable-line
  const swipe = useSwipe({ onLeft: next, onRight: next });
  if (!q) return null;

  const choose = (i) => {
    const o = q.options[i];
    if (o === q.target) {
      const m = cheer();
      setMsg(`${m} ${o.n}`);
      addStar(1);
      say(`${o.n}. ${o.word}. ${m}`);
      setTimeout(next, 2600);
    } else {
      setMsg('Count again 🤔');
      say(`That is ${o.n}. Count again`);
    }
  };

  return (
    <div className="stage" ref={swipe}>
      <div className="prompt">How many do you see?</div>
      <Tiles items={colorItems(q.options)} onPick={choose} count={q.target.n} emo={q.target.emo} />
      <div className="msg" role="status">{msg}</div>
    </div>
  );
}

/* ───────────── Order: tap in the right sequence ───────────── */
export function Order({ subject, level, addStar }) {
  const items = useMemo(() => itemsFor(subject, level), [subject, level]);
  const win = Math.min(levelOf(level).win, items.length);
  const [r, setR] = useState(null);
  const [msg, setMsg] = useState('');
  const title = `Put the ${subject.title.toLowerCase()} in order`;

  const next = useCallback(() => {
    const start = Math.floor(Math.random() * (items.length - win + 1));
    const seq = items.slice(start, start + win);
    setR({ seq, placed: 0, order: shuffle(seq) });
    setMsg('');
    setTimeout(() => say(title), 150);
  }, [items, win, title]);

  useEffect(() => { next(); }, [subject, level]); // eslint-disable-line
  if (!r) return null;

  const left = r.order.filter((it) => r.seq.indexOf(it) >= r.placed);

  const choose = (i) => {
    const it = left[i];
    if (it === r.seq[r.placed]) {
      const placed = r.placed + 1;
      setR({ ...r, placed });
      say(it.name);
      if (placed === win) {
        setMsg('All in order! 🎉');
        addStar(2);
        setTimeout(() => say('All in order! ' + r.seq.map((x) => x.name).join(', ')), 700);
        setTimeout(next, 4000);
      } else setMsg('');
    } else {
      setMsg('Look for the next one 🤔');
      say('Try again');
    }
  };

  return (
    <div className="stage">
      <div className="prompt">{title}</div>
      <div className="slots">
        {r.seq.map((it, i) => (
          <div key={it.label} className={'slot' + (i < r.placed ? ' f' : '')}>{i < r.placed ? it.label : ''}</div>
        ))}
      </div>
      {left.length > 0 && <Tiles items={colorItems(left)} onPick={choose} />}
      <div className="msg" role="status">{msg || (r.placed < win ? 'Which one comes next?' : '')}</div>
    </div>
  );
}

/* ───────────── Big & small: match capital to small letter ───────────── */
export function CaseMatch({ level, addStar }) {
  const nOpts = levelOf(level).opts;
  const [q, setQ] = useState(null);
  const [msg, setMsg] = useState('');

  const next = useCallback(() => {
    const target = pick(LETTERS);
    const options = pickOptions(LETTERS, nOpts, target).map((l) => ({ ...l, label: l.small }));
    setQ({ target, options });
    setMsg('');
    setTimeout(() => say(`Find the small letter ${target.label}`), 150);
  }, [nOpts]);

  useEffect(() => { next(); }, [level]); // eslint-disable-line
  const swipe = useSwipe({ onLeft: next, onRight: next });
  if (!q) return null;

  const choose = (i) => {
    const o = q.options[i];
    if (o.small === q.target.small) {
      const m = cheer();
      setMsg(`${m} ${q.target.label}${q.target.small}`);
      addStar(1);
      say(`${m} Big ${q.target.label} and small ${q.target.label}`);
      setTimeout(next, 2600);
    } else {
      setMsg('Try again 💪');
      say(`That is small ${o.label}. Try again`);
    }
  };

  return (
    <div className="stage" ref={swipe}>
      <div className="prompt">Find the small letter for</div>
      <div className="big huge">{q.target.label}</div>
      <Tiles items={colorItems(q.options)} onPick={choose} />
      <div className="msg" role="status">{msg}</div>
      <button className="btn" onClick={() => say(`Find the small letter ${q.target.label}`)}>🔊 Hear again</button>
    </div>
  );
}

/* ───────────── Add: simple addition with objects ───────────── */
export function Add({ addStar }) {
  const [q, setQ] = useState(null);
  const [msg, setMsg] = useState('');

  const next = useCallback(() => {
    const a = 1 + Math.floor(Math.random() * 5);
    const b = 1 + Math.floor(Math.random() * 5);
    const sum = a + b;
    const emo = pick(['🍎', '⭐', '🎈', '🍪', '🐥']);
    const pool = NUMBERS.slice(0, 10);
    const target = pool[sum - 1];
    setQ({ a, b, sum, emo, options: pickOptions(pool, 3, target), target });
    setMsg('');
    setTimeout(() => say(`${a} plus ${b}. How many altogether?`), 150);
  }, []);

  useEffect(() => { next(); }, []); // eslint-disable-line
  if (!q) return null;

  const choose = (i) => {
    const o = q.options[i];
    if (o === q.target) {
      const m = cheer();
      setMsg(`${q.a} + ${q.b} = ${q.sum}. ${m}`);
      addStar(2);
      say(`${q.a} plus ${q.b} is ${q.sum}. ${m}`);
      setTimeout(next, 3000);
    } else {
      setMsg('Count them again 🤔');
      say('Count them again');
    }
  };

  return (
    <div className="stage">
      <div className="prompt">How many altogether?</div>
      <div className="sum">
        <span className="grp">{q.emo.repeat(q.a)}</span>
        <span className="op">+</span>
        <span className="grp">{q.emo.repeat(q.b)}</span>
      </div>
      <div className="big">{q.a} + {q.b} = ?</div>
      <Tiles items={colorItems(q.options)} onPick={choose} />
      <div className="msg" role="status">{msg}</div>
    </div>
  );
}

/* ───────────── Spell: build a three-letter word ───────────── */
export function Spell({ addStar }) {
  const [r, setR] = useState(null);
  const [msg, setMsg] = useState('');

  const next = useCallback(() => {
    const w = pick(CVC_WORDS);
    const letters = [...w.word];
    const extra = pick([...'BCDFGHJKLMNPRSTVW'].filter((c) => !letters.includes(c)));
    setR({ ...w, letters, placed: 0, pool: shuffle([...letters, extra]) });
    setMsg('');
    setTimeout(() => say(`Spell the word ${w.word}`), 150);
  }, []);

  useEffect(() => { next(); }, []); // eslint-disable-line
  if (!r) return null;

  // letters still needed, keeping duplicates right
  const used = r.letters.slice(0, r.placed);
  const remaining = [];
  const tally = {};
  used.forEach((c) => { tally[c] = (tally[c] || 0) + 1; });
  r.pool.forEach((c) => {
    if (tally[c]) tally[c] -= 1;
    else remaining.push(c);
  });

  const choose = (i) => {
    const c = remaining[i];
    if (c === r.letters[r.placed]) {
      const placed = r.placed + 1;
      setR({ ...r, placed });
      say(c);
      if (placed === r.letters.length) {
        const m = cheer();
        setMsg(`${r.word} ${r.emo} — ${m}`);
        addStar(3);
        setTimeout(() => say(`${r.word}. ${m}`), 600);
        setTimeout(next, 3600);
      } else setMsg('');
    } else {
      setMsg('Try another letter 🤔');
      say(`${c}. Try another letter`);
    }
  };

  return (
    <div className="stage">
      <div className="prompt">Spell the word</div>
      <div className="picture">{r.emo}</div>
      <div className="slots">
        {r.letters.map((c, i) => (
          <div key={i} className={'slot' + (i < r.placed ? ' f' : '')}>{i < r.placed ? c : ''}</div>
        ))}
      </div>
      {remaining.length > 0 && (
        <Tiles items={colorItems(remaining.map((c) => ({ label: c })))} onPick={choose} />
      )}
      <div className="msg" role="status">{msg}</div>
      <button className="btn" onClick={() => say(`Spell the word ${r.word}`)}>🔊 Hear again</button>
    </div>
  );
}

/* ───────────── Judge: good habit or bad habit? ───────────── */
export function Judge({ subject, level, addStar }) {
  const pool = useMemo(() => itemsFor(subject, level).filter((x) => x.kind), [subject, level]);
  const [item, setItem] = useState(null);
  const [msg, setMsg] = useState('');
  const [locked, setLocked] = useState(false);

  const next = useCallback(() => {
    setItem(pick(pool));
    setMsg('');
    setLocked(false);
    setTimeout(() => say('Is this a good habit or a bad habit?'), 150);
  }, [pool]);

  useEffect(() => { next(); }, [subject, level]); // eslint-disable-line
  const swipe = useSwipe({ onLeft: next, onRight: next });
  if (!item) return null;

  const answer = (kind) => {
    if (locked) return;
    if (kind === item.kind) {
      setLocked(true);
      addStar(1);
      const m = item.kind === 'good' ? 'Yes! A good habit 🌟' : 'Yes! Not a good habit 🙅';
      setMsg(m);
      say(`${m}. ${sayOf(item)}`);
      setTimeout(next, 5000);
    } else {
      setMsg('Think again 🤔');
      say('Think again');
    }
  };

  return (
    <div className="stage" ref={swipe}>
      <div className="prompt">Good habit or bad habit?</div>
      <Tiles items={colorItems([item])} onPick={() => say(item.name)} />
      <div className="big">{item.name}</div>
      <div className="row">
        <button className="btn good" onClick={() => answer('good')}>👍 Good</button>
        <button className="btn bad" onClick={() => answer('bad')}>👎 Bad</button>
      </div>
      <div className="msg" role="status">{msg}</div>
    </div>
  );
}

/* ───────────── Match: find the opposite ───────────── */
export function Pairs({ level, addStar }) {
  const nOpts = levelOf(level).opts;
  const [q, setQ] = useState(null);
  const [msg, setMsg] = useState('');

  const next = useCallback(() => {
    const p = pick(OPPOSITES);
    const flip = Math.random() < 0.5;
    const shown = flip ? p.b : p.a;
    const answer = flip ? p.a : p.b;
    const others = shuffle(
      OPPOSITES.filter((x) => x !== p).flatMap((x) => [x.a, x.b])
    ).slice(0, nOpts - 1);
    setQ({ shown, answer, options: shuffle([answer, ...others]) });
    setMsg('');
    setTimeout(() => say(`What is the opposite of ${shown.name}?`), 150);
  }, [nOpts]);

  useEffect(() => { next(); }, [level]); // eslint-disable-line
  const swipe = useSwipe({ onLeft: next, onRight: next });
  if (!q) return null;

  const choose = (i) => {
    const o = q.options[i];
    if (o === q.answer) {
      const m = cheer();
      setMsg(`${q.shown.name} ↔ ${q.answer.name}. ${m}`);
      addStar(2);
      say(`${m} ${q.shown.name} and ${q.answer.name} are opposites. ${q.answer.line}`);
      setTimeout(next, 4200);
    } else {
      setMsg('Try again 💪');
      say(`That is ${o.name}. Try again`);
    }
  };

  return (
    <div className="stage" ref={swipe}>
      <div className="prompt">What is the opposite of</div>
      <div className="picture">{q.shown.label}</div>
      <div className="big">{q.shown.name}</div>
      <Tiles items={colorItems(q.options)} onPick={choose} />
      <div className="msg" role="status">{msg}</div>
    </div>
  );
}

export const GAMES = { learn: Learn, find: Find, count: Count, order: Order, case: CaseMatch, add: Add, spell: Spell, judge: Judge, pairs: Pairs };
