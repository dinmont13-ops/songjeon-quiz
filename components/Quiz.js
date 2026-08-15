"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const LETTERS = ["A", "B", "C", "D"];

function shuffledIndexes(length) {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Quiz({ questions }) {
  const [randomOrder, setRandomOrder] = useState(false);
  const [order, setOrder] = useState(() =>
    Array.from({ length: questions.length }, (_, i) => i)
  );
  const [currentPos, setCurrentPos] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState([]); // { qId, correct }
  const [finished, setFinished] = useState(false);

  const currentQuestion = useMemo(() => {
    const qIndex = order[currentPos];
    return questions[qIndex];
  }, [order, currentPos, questions]);

  const totalCount = questions.length;
  const score = results.filter((r) => r.correct).length;

  function restart(nextRandom = randomOrder) {
    const nextOrder = nextRandom
      ? shuffledIndexes(questions.length)
      : Array.from({ length: questions.length }, (_, i) => i);
    setOrder(nextOrder);
    setCurrentPos(0);
    setSelected(null);
    setChecked(false);
    setResults([]);
    setFinished(false);
  }

  function handleToggleRandom(e) {
    const value = e.target.checked;
    setRandomOrder(value);
    restart(value);
  }

  function handleSelect(optIndex) {
    if (checked) return;
    setSelected(optIndex);
  }

  function handleCheck() {
    if (selected === null) return;
    const isCorrect = selected === currentQuestion.answerIndex;
    setChecked(true);
    setResults((prev) => [
      ...prev,
      { qId: currentQuestion.id, question: currentQuestion.question, correct: isCorrect },
    ]);
  }

  function handleNext() {
    if (currentPos + 1 >= totalCount) {
      setFinished(true);
      return;
    }
    setCurrentPos((p) => p + 1);
    setSelected(null);
    setChecked(false);
  }

  if (finished) {
    const percent = Math.round((score / totalCount) * 100);
    return (
      <div className="card result-card">
        <div className="q-index">결과</div>
        <div className="result-score">
          {score} / {totalCount}
        </div>
        <div className="result-sub">정답률 {percent}%</div>

        <div className="review-list">
          {results.map((r, idx) => (
            <div className="review-item" key={idx}>
              <span>
                Q{idx + 1}. {r.question.length > 24 ? r.question.slice(0, 24) + "…" : r.question}
              </span>
              <span className={`tag ${r.correct ? "ok" : "no"}`}>
                {r.correct ? "정답" : "오답"}
              </span>
            </div>
          ))}
        </div>

        <div className="actions">
          <Link href="/" className="btn-secondary btn-link">
            메인으로
          </Link>
          <button className="btn-primary" onClick={() => restart()}>
            다시 풀기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="toolbar">
        <label>
          <input type="checkbox" checked={randomOrder} onChange={handleToggleRandom} />
          랜덤 출제
        </label>
        <span>
          진행 {currentPos + 1} / {totalCount} · 맞은 개수 {score}
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((currentPos + (checked ? 1 : 0)) / totalCount) * 100}%` }}
        />
      </div>

      <div className="card">
        <div className="q-index">문제 {currentPos + 1}</div>
        <div className="q-text">{currentQuestion.question}</div>

        <div className="options">
          {currentQuestion.options.map((opt, idx) => {
            let cls = "option";
            if (checked) {
              if (idx === currentQuestion.answerIndex) cls += " correct";
              else if (idx === selected) cls += " incorrect";
            } else if (idx === selected) {
              cls += " selected";
            }
            return (
              <div key={idx} className={cls} onClick={() => handleSelect(idx)}>
                <span className="badge">{LETTERS[idx]}</span>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>

        {checked && currentQuestion.explanation && (
          <div className="explanation">
            <strong>해설: </strong>
            {currentQuestion.explanation}
          </div>
        )}

        <div className="actions">
          {!checked ? (
            <button className="btn-primary" onClick={handleCheck} disabled={selected === null}>
              정답 확인
            </button>
          ) : (
            <button className="btn-primary" onClick={handleNext}>
              {currentPos + 1 >= totalCount ? "결과 보기" : "다음 문제"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
