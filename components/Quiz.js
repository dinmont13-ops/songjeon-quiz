"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { shuffleArray } from "../lib/shuffle";
import { TYPE_LABELS } from "../data/questions";

const LETTERS = ["①", "②", "③", "④"];

// 원본 문제 배열을 받아, randomOrder/randomOptions/limit 설정에 맞춰
// 이번 회차에 사용할 문제 목록(보기 순서까지 반영)을 만듭니다.
function buildSession(questions, randomOrder, randomOptions, limit) {
  let pool = questions;

  if (limit && pool.length > limit) {
    // 개수를 제한하는 경우(F형)는 항상 무작위로 추출합니다.
    pool = shuffleArray(pool).slice(0, limit);
  } else if (randomOrder) {
    pool = shuffleArray(pool);
  }

  return pool.map((q) => {
    let displayOptions = q.options.map((text, idx) => ({ text, idx }));
    if (randomOptions) {
      displayOptions = shuffleArray(displayOptions);
    }
    const correctIndex = displayOptions.findIndex((o) => o.idx === q.answerIndex);
    return {
      id: q.id,
      question: q.question,
      explanation: q.explanation,
      sourceType: q.sourceType,
      options: displayOptions.map((o) => o.text),
      correctIndex,
    };
  });
}

export default function Quiz({ questions, randomOrder = false, randomOptions = false, limit }) {
  const [ready, setReady] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentPos, setCurrentPos] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    startSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startSession() {
    const session = buildSession(questions, randomOrder, randomOptions, limit);
    setSessionQuestions(session);
    setAnswers(Array(session.length).fill(null));
    setCurrentPos(0);
    setFinished(false);
    setReady(true);
  }

  if (!ready) {
    return (
      <div className="card">
        <p className="option-note">문제를 준비하고 있어요…</p>
      </div>
    );
  }

  const total = sessionQuestions.length;

  if (finished) {
    const score = sessionQuestions.reduce(
      (acc, q, idx) => acc + (answers[idx] === q.correctIndex ? 1 : 0),
      0
    );
    const percent = total > 0 ? Math.round((score / total) * 100) : 0;

    return (
      <div className="card result-card">
        <div className="q-index">결과</div>
        <div className="result-score">
          {score} / {total}
        </div>
        <div className="result-sub">정답률 {percent}%</div>

        <div className="review-list">
          {sessionQuestions.map((q, idx) => {
            const correct = answers[idx] === q.correctIndex;
            return (
              <div className="review-item-detail" key={idx}>
                <div className="review-item-head">
                  <span>
                    Q{idx + 1}.{" "}
                    {q.sourceType && (
                      <span className="source-tag">
                        {TYPE_LABELS[q.sourceType]} {q.id}번
                      </span>
                    )}
                    {q.question}
                  </span>
                  <span className={`tag ${correct ? "ok" : "no"}`}>{correct ? "정답" : "오답"}</span>
                </div>
                {!correct && (
                  <div className="review-item-answer">
                    <div>내 답: {answers[idx] === null ? "미응답" : q.options[answers[idx]]}</div>
                    <div>정답: {q.options[q.correctIndex]}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="actions">
          <Link href="/" className="btn-secondary btn-link">
            메인으로
          </Link>
          <button className="btn-primary" onClick={startSession}>
            다시 풀기
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = sessionQuestions[currentPos];
  const selected = answers[currentPos];
  const isLast = currentPos + 1 >= total;

  function handleSelect(optIndex) {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentPos] = optIndex;
      return next;
    });
  }

  function handlePrev() {
    if (currentPos > 0) setCurrentPos((p) => p - 1);
  }

  function handleNext() {
    if (selected === null) return;
    if (isLast) {
      setFinished(true);
      return;
    }
    setCurrentPos((p) => p + 1);
  }

  return (
    <div>
      <div className="toolbar">
        <span>
          진행 {currentPos + 1} / {total}
        </span>
        <span>
          답변 완료 {answers.filter((a) => a !== null).length} / {total}
        </span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((currentPos + 1) / total) * 100}%` }} />
      </div>

      <div className="card">
        <div className="q-index">문제 {currentPos + 1}</div>
        <div className="q-text">{currentQuestion.question}</div>

        <div className="options">
          {currentQuestion.options.map((opt, idx) => {
            const cls = `option${idx === selected ? " selected" : ""}`;
            return (
              <div key={idx} className={cls} onClick={() => handleSelect(idx)}>
                <span className="badge">{LETTERS[idx]}</span>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>

        <div className="actions">
          <button className="btn-secondary" onClick={handlePrev} disabled={currentPos === 0}>
            이전 문제
          </button>
          <button className="btn-primary" onClick={handleNext} disabled={selected === null}>
            {isLast ? "제출하고 결과보기" : "다음 문제"}
          </button>
        </div>
      </div>
    </div>
  );
}
