"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TYPES = ["A", "B", "C", "D", "E", "F"];

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [randomOrder, setRandomOrder] = useState(false);
  const [randomOptions, setRandomOptions] = useState(false);
  const [answerMode, setAnswerMode] = useState(false);

  const isF = selected === "f";

  function handleSelect(type) {
    setSelected(type.toLowerCase());
  }

  function handleStart() {
    if (!selected) return;
    const effectiveOrder = isF ? true : randomOrder;
    const effectiveOptions = isF ? true : randomOptions;

    const params = new URLSearchParams();
    if (effectiveOrder) params.set("randomOrder", "1");
    if (effectiveOptions) params.set("randomOptions", "1");
    if (answerMode) params.set("answerMode", "1");
    const qs = params.toString();

    router.push(`/quiz/${selected}${qs ? `?${qs}` : ""}`);
  }

  return (
    <main className="page">
      <div className="header">
        <h1>송전전기원 예상문제</h1>
        <p>풀어볼 유형을 선택하세요</p>
      </div>

      <div className="type-grid">
        {TYPES.map((t) => {
          const type = t.toLowerCase();
          const active = selected === type;
          return (
            <button
              key={t}
              type="button"
              className={`type-btn${active ? " type-btn-active" : ""}`}
              onClick={() => handleSelect(t)}
            >
              {t}형
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="option-panel">
          {isF ? (
            <p className="option-note">
              F형은 A~E 문제를 모두 섞어서, 문제 순서와 보기 순서를 항상 랜덤으로 출제합니다.
            </p>
          ) : (
            <div className="option-checks">
              <label>
                <input
                  type="checkbox"
                  checked={randomOrder}
                  onChange={(e) => setRandomOrder(e.target.checked)}
                />
                문제 순서 랜덤
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={randomOptions}
                  onChange={(e) => setRandomOptions(e.target.checked)}
                />
                보기 순서 랜덤
              </label>
            </div>
          )}
          <div className="option-checks">
            <label>
              <input
                type="checkbox"
                checked={answerMode}
                onChange={(e) => setAnswerMode(e.target.checked)}
              />
              정답모드
            </label>
          </div>
          <button type="button" className="btn-primary start-btn" onClick={handleStart}>
            문제풀기
          </button>
        </div>
      )}
    </main>
  );
}
