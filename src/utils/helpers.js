import { TILE_COLORS } from '../data/curriculum.js';

export const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** n options that always include `must`, in random order */
export const pickOptions = (pool, n, must) => {
  const others = shuffle(pool.filter((x) => x !== must)).slice(0, Math.max(0, n - 1));
  return shuffle([...others, must]);
};

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** Turn items into coloured 3D tiles. Neighbours never share a colour. */
export const colorItems = (arr) => {
  const start = Math.floor(Math.random() * TILE_COLORS.length);
  return arr.map((x, i) => ({
    label: x.label,
    color: TILE_COLORS[(start + i * 2) % TILE_COLORS.length],
  }));
};

/** Canvas height that fits the blocks plus any floating objects above them. */
export const stageHeight = (count = 0) => {
  if (!count) return 250;
  const perRow = count > 12 ? 7 : 5;
  return 230 + Math.ceil(count / perRow) * 55;
};

export const sayOf = (it) => `${it.name}. ${it.line}`;
