import * as THREE from 'three';

const SIZE = 256;

/** Draws a letter, digit, short word or emoji onto a coloured block face. */
export function tileTexture(label, color) {
  const c = document.createElement('canvas');
  c.width = c.height = SIZE;
  const x = c.getContext('2d');

  x.fillStyle = color;
  x.fillRect(0, 0, SIZE, SIZE);
  x.strokeStyle = 'rgba(255,255,255,.55)';
  x.lineWidth = 16;
  x.strokeRect(14, 14, SIZE - 28, SIZE - 28);

  const text = String(label);
  // emoji need their own font and no shadow; text scales down as it gets longer
  const isEmoji = /\p{Extended_Pictographic}|[←-⇿■-➿⬀-⯿]/u.test(text);
  const chars = [...text].length;
  const size = isEmoji ? 150 : chars <= 1 ? 150 : chars === 2 ? 110 : chars === 3 ? 82 : 64;

  x.font = isEmoji
    ? `${size}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`
    : `800 ${size}px "Baloo 2","Comic Sans MS",sans-serif`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  if (!isEmoji) {
    x.fillStyle = '#fff';
    x.shadowColor = 'rgba(0,0,0,.25)';
    x.shadowBlur = 8;
    x.shadowOffsetY = 5;
  }
  x.fillText(text, SIZE / 2, SIZE / 2 + (isEmoji ? 6 : 10));

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function emojiTexture(emoji) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  x.font = '96px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(emoji, 64, 70);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
