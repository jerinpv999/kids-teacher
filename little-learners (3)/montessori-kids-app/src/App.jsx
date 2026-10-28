import React, { useState } from 'react';
import { GAMES } from './components/Games.jsx';
import Boundary from './components/Boundary.jsx';
import { LEVELS, ACTIVITY_LABELS, subjectsFor, levelOf } from './data/curriculum.js';
import { say } from './utils/speech.js';

export default function App() {
  const [level, setLevel] = useState(null);
  const [subjectId, setSubjectId] = useState('letters');
  const [activity, setActivity] = useState('learn');
  const [stars, setStars] = useState(0);
  const addStar = (n) => setStars((s) => s + n);

  // ── Level picker (first screen) ──
  if (!level) {
    return (
      <div className="pick">
        <h1 className="title">Little Learners</h1>
        <p className="sub">Choose your class</p>
        {LEVELS.map((l) => (
          <button
            key={l.id}
            className="levelcard"
            onClick={() => { setLevel(l.id); setSubjectId('letters'); setActivity('learn'); say(l.title); }}
          >
            <span className="lvicon">{l.icon}</span>
            <span>
              <strong>{l.title}</strong>
              <small>{l.ages}</small>
            </span>
          </button>
        ))}
        <p className="note">A grown-up can change the class any time.</p>
      </div>
    );
  }

  const lv = levelOf(level);
  const subjects = subjectsFor(level);
  const subject = subjects.find((s) => s.id === subjectId) || subjects[0];
  const acts = subject.acts[level] || ['learn'];
  const act = acts.includes(activity) ? activity : acts[0];
  const Game = GAMES[act];

  // plain computation, not a hook: this runs after an early return above
  const areas = [];
  subjects.forEach((s) => { if (!areas.includes(s.area)) areas.push(s.area); });

  return (
    <>
      <div className="top">
        <button className="lvbtn" onClick={() => setLevel(null)}>{lv.icon} {lv.title} ▾</button>
        <div className="stars" aria-label={`${stars} stars`}>⭐ {stars}</div>
      </div>

      <div className="subjects">
        {areas.map((area) => (
          <div className="area" key={area}>
            <div className="arealabel">{area}</div>
            <div className="row tight">
              {subjects.filter((s) => s.area === area).map((s) => (
                <button
                  key={s.id}
                  className={'btn small' + (subject.id === s.id ? ' on' : '')}
                  onClick={() => { setSubjectId(s.id); }}
                >
                  {s.icon} {s.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="row acts">
        {acts.map((k) => (
          <button key={k} className={'btn' + (act === k ? ' on' : '')} onClick={() => setActivity(k)}>
            {ACTIVITY_LABELS[k]}
          </button>
        ))}
      </div>

      <Boundary resetKey={act + subject.id + level} onHome={() => setLevel(null)}>
        <Game key={act + subject.id + level} subject={subject} level={level} addStar={addStar} />
      </Boundary>
    </>
  );
}
