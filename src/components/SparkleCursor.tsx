'use client';
import { useEffect, useState } from 'react';

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
}

const Particle = ({ x, y, size, opacity, rotation }: ParticleProps) => (
  <div
    className="absolute"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      opacity: opacity,
      pointerEvents: 'none',
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      transition: 'opacity 0.5s ease-out, width 0.5s ease-out, height 0.5s ease-out',
    }}
  >
    {/* 星の形を創り出す、二つの長方形 */}
    <div
      className="absolute top-1/2 left-0 w-full h-[2px]"
      style={{ background: 'white', boxShadow: '0 0 5px white' }}
    ></div>
    <div
      className="absolute top-0 left-1/2 w-[2px] h-full"
      style={{ background: 'white', boxShadow: '0 0 5px white' }}
    ></div>
  </div>
);


const SparkleCursor = () => {
  const [particles, setParticles] = useState<Array<ParticleProps & { id: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newParticle: ParticleProps & { id: number } = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 12 + 6, // サイズを調整
        opacity: 1,
        rotation: Math.random() * 90, // ランダムな角度を追加
      };
      setParticles((prev) => [...prev, newParticle].slice(-20));
    };

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.08, size: p.size * 0.96 }))
          .filter((p) => p.opacity > 0)
      );
    }, 40);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </>
  );
};

export default SparkleCursor;