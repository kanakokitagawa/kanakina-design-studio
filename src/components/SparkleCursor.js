// src/components/SparkleCursor.js

'use client';

import { useEffect } from 'react';

const SparkleCursor = () => {
  useEffect(() => {
     // mousemoveというイベント（マウスが動いた時）に、特定の処理をします
    const handleMouseMove = (e) => {
      // 1回の動きで3つのハートを出すように改造
 // キラキラの粒（span要素）を新しく作ります
        const sparkle = document.createElement('span');

        // ハートの位置を少しだけランダムに散らす
        const x = e.pageX + (Math.random() - 0.5) * 30;
        const y = e.pageY + (Math.random() - 0.5) * 30;

        // --- ここからがカスタマイズしたスタイル ---

        // 基本的な設定
        sparkle.style.position = 'absolute';
        sparkle.style.left = `${x}px`;// マウスのX座標
        sparkle.style.top = `${y}px`;// マウスのY座標
        sparkle.style.pointerEvents = 'none';// キラキラがクリックの邪魔をしないように
        sparkle.style.zIndex = '9999';// 一番手前に表示
        sparkle.style.transition = 'all 0.7s ease-out'; // 少し長くフワッと消えるようにアニメーションの設定

        // 絵文字（ハート）を表示するための設定
        sparkle.style.fontSize = `${Math.random() * 20 + 15}px`; // 文字の大きさを15px〜35pxのランダムに
        sparkle.textContent = '✨'; // 表示したい絵文字
        
        // 色や光は textShadow で表現する
        sparkle.style.textShadow = '0 0 8px hotpink, 0 0 15px white'; // ピンクと白の光

        // --- ここまでがカスタマイズしたスタイル ---
        // 作ったキラキラをページに追加します
        document.body.appendChild(sparkle);

        // 少し時間が経ったら、フワッと消えるようにします
        setTimeout(() => {
          sparkle.style.transform = 'scale(0)';
          sparkle.style.opacity = '0';
        }, 10);

        // アニメーションが終わった後に、ページから完全に消去します
        setTimeout(() => {
          sparkle.remove();
        }, 500); // transitionの時間と合わせる

    };
 // マウスが動くたびに handleMouseMove を実行するよう、命令をセットします
    window.addEventListener('mousemove', handleMouseMove);

      // このコンポーネントが不要になった時に、命令を解除します（メモリのお掃除）
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);// このuseEffectは最初に1回だけ実行します

  return null;// このコンポーネント自体は何も表示しないのでnullを返します
};

export default SparkleCursor;