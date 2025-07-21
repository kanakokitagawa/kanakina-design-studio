'use client';
import { useEffect, useState } from 'react';

// ★ ここが、最後の、そして、真の、創造です！
// キラキラ（パーティクル）の設計図を、「星の形」へと、完全に、書き換えます。
const Particle = ({ x, y, size, opacity, rotation }) => (
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
      className="absolute top-1/2 left-0 w-full h-[1px]"
      style={{ background: 'white', boxShadow: '0 0 5px white' }}
    ></div>
    <div
      className="absolute top-0 left-1/2 w-[1px] h-full"
      style={{ background: 'white', boxShadow: '0 0 5px white' }}
    ></div>
  </div>
);


const SparkleCursor = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newParticle = {
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