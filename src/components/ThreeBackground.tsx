"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function makeDotTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  if (!ctx) return texture;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  texture.needsUpdate = true;
  return texture;
}

export function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Grupo que se inclina em direção ao ponteiro — tudo reativo vive aqui.
    const world = new THREE.Group();
    scene.add(world);

    // Dois icosaedros wireframe contra-rotativos — eco do enquadramento
    // hexagonal usado na arte de capa da locarness.
    const geoA = new THREE.IcosahedronGeometry(2.6, 1);
    const matA = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const icoA = new THREE.Mesh(geoA, matA);
    world.add(icoA);

    const geoB = new THREE.IcosahedronGeometry(3.4, 1);
    const matB = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.26,
    });
    const icoB = new THREE.Mesh(geoB, matB);
    world.add(icoB);

    // Campo de partículas à deriva.
    const dotTexture = makeDotTexture();
    const particleCount = window.innerWidth < 700 ? 450 : 1000;
    const positions = new Float32Array(particleCount * 3);
    const colorsArr = new Float32Array(particleCount * 3);
    const cyan = new THREE.Color(0x00f2fe);
    const green = new THREE.Color(0x34d399);

    for (let i = 0; i < particleCount; i++) {
      const r = 4 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixed = cyan.clone().lerp(green, Math.random());
      colorsArr[i * 3] = mixed.r;
      colorsArr[i * 3 + 1] = mixed.g;
      colorsArr[i * 3 + 2] = mixed.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colorsArr, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      map: dotTexture,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    world.add(particles);

    // Reatividade ao ponteiro / toque.
    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };

    function setPointer(nx: number, ny: number) {
      pointerTarget.x = nx;
      pointerTarget.y = ny;
    }

    function handlePointerMove(e: PointerEvent) {
      setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1
      );
    }

    function handleTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      if (!touch) return;
      setPointer(
        (touch.clientX / window.innerWidth) * 2 - 1,
        (touch.clientY / window.innerHeight) * 2 - 1
      );
    }

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let frameId = 0;

    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      pointer.x += (pointerTarget.x - pointer.x) * 0.04;
      pointer.y += (pointerTarget.y - pointer.y) * 0.04;

      if (!reduceMotion) {
        icoA.rotation.y = t * 0.06;
        icoA.rotation.x = t * 0.03;
        icoB.rotation.y = -t * 0.045;
        icoB.rotation.x = -t * 0.02;
        particles.rotation.y = t * 0.015;

        world.rotation.y = pointer.x * 0.35;
        world.rotation.x = -pointer.y * 0.25;
      } else {
        world.rotation.y = pointer.x * 0.15;
        world.rotation.x = -pointer.y * 0.1;
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      geoA.dispose();
      matA.dispose();
      geoB.dispose();
      matB.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      dotTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 block h-full w-full bg-[#0a0a0a]"
      />
      <div className="lc-vignette" />
      <div className="lc-grain" />
    </>
  );
}
