import Link from "next/link";
import { notFound } from "next/navigation";
import Quiz from "../../../components/Quiz";
import questionSets, { TYPE_LABELS, MIXED_TYPE_QUESTION_COUNT } from "../../../data/questions";

const BASE_TYPES = Object.keys(questionSets); // ["a","b","c","d","e"]
const VALID_TYPES = [...BASE_TYPES, "f"];

export default async function QuizTypePage({ params, searchParams }) {
  const { type } = await params;
  const sp = await searchParams;

  if (!VALID_TYPES.includes(type)) {
    notFound();
  }

  const isMixed = type === "f";
  const pool = isMixed
    ? BASE_TYPES.flatMap((t) => questionSets[t])
    : questionSets[type];

  const randomOrder = isMixed ? true : sp?.randomOrder === "1";
  const randomOptions = isMixed ? true : sp?.randomOptions === "1";
  const limit = isMixed ? MIXED_TYPE_QUESTION_COUNT : undefined;
  const displayCount = isMixed ? Math.min(limit, pool.length) : pool.length;

  return (
    <main className="page">
      <div className="header">
        <Link href="/" className="back-link">
          ← 메인으로
        </Link>
        <h1>{TYPE_LABELS[type]}</h1>
        <p>총 {displayCount}문제 · 4지선다 객관식</p>
      </div>
      <Quiz
        key={`${type}-${randomOrder}-${randomOptions}`}
        questions={pool}
        randomOrder={randomOrder}
        randomOptions={randomOptions}
        limit={limit}
      />
    </main>
  );
}
