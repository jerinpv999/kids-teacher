# Little Learners — Pre-KG, LKG & UKG 🧸🎈🎒

A Montessori-style interactive learning app for preschool children, built with **React**, **three.js** and **Vite**. Every lesson is a floating 3D block the child taps, and everything is spoken aloud, so children who cannot read yet can play on their own.

## Levels

The child (or teacher) picks a class on the first screen. The level decides how many subjects appear, how many items each subject holds, how many answer choices a question shows, and how long an ordering round is.

| Level | Ages | Answer choices | Order round | Counts to | Subjects |
|---|---|---|---|---|---|
| Pre-KG | 2–3 | 2 | 3 blocks | 5 | 12 |
| LKG | 3–4 | 3 | 4 blocks | 10 | 14 |
| UKG | 4–6 | 4 | 5 blocks | 20 | 15 |

## Subjects, grouped by Montessori area

- **Language** — Letters (A–Z, phonics sound and a word), Words (three-letter spelling, UKG)
- **Maths** — Numbers (1–20, counting, ordering, simple addition)
- **Sensorial** — Colours, Shapes
- **World** — Animals, Birds, Fruits & vegetables, Vehicles, My body
- **Life skills** — Feelings, Traffic & road safety, Good and bad habits
- **Thinking** — Opposites, Days of the week

## Activities

| Activity | What the child does |
|---|---|
| 👀 Learn | **Swipes** left and right through the letters, words or pictures; taps the block to hear the name, the sound and a short sentence |
| 🎯 Find | "Find the letter M", "Which light means stop?" — pick the right block |
| 🔢 Count | Counts floating objects and picks the number |
| 🧩 Order | Puts letters, numbers or days into the right sequence |
| 🔡 Big & small | Matches a capital letter to its small letter (UKG) |
| ➕ Add | Adds two groups of objects and picks the answer (UKG) |
| ✏️ Spell | Builds a three-letter word from a picture (UKG) |
| 👍 Good or bad | Decides whether a habit is a good one |
| ↔️ Match | Finds the opposite |

Stars are earned for correct answers. A wrong answer is never punished: the app says what the child tapped and invites another try.

## One screen, no scrolling

Everything fits the screen it is on: the class, the subject strip, the activities and the lesson are all visible at once, and nothing scrolls away under a small thumb. The 3D area grows or shrinks to use whatever space is left, so the app works on a small phone, a tablet and in landscape.

**Swiping** moves between items. In Learn, a swipe left goes to the next letter, word or picture and a swipe right goes back, with dots along the bottom showing the position. In the question games, a swipe brings a new question. Arrow keys do the same thing, and the ⬅️ ➡️ buttons remain for children who prefer tapping.

A swipe must be clearly sideways and longer than 45 pixels, so tapping a block is never mistaken for a swipe.

## Run it

```bash
npm install
npm run dev       # open the address it prints, usually http://localhost:5173
```

## Build for hosting

```bash
npm run build     # static site in dist/
npm run preview
```

Upload `dist/` to any static host (Netlify, Vercel, GitHub Pages, Firebase Hosting). No server or database is needed.

## Folder structure

```
montessori-kids-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            entry point
    ├── App.jsx             level picker, subject tabs, activity tabs
    ├── styles.css
    ├── components/
    │   ├── Tiles.jsx       the three.js 3D block row (the only 3D code)
    │   └── Games.jsx       all nine activities
    ├── data/
    │   └── curriculum.js   LEVELS and SUBJECTS — all content lives here
    └── utils/
        ├── speech.js       text-to-speech
        ├── textures.js     block faces and floating emoji
        └── helpers.js      shuffle, option picker, colours
```

## Changing the content

Everything a teacher would edit is in `src/data/curriculum.js`.

**Add an item to a subject** — one line, using `mk(emoji, name, sentence)`:

```js
mk('🦒', 'Giraffe', 'The giraffe has a very long neck.'),
```

**Add a new subject** — add one entry to `SUBJECTS`:

```js
{ id: 'instruments', title: 'Music', icon: '🥁', area: 'Sensorial', items: instruments,
  take: { prekg: 4, lkg: 6, ukg: 8 },
  ask: (it) => `Find the ${it.name.toLowerCase()}`,
  acts: { prekg: ['learn', 'find'], lkg: ['learn', 'find'], ukg: ['learn', 'find'] } },
```

- `take` is how many items each level sees, counted from the top of the list, so put the easiest first.
- `acts` is which activities that level gets. Available: `learn`, `find`, `count`, `order`, `case`, `add`, `spell`, `judge`, `pairs`.
- `levels: ['ukg']` restricts a subject to certain classes.

**Change the difficulty of a level** — edit `LEVELS`: `opts` (answer choices), `win` (blocks per order round), `count` (highest number).

**Spelling words** are in `CVC_WORDS`, **opposites** in `OPPOSITES`, **phonics sounds** in `PHONICS`.

## Voice

The app uses the browser's own text-to-speech, so no audio files are downloaded and it works offline. Voice quality depends on the device. To prefer a particular voice, set `u.lang` in `src/utils/speech.js`:

```js
u.lang = 'en-IN';   // Indian English; also 'ml-IN' (Malayalam), 'hi-IN' (Hindi)
```

For exact phonics sounds, record your own `.mp3` files into `public/sounds/` and play them from `speech.js` instead.

## Notes for teachers and parents

- Traffic rules are written for **driving on the left** (India, UK). If you are in a drive-on-the-right country, change "look right, look left" in the Traffic items.
- Bad habits are always worded gently: they say what not to do **and** what to do instead.
- The app respects the device's reduced-motion and dark-mode settings, and needs no login, no network and collects no data.
# kids-teacher
