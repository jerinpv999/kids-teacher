import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { tileTexture, emojiTexture } from '../utils/textures.js';

const FOV = 50;
const TAN = Math.tan((FOV / 2) * Math.PI / 180);

/**
 * A row of tappable 3D blocks, with an optional grid of floating emoji above
 * them for counting games.
 *   items  [{ label, color }]
 *   onPick (index) => void
 *   count  how many emoji to float above (0 = none)
 *   emo    which emoji to float
 *
 * The canvas always fills the box it is given, so the games sit on one screen
 * with no scrolling, whatever the size of the device.
 */
export default function Tiles({ items, onPick, count = 0, emo = '⭐' }) {
  const box = useRef(null);
  const cb = useRef(onPick);
  cb.current = onPick;
  const key = items.map((i) => i.label + i.color).join('|') + '#' + count + emo;

  useEffect(() => {
    const el = box.current;
    let w = el.clientWidth || 320;
    let h = el.clientHeight || 240;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(3, 6, 8);
    scene.add(sun);

    const n = items.length;

    // ── layout ──
    const perRow = count > 12 ? 7 : 5;
    const rows = count ? Math.ceil(count / perRow) : 0;
    const gridH = rows ? (rows - 1) * 1.3 + 1.2 : 0;          // sprite block height
    const totalH = 1.6 + (rows ? 0.7 + gridH : 0);             // tiles + gap + sprites
    const tileY = -totalH / 2 + 0.8;
    const gridTopY = totalH / 2 - 0.6;

    const halfW = Math.max(n * 2.12, (count ? Math.min(count, perRow) * 1.4 : 0)) / 2 + 0.3;
    const halfH = totalH / 2 + 0.3;

    const cam = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    // Fill the given box and pull the camera back far enough that every block
    // and every floating object stays inside it.
    const fit = () => {
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      cam.aspect = w / h;
      cam.position.z = Math.max(halfW / (TAN * cam.aspect), halfH / TAN) + 0.6;
      cam.updateProjectionMatrix();
    };
    fit();

    // ── blocks ──
    const meshes = items.map((it, i) => {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 1.6, 1.6),
        new THREE.MeshLambertMaterial({ map: tileTexture(it.label, it.color) })
      );
      m.position.set((i - (n - 1) / 2) * 2.12, tileY, 0);
      m.userData = { i, y: tileY, pop: 0 };
      scene.add(m);
      return m;
    });

    // ── floating emoji for counting ──
    const sprites = [];
    const tex = count ? emojiTexture(emo) : null;
    for (let k = 0; k < count; k++) {
      const row = Math.floor(k / perRow);
      const inRow = Math.min(perRow, count - row * perRow);
      const col = k % perRow;
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
      const y = gridTopY - row * 1.3;
      s.position.set((col - (inRow - 1) / 2) * 1.4, y, 0);
      s.scale.set(1.15, 1.15, 1);
      s.userData.y = y;
      scene.add(s);
      sprites.push(s);
    }

    // ── tap ──
    const ray = new THREE.Raycaster();
    const ptr = new THREE.Vector2();
    const onDown = (e) => {
      const r = renderer.domElement.getBoundingClientRect();
      ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ptr.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(ptr, cam);
      const hit = ray.intersectObjects(meshes)[0];
      if (hit) {
        hit.object.userData.pop = 0.35;
        cb.current(hit.object.userData.i);
      }
    };
    renderer.domElement.addEventListener('pointerdown', onDown);

    // ── animate ──
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      meshes.forEach((m, i) => {
        const u = m.userData;
        if (!still) {
          m.rotation.y = Math.sin(t / 700 + i) * 0.35;
          m.rotation.x = Math.sin(t / 900 + i) * 0.12;
          m.position.y = u.y + Math.sin(t / 600 + i) * 0.09;
        }
        m.scale.setScalar(1 + u.pop);
        u.pop *= 0.88;
      });
      sprites.forEach((s, i) => {
        if (!still) s.position.y = s.userData.y + Math.sin(t / 500 + i) * 0.07;
      });
      renderer.render(scene, cam);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => {
      w = el.clientWidth || w;
      h = el.clientHeight || h;
      fit();
    };
    window.addEventListener('resize', onResize);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
    if (ro) ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointerdown', onDown);
      meshes.forEach((m) => { m.geometry.dispose(); m.material.map.dispose(); m.material.dispose(); });
      sprites.forEach((s) => s.material.dispose());
      if (tex) tex.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return <div className="tilebox" ref={box} role="img" aria-label="Tap the 3D blocks" />;
}
